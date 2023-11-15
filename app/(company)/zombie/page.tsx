'use client'

import React, { useState, useEffect, Suspense } from 'react';


import axios from 'axios'

import { useRouter } from 'next/navigation';
import Action from './UIcomponents/Action';
import ModalApp from './UIcomponents/Modal';
//icons
import { BiLoaderAlt } from 'react-icons/bi';
import { AiOutlineLeft } from 'react-icons/ai'
import clsx from 'clsx';





type zombieslist = {
    name: string;
    position: string;
    status: string
}




const Zombiespage = () => {

    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [zombies, setZombie] = useState<zombieslist[] | null>([])
    const router = useRouter()




    useEffect(() => {

        try {
            setLoading(true)
            axios.get('/api/zombie')
                .then((res) => {
                    if (res.data && res.data.zombies) {
                        const zombieData: zombieslist[] = (res.data.zombies)
                        setZombie(zombieData)
                        console.log(res.data)

                    }
                    else {
                        console.log('No zombies axios ')
                    }
                }
                )

        } catch (error) {
            console.log('Fetching Zombies Error AXIOS')
        }
        finally {
            setLoading(false)
        }

    }, [])

    if (loading) {
        return <div className='flex justify-center items-center'> <BiLoaderAlt size={30} /> </div>
    }




    return (
        <main className='flex border-2  w-full m-6 rounded-lg shadow-xl dark:shadow-purple-800'>
            <div className='flex flex-col w-full space-y-10'>
                <div className='flex pt-5 flex-row items-center space-x-3' >
                    <button className='p-4' onClick={() => router.back()}><AiOutlineLeft size={20} /></button>
                    <h1 className='p-4 border-l tracking-widest drop-shadow-sm'>WORKERS</h1>

                </div>

                <hr className='w-[80%] mx-auto' />
                <div className={clsx(`flex  items-center space-x-5 justify-center mx-5 ${zombies?.length == 0 ? `justify-center` : `justify-between`}`)}>
                    {zombies?.length !== 0 ?
                        <span>
                            <input onChange={(e) => setQuery(e.target.value)} placeholder='Search ... ' className='border-2 p-1 rounded-lg' />
                        </span>
                        :
                        ''
                    }


                    <ModalApp />

                </div>
                {zombies?.length == 0 ? <div className='flex justify-center items-center w-full h-52 drop-shadow-md'>Click + to add workers</div> :
                    <Suspense fallback={<p>Getting your Workers</p>}>
                        <div className='flex w-full justify-center '>
                            <div className="relative  w-full overflow-x-auto">
                                <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-neutral-900 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Workers
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Role
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Status
                                            </th>
                                            <th scope="col " className="text-left px-6 py-3">
                                                Action
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {zombies?.filter(zombie => zombie.name.toLowerCase().includes(query)).map((zombie, id) => (
                                            <>
                                                <tr key={id} className="bg-white border-b dark:bg-neutral-800 dark:border-gray-700">

                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {zombie.name}
                                                    </th>

                                                    <td className="px-6 py-4">
                                                        {zombie.position}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {zombie.status}
                                                    </td>

                                                    <td className="px-6 w-16 py-4">
                                                        <Action />
                                                    </td>


                                                </tr>
                                            </>

                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Suspense>
                }
            </div>
        </main>
    )
}

export default Zombiespage