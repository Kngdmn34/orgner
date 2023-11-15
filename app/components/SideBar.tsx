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







const SideBar = () => {

    const [open, isOpen] = useState(true)
    const [navbar, setNavbar] = useState(false)

    const branches = [
        {
            label: 'Organisation',
            icon: <LiaConnectdevelop size={20} />,
            Link: '/organisation'
        },
        {

            label: 'Employees',
            icon: <FaUsers size={20} />,
            Link: `/zombie`,

        },
        {
            label: 'Tasks',
            icon: <AiOutlineRadarChart size={20} />,
            Link: '/tasks'
        },
        {
            label: 'Development',
            icon: <AiOutlineStock size={20} />,
            Link: '/dev'
        },
        {
            label: 'Finance',
            icon: <FaMoneyBills size={20} />,
            Link: '/finance'
        },
    ]



    const session = useSession();

    const sidebarToggle = () => {
        if (open == true) {
            isOpen(false)
            setNavbar(false)
        } else if (open == false) {
            isOpen(true)
            setNavbar(true)
        }
    }

    //next update make a dynamic sidebar
    return (
        <Suspense fallback={<div>Loading</div>}>

            <div className={` skicky shadow-lg relative  w-72 z-10 min-h-screen dark:bg-neutral-950 bg-gray-50 ${navbar ? `-translate-x-36 duration-400` : `translate-x-0 duration-400`}`}>
                <button onClick={() => sidebarToggle()} className={`hidden absolute p-3 z-10  ${navbar ? `right-10` : `right-0`}`} >
                    {open == true ? <BiMenuAltLeft size={20} /> : <BiMenu size={20} />}
                </button>

                <div className={`mx-2  flex ${navbar ? `justify-end items-center translate-x-20 duration-500 ` : ` justify-between items-center space-x-10`} `}>
                    <div className={`mt-11 ${navbar ? `` : `w-full border-neutral-300 border-b  p-3 px-3 `}`}>
                        <div className={`flex ${navbar ? `justify-end items-center translate-x-3 duration-500 ` : ` justify-between items-center space-x-10`}  `}>
                            <div className='flex'>
                                <AvatarCom />
                            </div>
                            <div className={`flex  items-center ${navbar ? `-translate-x-96 duration-400` : `translate-x-0 duration-400`}`}>
                                <h1 className='cursor-default font-semibold text-sm drop-shadow-sm'>{session.data?.user?.name?.slice(0, 15)}</h1>



                            </div>
                        </div>
                    </div>


                </div>
                <span className='flex mx-auto mt-2 rounded-lg text-sm border bg-yellow-200 w-[72%] items-center'><IoMdInformationCircleOutline /> <p className='ml-6 text-small'>Testing Beta</p></span>
                <div className={`flex flex-col space-y-28 ${navbar ? `-translate-x-96 duration-400 ` : `-translate-x-0 duration-400`}`}>
                    <div className='mt-10'>
                        <div className=''>
                            <div className='mx-5 w-full text-normal tracking-wide font-semibold flex  flex-col items-start space-y-5 '>
                                <ul>
                                    {branches.map((branche, id) => (
                                        <Link href={`${branche.Link}`} key={id} className='px-4 '  >
                                            <div className='flex py-2 px-3  flex-row space-x-5 overflow-hidden items-center tracking-wider hover:translate-x-8 transition-transform  duration-500  '>
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

                <div className='absolute w-52 bottom-1.5 cursor-default '>
                    <hr className='w-48 mb-2 mx-auto border-b' />
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