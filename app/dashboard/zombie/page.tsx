'use client'

import React, { useState, useEffect, Suspense } from 'react';


import axios, { AxiosResponse } from 'axios'

import { useRouter } from 'next/navigation';
import Action from './UIcomponents/Action';
import ModalApp from './UIcomponents/Modal';
//icons
import { BiLoaderAlt } from 'react-icons/bi';
import { AiOutlineLeft } from 'react-icons/ai'
import clsx from 'clsx';
import SideBar from '@/app/components/SideBar';
import Cvs from './UIcomponents/Cvs';
import AddDropDown from './UIcomponents/AddDropdown';
import { pages } from 'next/dist/build/templates/app-page';
import useSWR from 'swr';





type zombieslist = {
    id: string
    name: string;
    position: string;
    status: string
}


const fetcher = async () => {
    const respone: AxiosResponse<{ zombies: zombieslist[] }> = await axios.get('/api/zombie')
    if (respone.data && respone.data.zombies) {
        return respone.data.zombies
    }
    return []
}

const Zombiespage = () => {

    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)

    const { data, error } = useSWR('/api/zombie', fetcher)
    const router = useRouter()
    const [navbar, setNavbar] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [personPrPage, setPersonPrPage] = useState(5);


    const lastIndex = currentPage * personPrPage;
    const firstIndex = lastIndex - personPrPage;
    const currentPersons = data?.slice(firstIndex, lastIndex);

    const totalPersons = data?.length;

    let Pages = [];

    if (data) {
        for (let i = 1; i <= Math.ceil((totalPersons || 0) / personPrPage); i++) {
            Pages.push(i)
            console.log(Pages)
        }
    }


    if (loading) {
        return <div className='flex justify-center items-center'> <BiLoaderAlt size={30} /> </div>
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setQuery(searchTerm);

    };


    return (
        <main className='flex'>
            <SideBar navbar={navbar} setNavbar={setNavbar} />
            <main className={`flex ${navbar ? `-translate-x-16 ` : `translate-x-0`} ease-in-out duration-300  border-2 border-neutral-700 w-full m-6 rounded-lg shadow-xl dark:shadow-purple-800`}>
                <div className='flex flex-col w-full space-y-2'>
                    <div className='flex pt-5 flex-row items-center space-x-3' >
                        <button className='p-4' onClick={() => router.back()}><AiOutlineLeft size={20} /></button>
                        <h1 className='p-4 border-l tracking-widest drop-shadow-sm'>WORKERS</h1>

                    </div>


                    <div className={clsx(`flex  items-center space-x-5 justify-center mx-5 `)}>

                        {/*<Cvs />*/}

                        <span>
                            <ModalApp />
                        </span>

                    </div>
                    <hr className='w-[80%] mx-auto' />
                    <span className='mx-11 flex flex-row justify-between space-x-4 items-center'>

                        <span>
                            {data?.length !== 5 ?
                                <span>
                                    <input onChange={handleSearch} placeholder='Search ... ' className='border-2 p-1 rounded-lg' />
                                </span>

                                : ``}
                        </span>
                        <span className='flex border-2 rounded-lg p-1 flex-row space-x-1' >
                            <p>Total </p> <p>{data?.length}</p>
                        </span>
                        <span className='w-full flex justify-end'>
                            {Pages.map((pageNumber) => (
                                <button
                                    key={pageNumber}
                                    onClick={() => setCurrentPage(pageNumber)}
                                    className={`px-3 border rounded-lg py-1 mx-1 text-sm focus:outline-none ${currentPage === pageNumber ? `font-bold` : ``}`}
                                >
                                    {pageNumber}
                                </button>
                            ))}
                        </span>
                    </span>

                    {data?.length == 0 ? <div className='flex justify-center items-center w-full h-52 drop-shadow-md'>Click + to add workers</div> :
                        <Suspense fallback={<p>Getting your Workers</p>}>
                            {query === "" &&
                                <div className='flex w-full justify-center '>
                                    <div className="relative  w-full overflow-x-auto">
                                        <table className="w-full mt-3  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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

                                                {currentPersons?.filter((person) => person.name.toLowerCase().includes(query)).map((zombie, id) => (
                                                    <>
                                                        <tr key={id} className="bg-white border-b dark:bg-neutral-800 dark:border-gray-700">

                                                            <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {zombie.name}
                                                            </th>

                                                            <td className="px-6 py-2">
                                                                {zombie.position}
                                                            </td>
                                                            <td className="px-6 py-2">
                                                                {zombie.status}
                                                            </td>

                                                            <td className="px-6 w-16 py-2">
                                                                <Action id={zombie.id} />
                                                            </td>


                                                        </tr>
                                                    </>

                                                ))}
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            }
                        </Suspense>
                    }
                    {query !== "" &&
                        <Suspense fallback={<p>Getting your Workers</p>}>
                            <div className='flex w-full justify-center '>
                                <div className="relative  w-full overflow-x-auto">
                                    <table className="w-full mt-3  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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

                                            {data?.filter((person) => person.name.toLowerCase().includes(query)).map((data, id) => (
                                                <>
                                                    <tr key={id} className="bg-white border-b dark:bg-neutral-800 dark:border-gray-700">

                                                        <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {data.name}
                                                        </th>

                                                        <td className="px-6 py-2">
                                                            {data.position}
                                                        </td>
                                                        <td className="px-6 py-2">
                                                            {data.status}
                                                        </td>

                                                        <td className="px-6 w-16 py-2">
                                                            <Action id={data.id} />
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
        </main>
    )
}


export default Zombiespage