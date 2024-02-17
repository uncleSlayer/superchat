'use server'

import { prisma } from "@/prisma"
import { getServerSession } from "next-auth"

export async function getAllFriends() {

  const serverSession = await getServerSession()

  const user = serverSession?.user

  if (!user || !user.email || !user.name) return { success: false, error: 'User is not logged in.' }

  const loggedInUserInDb = await prisma.user.findUnique({
    where: { email: user.email },
    include: {
      FriendRequestSent: {
        where: { sender: { email: user.email }, status: 'RESOLVED' },
        include: { sender: true, receiver: true }
      },
      FriendRequestReceived: {
        where: { receiver: { email: user.email }, status: 'RESOLVED' },
        include: { sender: true, receiver: true }
      }
    }
  })

  if (!loggedInUserInDb) return { success: false, error: 'No friends found.' }

  return {
    data: loggedInUserInDb
  }

}
