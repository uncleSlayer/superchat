'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { log } from 'util'

interface ISocketContext {
  sendMessage: (msg: string) => any,
  sock: WebSocket | null
}

export const SocketContext = React.createContext<ISocketContext | null>(null)


const SocketProvider = ({ children }: { children: React.ReactNode }) => {

  const { data, status } = useSession()

  const [socketState, setSocketState] = useState<null | WebSocket>(null)

  const sendMessage = useCallback((msg: string) => {

    if (socketState && socketState.readyState === WebSocket.OPEN) {

      socketState.send(JSON.stringify({
        from: data?.user?.email,
        message: msg
      }))

    } else {

      console.log(socketState)
      console.log('something went wrong')

    }

  }, [socketState])

  useEffect(() => {

    if (!data?.user?.email) return;

    if (!socketState) {
      const _socket = new WebSocket(`ws://localhost:8003/email=${data.user.email}`)
      setSocketState(_socket)
    }

    return () => {

      if (socketState?.readyState === WebSocket.OPEN) {

        socketState.close()
        setSocketState(null)

      }
    }

  }, [data])

  return (
    <SocketContext.Provider value={{ sendMessage, sock: socketState }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
