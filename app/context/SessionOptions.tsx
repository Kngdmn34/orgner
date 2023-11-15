'use client'

import { SessionProvider } from "next-auth/react"



const SessionOptions = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider >
            {children}

        </SessionProvider>
    )
}

export default SessionOptions