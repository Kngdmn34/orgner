'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast/headless';
import SocialButton from '../signin/UIcomponents/SocialButton';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc'

const AuthForum = () => {



    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const session = useSession()

    useEffect(() => {
        if (session?.status === 'authenticated') {
            toast.success('Logged')
        }
    }, [session.status, router])

    const SocialAction = (action: string) => {
        setLoading(true)
        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.ok) {

                    router.push('/home')
                }
                if (callback?.error) {
                    toast.error('Something went wrong , Try Again', {

                        style: {
                            borderRadius: '10px',
                            background: 'dark:#333',
                            color: 'dark:#fff',
                        },
                    })
                }
            }).finally(() => setLoading(false))
    }

    return (
        <div className='w-full shadow-inner '>
            <div className='flex flex-col space-y-5 border-t border-b border-gray-400 p-6  '>
                <h1>Continue with ... </h1>
                <div className='flex justify-center '>

                    <form >
                        <span className='flex flex-row space-x-5 items-center '>
                            <SocialButton disabled={loading} onClick={() => SocialAction('github')} ><AiFillGithub /></SocialButton>
                            <SocialButton disabled={true} onClick={() => SocialAction('google')} ><FcGoogle /></SocialButton>
                        </span>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default AuthForum