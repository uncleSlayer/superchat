import http from 'http'
import SocketService from './services/socket'

async function init() {
  const httpServer = http.createServer()
  const port = process.env.PORT ? process.env.PORT : 8000
  const socketService = new SocketService()

  socketService.onEvents()
  socketService.checkHealth()

  httpServer.listen(port, () => console.log(`Node server running on port ${port}`))
}

init()
