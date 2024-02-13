import { prisma } from '../../../prisma/index'

export const createMessage = async (senderEmail: string, receiverEmail: string, message: string) => {

    console.log('I am in create message', senderEmail, receiverEmail, message);
    

    const senderUser = await prisma.user.findUnique({
        where: {
            email: senderEmail
        }
    })

    const receiverUser = await prisma.user.findUnique({
        where: {
            email: receiverEmail
        }
    })

    if (!senderUser || !receiverUser) return null

    const newMessage = await prisma.messages.create({
        data: {
            senderId: senderUser.id,
            receiverId: receiverUser.id,
            message: message
        }
    })

    console.log(newMessage);
    

    if (newMessage) return true
    else return false

}