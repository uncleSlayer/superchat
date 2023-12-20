'use client'

import React, { useCallback, useContext, useEffect } from 'react'
import { io } from 'socket.io-client'

interface ISocketContext {
    sendMessage: (msg: string) => any
}

export const SocketContext = React.createContext<ISocketContext | null>(null)

export const useSocket = () => {
    const state = useContext(SocketContext)
    if (!state) throw new Error('state is not defined')

    return state
}

const SocketProvider = ({ children }: { children: React.ReactNode }) => {

    const sendMessage = useCallback((msg: string) => {
        console.log('server sent: ' + msg);
    }, [])

    useEffect(() => {

        const _socket = io('http://localhost:8000')

        return () => {
            _socket.disconnect()
        }

    }, [])

    return (
        <SocketContext.Provider value={{ sendMessage }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider