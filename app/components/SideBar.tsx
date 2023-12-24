'use client'

//plugins

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Suspense } from 'react';
import Image from 'next/image';
import { useSession, signOut } from "next-auth/react";


//UI components

import AvatarCom from '../UIcomponents/Avatar';
import Kngdmn from '@/public/images/favicond.png'

//icons 
import { LiaConnectdevelop, LiaSignOutAltSolid } from 'react-icons/lia';
import { FaMoneyBills } from 'react-icons/fa6';
import { FaUsers } from 'react-icons/fa';
import { AiOutlineRadarChart, AiOutlineStock } from 'react-icons/ai';
import { IoMdInformationCircleOutline } from "react-icons/io";

import { BiMenuAltLeft, BiMenu } from 'react-icons/bi'


interface SidebarProps {

    navbar: boolean
    setNavbar: (value: boolean) => void
    label?: boolean
}





const SideBar: React.FC<SidebarProps> = ({ navbar, setNavbar, label }) => {




    const branches = [
        {
            label: 'Organisation',
            icon: <LiaConnectdevelop size={20} />,
            Link: '/dashboard/organisation',
            bg: `bg-red-400`
        },
        {

            label: 'Employees',
            icon: <FaUsers size={20} />,
            Link: `/dashboard/zombie`,

        },
        {
            label: 'Tasks',
            icon: <AiOutlineRadarChart size={20} />,
            Link: '/dashboard/tasks'
        },
        {
            label: 'Development',
            bg: `bg-green-400`,
            icon: <AiOutlineStock size={20} />,
            Link: '/dashboard/dev'
        },
        {
            label: 'Finance',
            icon: <FaMoneyBills size={20} />,
            Link: '/dashboard/finance'
        },
    ]



    const session = useSession();

    const toggleSideBar = () => {
        setNavbar(!navbar)

    }

    //next update make a dynamic sidebar
    return (
        <Suspense fallback={<div>Loading</div>}>

            <div className={`stickey shadow-lg left-0  w-52 z-10 min-h-screen dark:bg-neutral-950 bg-gray-50 ${navbar ? `-translate-x-36 duration-400` : `translate-x-0 duration-400`}`}>

                {!label && <button onClick={() => toggleSideBar()} className={` absolute p-3 z-10  ${navbar ? `-right-5` : `right-0`}`} >
                    {navbar == true ? <BiMenuAltLeft size={20} /> : <BiMenu size={20} />}
                </button>
                }

                <div className={`mx-2  flex ${navbar ? `justify-end items-center translate-x-20 duration-500 ` : ` justify-between items-center space-x-10`} `}>
                    <div className={`mt-11 ${navbar ? `` : `w-full border-neutral-300 border-b  p-3 px-3 `}`}>
                        <div className={`flex ${navbar ? `justify-end items-center translate-x-3 duration-500 ` : ` justify-between items-center `}  `}>
                            <div className={`flex   ${!navbar ? `` : `  absolute mt-3 right-16`}`}>
                                <AvatarCom />
                            </div>
                            <div className={`flex  items-center ${navbar ? `-translate-x-96 duration-400` : `translate-x-0 duration-400`}`}>
                                <h1 className='cursor-default font-semibold text-sm drop-shadow-sm'>{session.data?.user?.name?.slice(0, 15)}</h1>



                            </div>
                        </div>
                    </div>


                </div>
                {!navbar &&
                    <span className='flex mx-auto mt-2 rounded-lg text-sm border dark:text-neutral-800 bg-yellow-200 w-[72%] items-center'><IoMdInformationCircleOutline /> <p className='ml-6 text-small'>Testing Beta</p></span>
                }
                {!navbar ?
                    <div className={`flex flex-col space-y-28 ${navbar ? `-translate-x-96 duration-400 ` : `-translate-x-0 duration-400`}`}>
                        <div className='mt-10'>
                            <div className=''>
                                <div className='mx-5 w-full text-normal tracking-wide font-semibold flex  flex-col  space-y-5 '>
                                    <ul>
                                        {branches.map((branche, id) => (
                                            <Link href={`${branche.Link}`} key={id} className={``}  >



                                                <div className={`flex py-2 px-3 translate-x-0 flex-row space-x-5 overflow-hidden items-center tracking-wider hover:translate-x-8 transition-transform  duration-500  `}>
                                                    <span>{branche.icon}</span>

                                                    <h1 >{branche.label}</h1>
                                                </div>

                                            </Link>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className={`flex flex-col space-y-28 ${!navbar ? `-translate-x-72 duration-400 ` : `translate-x-32 duration-400`}`}>
                        <div className='mt-10'>
                            <div className=''>
                                <div className='mx-5 w-full text-normal tracking-wide font-semibold flex  flex-col  space-y-5 '>
                                    <ul>
                                        {branches.map((branche, id) => (
                                            <Link href={`${branche.Link}`} key={id} className=' '  >



                                                <div className={`flex py-2 px-3 drop-shadow-lg translate-x-0  overflow-hidden items-center tracking-wider hover:translate-x-8 transition-transform  duration-500  `}>
                                                    <span>{branche.icon}</span>

                                                </div>

                                            </Link>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className={`absolute ${!navbar ? `w-52` : `w-11`} bottom-1.5 cursor-default `}>

                    <hr className='w-full mb-2 mx-auto border-b' />
                    <div className=' mx-3 flex flex-row justify-between space-x-4 items-center  '>
                        <h2 className='drop-shadow-md text-tiny text-neutral-600  text-opacity-80 border-double border-t-8 border-b-8 rounded-br-large opacity-30  border-neutral-600   rounded-tl-large '>ORGNER</h2>
                        <Image className='drop-shadow-md' alt='' src={Kngdmn} width={20} height={20} />
                    </div>
                </div>

            </div>
        </Suspense>
    )



}

export default SideBar