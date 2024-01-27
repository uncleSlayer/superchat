import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const ChatWindow = ({ friendInfo }: { friendInfo: { id: string, name: string, email: string, imageUrl: string } | null }) => {
  return (
    <div>
      {
        friendInfo && <div>
          <div className='mb-2 flex items-center gap-5 py-2 px-2'>
            <Avatar>
              <AvatarImage src={friendInfo.imageUrl} />
            </Avatar>
            <h3 className='font-semibold'>{friendInfo.name}</h3>
          </div>
          <Separator />
        </div>
      }
    </div>
  )
}

export default ChatWindow
