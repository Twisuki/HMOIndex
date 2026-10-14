import { getQuery } from "h3"
import { resolveSrv, Resolver } from "node:dns/promises"
import { pingMinecraftServer } from "../../utils/minecraftPinger"

// defineCachedEventHandler 由 Nitro 在 server 上下文自动 import, 无需手动引入

interface ServerQuery {
  host: string | string[]
  port?: string
}

type PingResponse
  = | {
    players: {
      online: number
      max: number
      onlinePlayers: { name: string, uuid: string }[]
    }
    description: { text: string }
  }
  | { error: string }

async function getSingleServerStatus(hostAndPort: string, queryPort?: string) {
  const [host, portStr] = hostAndPort.split(":")
  let serverHost = host
  let serverPort = portStr ? parseInt(portStr) : (queryPort ? parseInt(queryPort) : 25565)

  if (!portStr && !queryPort) {
    const handleSrvRecords = (records: { name: string, port: number, priority: number, weight: number }[]) => {
      if (records && records.length > 0) {
        records.sort((a, b) => {
          if (a.priority !== b.priority) {
            return a.priority - b.priority
          }
          return b.weight - a.weight
        })
        serverHost = records[0].name
        serverPort = records[0].port
        return true
      }
      return false
    }

    try {
      const records = await resolveSrv(`_minecraft._tcp.${serverHost}`)
      handleSrvRecords(records)
    }
    catch {
      console.warn(`[SRV Lookup] Default resolution failed for ${serverHost}, trying public DNS...`)
      try {
        const resolver = new Resolver()
        resolver.setServers(["223.5.5.5", "8.8.8.8"])
        const records = await resolver.resolveSrv(`_minecraft._tcp.${serverHost}`)
        handleSrvRecords(records)
      }
      catch {
        // Ignore final errors
      }
    }
  }

  return await pingMinecraftServer(serverHost, serverPort)
}

// 60s 缓存: Minecraft 服务器状态不需要秒级实时, 同时缓解 Vercel serverless 冷启动
// 默认使用 Nitro 的内存缓存(warm 函数内有效); 想要跨冷启动持久化, 可在 nitro.storage 里挂载 vercelKV 驱动
export default defineCachedEventHandler(async (event): Promise<PingResponse> => {
  const query = getQuery<ServerQuery>(event)
  const hostParam = query.host
  const port = query.port

  if (!hostParam) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing host parameter",
    })
  }

  const hosts = Array.isArray(hostParam) ? hostParam : hostParam.split(",")

  let lastError = "All servers are offline"
  let responseData: PingResponse | undefined

  // Try each host until one is online
  for (const host of hosts) {
    try {
      const status = await getSingleServerStatus(host.trim(), port)
      if (status.online) {
        responseData = {
          players: {
            online: status.current_players,
            max: status.max_players,
            onlinePlayers: status.players,
          },
          description: {
            text: status.motd,
          },
        }
        break
      }
      else {
        lastError = status.motd || lastError
      }
    }
    catch (e: unknown) {
      lastError = e instanceof Error ? e.message : lastError
    }
  }

  return responseData ?? { error: lastError }
}, {
  maxAge: 60,
  name: "mc-server-status",
  getKey: (event) => {
    const q = getQuery<ServerQuery>(event)
    const host = Array.isArray(q.host) ? q.host.join(",") : (q.host || "")
    return `${host}:${q.port || ""}`
  },
})
