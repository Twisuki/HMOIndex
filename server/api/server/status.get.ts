import { defineEventHandler, getQuery } from 'h3';
import { pingMinecraftServer } from '../../utils/minecraftPinger';

interface ServerQuery {
  host: string;
  port?: string;
}

export default defineEventHandler(async (event) => {
  const { host, port } = getQuery<ServerQuery>(event);

  if (!host) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing host parameter',
    });
  }

  const serverPort = port ? parseInt(port) : 25565;

  const status = await pingMinecraftServer(host, serverPort);

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
    };
  } else {
    return {
      error: status.motd,
    };
  }
});