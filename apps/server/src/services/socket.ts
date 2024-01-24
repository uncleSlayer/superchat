import { log, warn } from 'console';
import { WebSocketServer, WebSocket } from 'ws'

class SocketService {

  private _io: WebSocketServer;
  private _connections: {
    ws: WebSocket,
    userEmail: string
  }[];


  constructor() {
    this._io = new WebSocketServer({ port: 8003 })
    this._connections = []
  }

  get io() {
    return this._io
  }

  checkHealth() {
    setInterval(() => {

      this._connections.map((connection) => {

        if (connection.ws.readyState === WebSocket.OPEN) null
        else {

          connection.ws.terminate()
          const indexToRemove = this._connections.findIndex(obj => obj.userEmail === connection.userEmail)
          this._connections.slice(indexToRemove, 1)

        }

      })

    }, 5000)
  }

  onEvents() {
    this._io.on('connection', async (socket, request) => {

      if (request.url) {
        const userEmail = request.url.slice('/email='.length)

        this._connections.push({
          ws: socket,
          userEmail
        })
      }

      socket.on('message', async (msg) => {
        log(msg.toString())
      })

      socket.on('disconnect', async () => {
        console.log('Handle disconnection gracefully.')
      })

    })
  }
}

export default SocketService
