import { prisma } from "@/prisma/index";

export async function checkIfFriends(idOne: string, idTwo: string) {
  try {

    const friendRequest = await prisma.friendRequest.findFirst({
      where: {
        OR: [
          { senderUserId: idOne, receiverUserId: idTwo, status: 'RESOLVED' },
          { senderUserId: idTwo, receiverUserId: idOne, status: 'RESOLVED' }
        ]
      }
    })

    if (friendRequest) return true
    else return false

  } catch (error) {
    return error
  }
}
