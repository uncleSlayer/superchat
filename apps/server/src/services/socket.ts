import { Server } from 'socket.io'

class SocketService {

    private _io: Server;

    constructor() {

        console.log('Socket server initialized.');

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
        this._io.on('connection', (socket) => {
            console.log('socket connected: ' + socket.id);

        })
    }
}

export default SocketService