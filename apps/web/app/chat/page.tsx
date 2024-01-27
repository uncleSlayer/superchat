'use client'

import React, { useState } from 'react'
import { Card } from "@/components/ui/card"
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'
import ChatWindow from './ChatWindow'

const page = () => {
  const [clickedPerson, setClickedPerson] = useState<null | { id: string, name: string, email: string, imageUrl: string }>(null)

  const { error, data: friendsList, isLoading } = useQuery({
    queryKey: ['friendsList'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/api/friends/friends')
      const jsonResponse = await response.json()
      return jsonResponse.data
    }
  })

  if (error) return <p>{error.message}</p>
  if (isLoading) return (
    <div className='flex gap-5 h-[80vh] justify-between p-2'>
      <Card className="shadow-lg text-black border-2 basis-1/5">
        <h3 className="m-2 font-semibold dark:text-white">Friends</h3>
        <hr />
        <div className="m-2">
          <ul>
            <li><Skeleton className="h-6 my-2 w-auto" /></li>
            <li><Skeleton className="h-6 my-2 w-auto" /></li>
          </ul>
        </div>
      </Card>

      <Card className='h-full p-2 border-2 border-slate-200 basis-4/5 rounded-lg shadow-lg'>
        <Skeleton className="h-40 rounded-lg my-2 w-auto" />
      </Card>
    </div >
  )

  return (
    <div className='flex gap-5 h-[75vh] justify-between mt-2 p-2'>
      <Card className="shadow-lg text-black border-2 basis-1/5">
        <h3 className="m-2 font-semibold dark:text-white">Friends</h3>
        <hr />
        <div className="m-2">
          <ul>
            {
              friendsList.map((friend: { id: string, name: string, email: string, imageUrl: string }, index: number) => {
                return <li onClick={() => setClickedPerson(friend)} className='p-1 mt-2 cursor-pointer dark:text-white rounded-lg shadow-lg border-2 border-slate-200' key={friend.id}><p> {friend.name} </p></li>
              })
            }
          </ul>
        </div>
      </Card>

      <Card className='h-full border-2 p-2 border-slate-200 basis-4/5 rounded-lg shadow-lg'>
        <ChatWindow friendInfo={clickedPerson} />
      </Card>
    </div >

  )
}

export default page
