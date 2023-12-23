'use client'

import SideBar from '@/app/components/SideBar'
import React, { useState } from 'react'

const Formationpage = () => {

    const [navbar, setNavbar] = useState(false)



    return (
        <main className='flex'>

            <SideBar navbar={navbar} setNavbar={setNavbar} />
            <div className={`flex ${navbar ? `-translate-x-16 ` : `translate-x-0`} ease-in-out duration-300  border-2 border-neutral-700 justify-center items-center w-full m-6 rounded-lg shadow-xl dark:shadow-blue-900`}>
                <h1 className='italic text-small text-neutral-500 drop-shadow-sm '>Finance will be avaible next update</h1>
            </div>
        </main>
    )
}

export default Formationpage