import { NextResponse } from "next/server";
import { prisma } from '@/prisma/index'
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/options";

export async function GET() {
    try {

        const loggedInUser = await getServerSession(authOptions)

        if (!loggedInUser?.user?.email) return new NextResponse(JSON.stringify({ error: 'You are not logged in' }), { status: 404 })

        const loggedInUserInDb = await prisma.user.findFirst({ where: { email: loggedInUser.user.email } })

        if (!loggedInUserInDb) return new NextResponse(JSON.stringify({ error: 'You are not registered in our website' }))

        const FriendRequestSent = await prisma.friendRequest.findMany({ where: { senderUserId: loggedInUserInDb.id, status: 'PENDING' } })

        let friendRequestsSentArr: any[] = []

        for (let friendRequest of FriendRequestSent) {

            friendRequestsSentArr.push({
                sender: (await prisma.user.findFirst({ where: { id: friendRequest.senderUserId } }))?.name,
                receiver: (await prisma.user.findFirst({ where: { id: friendRequest.receiverUserId } }))?.name,
                receiverId: (await prisma.user.findFirst({ where: { id: friendRequest.receiverUserId } }))?.id,
                senderId: (await prisma.user.findFirst({ where: { id: friendRequest.senderUserId } }))?.id
            })

        }

        return new NextResponse(JSON.stringify({
            success: true,
            data: friendRequestsSentArr
        }))

    } catch (error) {
        return new NextResponse(JSON.stringify({
            success: false,
            error: error
        }))
    }
}