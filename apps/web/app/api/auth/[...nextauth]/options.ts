import { prisma } from "@/prisma"
import { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions: AuthOptions = {
    providers: [
        GithubProvider({
            clientId: '4781a1270bf510824334',
            clientSecret: '5dbef2984d8ea50631b0e92ca37514c9e17cc7bb',
        }),
    ],
    callbacks: {
        signIn: async (user) => {
            if (user.user.email && user.user.image && user.user.name) {
                const userInDb = await prisma.user.findFirst({
                    where: {
                        email: user.user.email
                    }
                })
                console.log(userInDb);
                
                if (!userInDb) {
                    await prisma.user.create({
                        data: {
                            email: user.user.email,
                            name: user.user.name,
                            imageUrl: user.user.image
                        }
                    })
                }
            } else {
                console.log('Email or name or image not found.');

                return false
            }
            return true
        }
    }
}

export default authOptions