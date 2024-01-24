import { prisma } from "@/prisma"
import { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
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
