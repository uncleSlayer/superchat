'use client'

import { Button } from "@/components/ui/button";
import { useContext } from 'react'
import { SocketContext } from '@/contexts/SocketProvider'
import { useSession } from "next-auth/react";

const page = () => {
  const sock = useContext(SocketContext)
  const { data, status, update } = useSession()

  return (

    <div className="main-container mt-20">
      <p>Welcome to the homepage</p>
      <Button disabled={status === 'unauthenticated' ? true : false} onClick={() => sock?.sendMessage('hello')}>
        hello
      </Button>
    </div>
  )
}

export default page
