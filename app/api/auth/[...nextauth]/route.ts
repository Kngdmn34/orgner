import NextAuth,{AuthOptions} from "next-auth";

import prisma from '@/app/libs/prismadb'
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github"

export const authOptions:AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string ,
      clientSecret: process.env.GITHUB_SECRET as string ,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    })
    
  ],
  debug: process.env.NODE_ENV === 'production',
   secret:  process.env.NEXTAUTH_SECRET,
   session: {
    strategy: "jwt"
},
pages:{
  signIn: '/signin'
},

callbacks: {
    async jwt({token, user}){
 if(user){
return {...token, name: user.name}
}
return token
    },
    async session({ session, token }) {
        return { 

            ...session,
            user: { 
                ...session.user,
                username: token.name,
                
}
        }
        return session
      },
}

}

const handler =  NextAuth(authOptions)
export { handler as GET, handler as POST }