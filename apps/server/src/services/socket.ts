import { Server } from 'socket.io'
import { redis } from './reddis';

class SocketService {

    private _io: Server;

    constructor() {
        this._io = new Server({
            cors: {
                allowedHeaders: '*',
                origin: '*'
            }
        })
    }

    get io() {
        return this._io
    }

    onEvents() {
        this._io.on('connection', async (socket) => {

            const userEmail = socket.handshake.query.email
            const socketId = socket.id

            const tempEmailSocket = await redis.get(`userEmail:${userEmail}`)
            await redis.del(`socketId:${tempEmailSocket}`)

            if (userEmail && socketId && typeof userEmail === 'string' && userEmail !== 'null') await redis.set(`userEmail:${userEmail}`, socketId)

            if (userEmail && socketId && typeof userEmail === 'string' && userEmail !== 'null') await redis.set(`socketId:${socket.id}`, userEmail)

            socket.on('disconnect', async () => {

                const userEmail = await redis.get(`socketId:${socket.id}`)
                await redis.del(`socketId:${socket.id}`)
                await redis.del(`userEmail:${userEmail}`)

            })
        })
    }
}

export default SocketService