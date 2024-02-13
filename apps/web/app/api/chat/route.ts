import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/index'
export async function GET(req: NextRequest) {

    try {

        const reqPath = req.nextUrl.searchParams
        const otherPersonEmail = reqPath.get('otherPersonEmail')
        if (!otherPersonEmail) return new NextResponse(JSON.stringify({ error: 'specify to email.' }))

        const loggedUser = await getServerSession()
        if (!loggedUser || !loggedUser.user?.email) return new NextResponse(JSON.stringify({ error: 'Something went wrong while retriving user data. Please login again.' }))

        const data = await prisma.messages.findMany({
            where: {
                OR: [
                    { sender: { email: loggedUser.user.email }, receiver: { email: otherPersonEmail } },
                    { receiver: { email: loggedUser.user.email }, sender: { email: otherPersonEmail } }
                ]
            },

            include: {
                receiver: true,
                sender: true
            }
        })

        if (!data) return new NextResponse(JSON.stringify({ error: 'Something went wrong. Can not retrive logged in user information from DB.' }))

        return new NextResponse(JSON.stringify({ data }))

    } catch (error) {
        console.log(error);

        return new NextResponse(JSON.stringify({ error: error }))
    }

}