import React, { useContext, useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SocketContext } from '@/contexts/SocketProvider'
import { useSession } from 'next-auth/react'

const ChatWindow = ({ friendInfo }: { friendInfo: { id: string, name: string, email: string, imageUrl: string } | null }) => {

  const [messageText, setMessageText] = useState('')
  useEffect(() => {
    setMessageText('')
  }, [friendInfo])

  const { data: userInformation, status: userStatus } = useSession()
  if (userStatus === 'loading')
    return (
      <h1>user data is still loading</h1>
    )
  const socket = useContext(SocketContext)

  return (
    <div className='h-full'>
      {
        friendInfo && <div className='flex gap-2 flex-col h-full'>
          <Card className='mb-2 basis-1/6 flex cursor-pointer items-center gap-5 py-2 px-2'>
            <Avatar>
              <AvatarImage src={friendInfo.imageUrl} />
            </Avatar>
            <h3 className='font-semibold'>{friendInfo.name}</h3>
          </Card>
          <Card className='basis-4/6'>display chat</Card>
          <Card className='basis-1/6 left-11 flex gap-2 border-none shadow-none items-center py-2'>
            <Input type='text' value={messageText} onChange={(e) => setMessageText(e.target.value)} className='border-2 border-slate-200' />
            <Button onClick={() => {
              socket?.sendMessage({ to: friendInfo.id, msg: messageText, from: userInformation?.user?.email! })
            }} className='' variant='default'>Send</Button>
          </Card>
        </div>
      }
    </div>
  )
}

export default ChatWindow
