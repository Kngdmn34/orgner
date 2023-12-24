export { default, withAuth } from "next-auth/middleware"

export const config = { 
    
    matcher: ["/dashboard/:path*"],
    pages: {
        signIn: '/login',
        error: '/error',
      }

}

