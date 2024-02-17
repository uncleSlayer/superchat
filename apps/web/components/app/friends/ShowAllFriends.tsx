'use client'

import { columns } from '../table/columns/ShowAllFriendsColumn'
import { DataTable } from '../table/table/Data-table'
import { getAllFriends } from '@/app/actions/friends/getAllFriendAction'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { Skeleton } from "@/components/ui/skeleton"

const ShowAllFriends = () => {

  const { data: friends, isPending, isError } = useQuery({
    queryKey: ['friends'],
    queryFn: async function() {
      const response = await getAllFriends()
      if (response.error) {
        return null
      } else {

        const friendList: { id: string, name: string }[] = []

        response.data?.FriendRequestSent.map((request) => {
          friendList.push({
            id: request.id,
            name: request.receiver.name
          })
        })

        response.data?.FriendRequestReceived.map((request) => {
          friendList.push({
            id: request.id,
            name: request.sender.name
          })
        })

        return friendList

      }
    }
  })

  if (isPending) return <Skeleton className='w-full h-48 my-2' />
  {
    friends && (<DataTable data={friends} columns={columns} />)
  }

  if (isError) return <h3>Something went wrong...</h3>

  return <div>
    <h3 className='text-3xl my-2'> Friends </h3>
    {
      friends && (<DataTable data={friends} columns={columns} />)
    }
  </div>
}

export default ShowAllFriends
