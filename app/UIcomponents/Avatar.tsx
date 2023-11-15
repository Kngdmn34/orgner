import React from 'react';
import Image from 'next/image';
import Profile from '@/public/images/profile.jpeg';
import { Dropdown, Button, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/react";
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation'
//icons

import { GiUbisoftSun } from 'react-icons/gi';
import { FiMoon } from 'react-icons/fi';
import { useSession, signIn, signOut } from "next-auth/react"


const AvatarCom = () => {
    // define theme ... 
    const { theme, setTheme } = useTheme()
    const router = useRouter()
    const session = useSession()

    return (
        <div className='relative w-11 h-11 overflow-hidden'>
            <Dropdown>
                <DropdownTrigger>

                    <img referrerPolicy='no-referrer' className='rounded-lg border cursor-pointer hover:opacity-80' src={`${session.data?.user?.image}`} alt='profile' height={40} width={40} />

                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Action event example"

                >
                    <DropdownItem onPress={() => { theme === 'light' ? setTheme('dark') : setTheme('light') }}>
                        <div className='flex flex-row justify-between'>
                            <span>Theme</span>
                            <span>{theme === 'dark' ? <GiUbisoftSun /> : <FiMoon />}</span>
                        </div>
                    </DropdownItem >
                    <DropdownItem onAction={() => signOut({ callbackUrl: 'http://localhost:3000/' })} key="delete" className="text-danger" color="danger">
                        Sign Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default AvatarCom