import http from 'http'
import SocketService from './services/socket/socket'
import { subscribe } from './services/reddis/handleRedisSub'

export const socketService = new SocketService()

async function init() {
  const httpServer = http.createServer()
  const port = process.env.PORT ? process.env.PORT : 8000

  socketService.onEvents()
  socketService.checkHealth()
  await subscribe()

  httpServer.listen(port, () => console.log(`Node server running on port ${port}`))
}

init()
