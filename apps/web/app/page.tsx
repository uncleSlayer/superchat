'use client'

import { Button } from "@/components/ui/button";
import { useSocket } from "@/contexts/SocketProvider";

const page = () => {
  const { sendMessage } = useSocket()

  return (
    <div className="main-container mt-20">
      <p>Welcome to the homepage</p>
      <Button onClick={() => sendMessage('hello boi')}>
        hello
      </Button>
    </div>
  )
}

export default page