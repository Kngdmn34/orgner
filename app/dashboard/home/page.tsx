'use client'
import SideBar from '@/app/components/SideBar';
import React, { useState } from 'react';


const Home = () => {

    const [navbar, setNavbar] = useState(false)



    return (
        <div className='flex cursor-default'>
            <SideBar label={true} navbar={navbar} setNavbar={setNavbar} />
            <div className={`flex ${navbar ? `-translate-x-16 ` : `translate-x-0`} ease-in-out duration-300 flex-col justify-start mx-10 mt-16`}>
                <h3 className='text-tiny text-neutral-500 italic ml-8'>Testing Beta v0</h3>
                <h1 className='text-6xl font-extralight'>What&#39;s New ?</h1>
                <span className='flex flex-col space-y-3'>
                    <ul style={{ listStyleType: 'circle' }}>
                        <li >
                            Some Bugs Fixed
                        </li>
                        <li >
                            Refactor UI
                        </li>
                    </ul>
                </span>
            </div>
        </div>
    )
}

export default Home
