import { defineEventHandler, getQuery } from "h3"
import { resolveSrv, Resolver } from "node:dns/promises"
import { pingMinecraftServer } from "../../utils/minecraftPinger"

interface ServerQuery {
  host: string
  port?: string
}

export default defineEventHandler(async (event) => {
  const { host, port } = getQuery<ServerQuery>(event)

  if (!host) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing host parameter",
    })
  }

  let serverHost = host
  let serverPort = port ? parseInt(port) : 25565

  if (!port) {
    const handleSrvRecords = (records: any[]) => {
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
      const records = await resolveSrv(`_minecraft._tcp.${host}`)
      handleSrvRecords(records)
    }
    catch (e) {
      console.warn(`[SRV Lookup] Default resolution failed for ${host}, trying public DNS...`)
      try {
        const resolver = new Resolver()
        resolver.setServers(["223.5.5.5", "8.8.8.8"])
        const records = await resolver.resolveSrv(`_minecraft._tcp.${host}`)
        handleSrvRecords(records)
      }
      catch {
        // Ignore final errors
      }
    }
  }

  const status = await pingMinecraftServer(serverHost, serverPort)

  if (status.online) {
    return {
      players: {
        online: status.current_players,
        max: status.max_players,
        onlinePlayers: status.players,
      },
      description: {
        text: status.motd,
      },
    }
  }
  else {
    return {
      error: status.motd,
    }
  }
})
