import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/[...nextauth]/options";
import { prisma } from '@/prisma/index'

export async function POST(req: NextRequest) {

    try {

        const loggedInUser = await getServerSession(authOptions)

        if (!loggedInUser) return new NextResponse(JSON.stringify({ error: 'User is not logged in.' }), { status: 400 })

        const reqBody = await req.json()
        const searchedUserEmail: string = reqBody.email

        if (loggedInUser.user?.email === searchedUserEmail) return new NextResponse(JSON.stringify({ error: 'You can not search for yourself.' }), { status: 400 })

        const searchedUser = await prisma.user.findFirst({
            where: { email: searchedUserEmail }
        }) 

        if (!searchedUser) return new NextResponse(JSON.stringify({ error: 'Searched user not found.' }), { status: 400 })

        return new NextResponse(JSON.stringify({
            success: true,
            data: searchedUser
        }))

    } catch (error) {
        console.log(error);

        return new NextResponse(JSON.stringify({
            success: false,
            error: error
        }), { status: 400 })
    }

}

