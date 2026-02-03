import { defineEventHandler, getQuery } from "h3"
import { resolveSrv, Resolver } from "node:dns/promises"
import { pingMinecraftServer } from "../../utils/minecraftPinger"

interface ServerQuery {
  host: string | string[]
  port?: string
}

async function getSingleServerStatus(hostAndPort: string, queryPort?: string) {
  let [serverHost, portStr] = hostAndPort.split(":")
  let serverPort = portStr ? parseInt(portStr) : (queryPort ? parseInt(queryPort) : 25565)

  if (!portStr && !queryPort) {
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
      const records = await resolveSrv(`_minecraft._tcp.${serverHost}`)
      handleSrvRecords(records)
    }
    catch (e) {
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

export default defineEventHandler(async (event) => {
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

  // Try each host until one is online
  for (const host of hosts) {
    try {
      const status = await getSingleServerStatus(host.trim(), port)
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
        lastError = status.motd || lastError
      }
    }
    catch (e: any) {
      lastError = e.message || lastError
    }
  }

  return {
    error: lastError,
  }
})
