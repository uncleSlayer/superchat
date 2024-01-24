import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/index'
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {

  try {

    const response: {

      type: 'accept' | 'reject',
      receiverId: string

    } = (await req.json())

    const loggedInUser = await getServerSession(authOptions)

    if (!loggedInUser?.user?.email) return new NextResponse(JSON.stringify({ error: 'You are not a registered of our website.' }))

    const loggedInUserInDb = await prisma.user.findFirst({ where: { email: loggedInUser.user.email } })

    if (loggedInUserInDb?.id !== response.receiverId) return new NextResponse(JSON.stringify({ error: 'You can not receive the request sent by you. You can cancel the request if you want.' }))

    if (!loggedInUserInDb?.id) return new NextResponse(JSON.stringify({ error: 'You are not a registered of our website.' }))
    const requestToRespond = await prisma.friendRequest.findFirst({

      where: {
        senderUserId: loggedInUserInDb.id,
        receiverUserId: response.receiverId,
        status: 'PENDING'
      }

    })

    if (!requestToRespond) return new NextResponse(JSON.stringify({ error: 'Friend request details not valid' }))

    if (response.type === 'accept') {

      await prisma.friendRequest.update({
        where: {
          id: requestToRespond.id
        },

        data: {
          status: 'RESOLVED'
        }
      })

      return new NextResponse(JSON.stringify({
        success: true,
        message: 'Friend request accepted'
      }))

    } else if (response.type === 'reject') {
      await prisma.friendRequest.delete({
        where: {
          id: requestToRespond.id
        }
      })

      return new NextResponse(JSON.stringify({
        success: true,
        message: 'Friend request rejected'
      }))
    }

  } catch (error) {
    console.log(error);

    return new NextResponse(JSON.stringify({ error: error }), { status: 400 })
  }

}
