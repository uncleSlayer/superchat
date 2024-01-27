import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/index'
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/options";

export async function GET(req: NextRequest) {

  try {

    const loggedInUser = await getServerSession(authOptions)
    if (!loggedInUser?.user?.email) return new NextResponse(JSON.stringify({ error: 'You must be logged in.' }), { status: 400 })

    const loggedInUserInDb = await prisma.user.findFirst({
      where: {
        email: loggedInUser.user.email
      }
    })

    if (!loggedInUserInDb) return new NextResponse(JSON.stringify({ error: 'You are not a registered user.' }), { status: 400 })

    const allFriends = await prisma.friendRequest.findMany({
      where: {
        OR: [
          { senderUserId: loggedInUserInDb.id, status: 'RESOLVED' },
          { receiverUserId: loggedInUserInDb.id, status: 'RESOLVED' }
        ]
      }
    })

    if (!allFriends) return new NextResponse(JSON.stringify({ data: [] }))

    const allFriendsObj = []

    for (let friend of allFriends) {

      if (friend.senderUserId === loggedInUserInDb.id) {

        const friendInDb = await prisma.user.findFirst({ where: { id: friend.receiverUserId } })
        allFriendsObj.push(friendInDb)
      } else {
        const friendInDb = await prisma.user.findFirst({ where: { id: friend.senderUserId } })
        allFriendsObj.push(friendInDb)
      }

    }

    return new NextResponse(JSON.stringify({ data: allFriendsObj }))

  } catch (error) {
    console.log(error)
    return new NextResponse(JSON.stringify({ error: error }), { status: 400 })
  }

}
