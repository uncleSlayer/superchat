import SearchFriends from '@/components/app/friends/SearchFriends'
import React from 'react'
import FriendsRequestTable from '@/components/app/friends/FriendsRequestsTable'
import FriendsTable from '@/components/app/friends/FriendsTable'

const page = () => {
    return (
        <div className='main-container mt-20'>
            <SearchFriends />
            <div className='flex gap-3 flex-col md:flex-row'>
                <FriendsRequestTable />
                <FriendsTable />
            </div>
        </div>
    )
}

export default page