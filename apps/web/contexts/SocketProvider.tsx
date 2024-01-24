'use client'

import React, { useCallback, useContext, useEffect, useState } from 'react'
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

  const [socketState, setSocketState] = useState<null | WebSocket>(null)

  const sendMessage = useCallback((msg: string) => {
    console.log('server sent: ' + msg);
  }, [])

  useEffect(() => {

    if (!session?.user?.email) return;

    if (!socketState) {
      const _socket = new WebSocket(`ws://localhost:8003/email=${session.user.email}`)
      setSocketState(_socket)
    }

    return () => {

      if (socketState?.readyState === WebSocket.OPEN) {

        socketState.close()
        setSocketState(null)

      }
    }

  }, [session])

  return (
    <SocketContext.Provider value={{ sendMessage }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
