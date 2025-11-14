import * as net from "net"
import { Buffer } from "buffer"

function packVarInt(value: number): Buffer {
  const parts: number[] = []
  while (true) {
    const temp = value & 0b01111111
    value >>>= 7
    if (value) {
      parts.push(temp | 0b10000000)
    }
    else {
      parts.push(temp)
      break
    }
  }
  return Buffer.from(parts)
}

function readVarInt(buffer: Buffer, offset: number): { value: number, length: number } {
  let num = 0
  let length = 0
  for (let i = 0; i < 5; i++) {
    const byte = buffer.readUInt8(offset + i)
    num |= (byte & 0x7F) << (7 * i)
    length++
    if (!(byte & 0x80)) {
      break
    }
  }
  return { value: num, length }
}

function createPacket(packetId: number, data: Buffer): Buffer {
  const packetIdBuffer = packVarInt(packetId)
  const packetData = Buffer.concat([packetIdBuffer, data])
  const length = packVarInt(packetData.length)
  return Buffer.concat([length, packetData])
}

const PROTOCOL_VERSION = 765

export interface MinecraftStatus {
  online: boolean
  host: string
  port: number
  version: string
  motd: string
  current_players: number
  max_players: number
  latency: number
  protocol_version: number
  players: { name: string, uuid: string, avatar_url: string }[]
}

export async function pingMinecraftServer(host: string, port: number, timeout: number = 5000): Promise<MinecraftStatus> {
  const startTime = Date.now()
  let socket: net.Socket | null = null

  const defaultStatus: MinecraftStatus = {
    online: false,
    host,
    port,
    version: "N/A",
    motd: "Server is offline or unreachable.",
    current_players: 0,
    max_players: 0,
    latency: 0,
    protocol_version: PROTOCOL_VERSION,
    players: [],
  }

  return new Promise((resolve) => {
    socket = net.connect(port, host)
    socket.setTimeout(timeout)

    const cleanup = (status: MinecraftStatus) => {
      if (socket) {
        socket.destroy()
        socket = null
      }
      resolve(status)
    }

    socket.on("connect", () => {
      try {
        // 1. 握手数据包 (Packet ID 0x00)
        const hostBuffer = Buffer.from(host, "utf8")
        const handshakeData = Buffer.concat([
          packVarInt(PROTOCOL_VERSION),
          packVarInt(hostBuffer.length),
          hostBuffer,
          Buffer.from([port >> 8, port & 0xFF]),
          packVarInt(1),
        ])
        const handshakePacket = createPacket(0x00, handshakeData)

        // 2. 状态请求数据包 (Packet ID 0x00)
        const statusRequestPacket = createPacket(0x00, Buffer.alloc(0))

        // 发送数据
        socket!.write(handshakePacket)
        socket!.write(statusRequestPacket)
      }
      catch (e) {
        console.error("Error during packet construction/send:", e)
        cleanup(defaultStatus)
      }
    })

    socket.on("data", (data) => {
      try {
        const latency = Date.now() - startTime

        // 1. 读取数据包长度 (VarInt)
        const { value: _packetLength, length: lengthLength } = readVarInt(data, 0)

        // 2. 读取数据包 ID (VarInt)
        const { value: packetId, length: idLength } = readVarInt(data, lengthLength)

        if (packetId !== 0x00) {
          return cleanup(defaultStatus)
        }

        // 3. 读取 JSON 长度 (VarInt)
        const jsonLengthOffset = lengthLength + idLength
        const { value: jsonLength, length: jsonLengthLength } = readVarInt(data, jsonLengthOffset)

        // 4. 读取 JSON 数据
        const jsonStartOffset = jsonLengthOffset + jsonLengthLength
        const jsonBuffer = data.subarray(jsonStartOffset, jsonStartOffset + jsonLength)
        const jsonString = jsonBuffer.toString("utf8")
        const jsonResponse = JSON.parse(jsonString)

        const playersSample = jsonResponse.players?.sample || []

        const status: MinecraftStatus = {
          online: true,
          host,
          port,
          version: jsonResponse.version?.name || "N/A",
          motd: jsonResponse.description?.text || (typeof jsonResponse.description === "string" ? jsonResponse.description : ""),
          current_players: jsonResponse.players?.online || 0,
          max_players: jsonResponse.players?.max || 0,
          latency,
          protocol_version: jsonResponse.version?.protocol || PROTOCOL_VERSION,
          players: playersSample.map((p: { name: string, id: string }) => ({
            name: p.name,
            uuid: p.id,
            avatar_url: `https://nmsr.nickac.dev/head/${p.id}`,
          })),
        }
        cleanup(status)
      }
      catch (e) {
        console.error("Error processing server response:", e)
        cleanup(defaultStatus)
      }
    })

    socket.on("timeout", () => {
      console.error(`[Minecraft Pinger] Timeout for ${host}:${port}`)
      cleanup(defaultStatus)
    })

    socket.on("error", (err) => {
      console.error(`[Minecraft Pinger] Connection error for ${host}:${port}:`, err.message)
      cleanup(defaultStatus)
    })

    socket.on("close", () => {
      // 如果在 resolve 之前关闭，则忽略
    })
  })
}
