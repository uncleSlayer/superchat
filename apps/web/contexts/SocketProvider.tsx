'use client'

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import { useSession } from 'next-auth/react'
import authOptions from '@/app/api/auth/[...nextauth]/options'

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

    const { data: session } = useSession()
    const userEmail = session?.user?.email ? session.user.email : null

    const [socketState, setSocketState] = useState<null | Socket>(null)

    const sendMessage = useCallback((msg: string) => {
        console.log('server sent: ' + msg);
    }, [])

    useEffect(() => {

        if (!session?.user?.email) return;
        if (socketState) {
            return;
        }
        console.log('here');
        
        const _socket = io('http://localhost:8000', {
            query: {
                email: userEmail
            }
        })

        setSocketState(_socket)

        return () => {
            console.log(_socket.id);
            
            _socket.disconnect()
            setSocketState(null)
        }

    }, [session])

    return (
        <SocketContext.Provider value={{ sendMessage }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider