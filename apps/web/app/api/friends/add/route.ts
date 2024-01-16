import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/[...nextauth]/options";
import { prisma } from '@/prisma/index'

export async function POST(req: NextRequest) {

    try {

        const reqBody: { email: string } = await req.json()
        const requestEmail = reqBody.email

        const loggedInUser = await getServerSession(authOptions)

        if (!loggedInUser?.user?.email) return new NextResponse(JSON.stringify({ error: 'You are not logged in' }), { status: 400 })

        if (loggedInUser.user.email === requestEmail) return new NextResponse(JSON.stringify({ error: 'You can not send friend request to yourself' }), { status: 400 })

        const loggedInUserInDb = await prisma.user.findFirst({ where: { email: loggedInUser.user.email } })

        if (!loggedInUserInDb) return new NextResponse(JSON.stringify({ error: 'Something went wrong' }), { status: 400 })

        const requestedUser = await prisma.user.findFirst({ where: { email: requestEmail } })

        if (!requestedUser) return new NextResponse(JSON.stringify({ error: 'Requested user not registered on our website' }), { status: 400 })
        
        console.log(loggedInUserInDb, requestedUser);
        

        const friendRequest = await prisma.friendRequest.findFirst({
            where: {
                OR: [
                    { senderUserId: loggedInUserInDb.id, receiverUserId: requestedUser?.id, status: 'PENDING' },
                    { receiverUserId: loggedInUserInDb.id, senderUserId: requestedUser?.id, status: 'PENDING' }
                ]
            }
        })

        if (friendRequest) return new NextResponse(JSON.stringify({ error: 'There is already a pending request with this user.' }), { status: 400 })
        
        const friendRequestResolved = await prisma.friendRequest.findFirst({
            where: {
                OR: [
                    { senderUserId: loggedInUserInDb.id, receiverUserId: requestedUser?.id, status: 'RESOLVED' },
                    { receiverUserId: loggedInUserInDb.id, senderUserId: requestedUser?.id, status: 'RESOLVED' }
                ]
            }
        })

        if (friendRequestResolved) return new NextResponse(JSON.stringify({ error: 'You are already friend with this user.' }), { status: 400 })

        await prisma.friendRequest.create({
            data: {
                receiverUserId: requestedUser.id,
                senderUserId: loggedInUserInDb.id
            }
        })

        return new NextResponse(JSON.stringify({
            success: true,
            message: 'Friend request sent.'
        }))

    } catch (error) {
        console.log(error);
        
        return new NextResponse(JSON.stringify({
            success: false,
            error: error
        }))
    }

}