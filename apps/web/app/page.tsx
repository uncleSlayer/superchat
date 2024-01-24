'use client'

import { Button } from "@/components/ui/button";
import { useContext } from 'react'
import { SocketContext } from '@/contexts/SocketProvider'

const page = () => {
  const sock = useContext(SocketContext)

  return (
    <div className="main-container mt-20">
      <p>Welcome to the homepage</p>
      <Button onClick={() => sock?.sendMessage('hello boi')}>
        hello
      </Button>
    </div>
  )
}

export default page
