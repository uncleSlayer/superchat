import { WebSocketServer, WebSocket } from 'ws'
import { redisPub } from '../reddis/index'

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

  replyIb(to: string, from: string, message: string, time: number) {

    const toSocket = this._connections.find((el) => {
      if (el.userEmail === to) return el
    })

    console.log(toSocket);


    if (toSocket && toSocket.ws.readyState === WebSocket.OPEN) {
      toSocket.ws.send(JSON.stringify({
        from,
        message,
        time
      }))
    } else {
      console.log('My bro is no more connnected. Sad I am now.')
    }
  }

  onEvents() {
    this._io.on('connection', async (socket, request) => {

      if (request.url) {
        const userEmail = request.url.slice('/email='.length)

        this._connections.map((el) => {
          if (el.userEmail === userEmail) this._connections.splice((this._connections.indexOf(el)), 1)
        })

        this._connections.push({
          ws: socket,
          userEmail
        })
      }

      socket.on('message', async (msg) => {
        const msgLocal = JSON.parse(msg.toString())

        redisPub.publish('ib', JSON.stringify(msgLocal), (err, res) => {
          if (err) console.log(err)
          console.log(res?.toString())
        })
      })

      socket.on('disconnect', async () => {
        console.log('Handle disconnection gracefully.')
      })

    })
  }
}

export default SocketService
