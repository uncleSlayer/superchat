'use server'

import authOptions from "@/app/api/auth/[...nextauth]/options"
import { prisma } from "@/prisma"
import { getServerSession } from "next-auth"

export async function getAllSentRequests() {

  const loggedInUserSession = await getServerSession(authOptions)

  if (!loggedInUserSession?.user?.email || !loggedInUserSession.user.name) return { error: 'You are not logged in.' }

  const allFriendRequests = await prisma.friendRequest.findMany({
    where: {
      sender: { email: loggedInUserSession.user.email },
      status: 'PENDING'
    },
    include: {
      sender: true,
      receiver: true
    }
  })

  return {
    data: allFriendRequests
  }

}
