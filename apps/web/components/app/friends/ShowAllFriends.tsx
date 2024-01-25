'use client'

import React, { useEffect, useState } from 'react'
import { columns } from '../table/columns/ShowAllFriendsColumn'
import { DataTable } from '../table/table/Data-table'

const ShowAllFriends = () => {

  const [friends, setFriends] = useState<null | {
    id: string,
    email: string,
    imageUrl: string,
    name: string
  }[]>(null)

  useEffect(() => {

    const allFriends = fetch('http://localhost:3000/api/friends/friends')

    allFriends.then((resp) => {
      if (resp.ok) return resp.json()
    })
      .then((resp) => {
        console.log(resp.data)
        setFriends(resp.data)
      })

  }, [])

  return (
    <div>
      <h3 className='text-3xl my-2'> Friends </h3>
      {
        friends && (
          <DataTable data={friends} columns={columns} />
        )
      }
    </div>
  )
}

export default ShowAllFriends
