'use client'

import React, { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'


//icons
import { FaUsers } from 'react-icons/fa';
import { FaMoneyBills } from 'react-icons/fa6';
import { PiCompassTool } from 'react-icons/pi'
import { AiOutlineStock } from 'react-icons/ai';
import { FiActivity } from 'react-icons/fi';
import { AiOutlineRadarChart } from 'react-icons/ai';
import { GoLaw } from 'react-icons/go'
import Healthcheck from './Healthcheck';
import Loading from '../loading';



interface StaticsProps {
    OrganisationData: {
        organisationName: string;
        employees: number;
        phase: string;

        value: string;
    };
}


const Statics: React.FC<StaticsProps> = ({ OrganisationData }) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false)


    const sections = [
        {
            id: 1,
            name: 'Employees',
            icon: <FaUsers size={30} className='text-purple-900 drop-shadow-sm' />,
            props: `${OrganisationData.employees}`,
            link: `/zombie`,
            shadow: `shadow-purple-800`
        },
        {
            id: 2,
            name: 'Tasks',
            icon: <AiOutlineRadarChart size={30} className='text-orange-900 drop-shadow-sm' />,
            props: `NONE`,
            link: `/tasks`,
            shadow: `shadow-orange-800`
        },
        {
            id: 3,
            name: `Development`,
            icon: <AiOutlineStock size={30} className='text-green-900 drop-shadow-sm' />,
            props: `${OrganisationData.phase} `,
            link: `/dev`,
            shadow: `shadow-green-900`
        },
        {
            id: 4,
            name: `Finance`,
            icon: <FaMoneyBills size={30} className='text-blue-800 drop-shadow-sm' />,
            props: `NONE `,
            link: `/finance`,
            shadow: `shadow-blue-800`
        },


    ]

    const sectionsEx = [
        {
            id: 1,
            name: 'Strategy',
            icon: <PiCompassTool size={30} className='text-fuchsia-900 drop-shadow-sm' />,
            props: `N/A`,
            link: `/`,
            shadow: `shadow-fuchsia-800`
        },
        {
            id: 2,
            name: 'Laws',
            icon: <GoLaw size={30} className='text-teal-900 drop-shadow-sm' />,
            props: `NONE`,
            link: `/`,
            shadow: `shadow-teal-800`
        },



    ]

    const condition = [
        {
            name: 'Status',
            icon: <FiActivity size={30} />,
            props: <Suspense fallback={<Loading />}><Healthcheck /></Suspense>,
            caution: ``,
            info: ``,

        }
    ]

    return (
        <Suspense fallback={'loading'}>
            <div className='w-full  overflow-hidden  '>
                <span className='flex pt-5 mx-10 w-[86%] items-center flex-row space-x-10'>
                    <h1 className=' tracking-wide font-semibold text-3xl text-neutral-800 dark:text-neutral-300 drop-shadow-sm'>
                        {OrganisationData.organisationName.toUpperCase().slice(0, 15)}


                    </h1>
                    <h1 className='font-semibold text-medium drop-shadow-sm border-l px-5'>Overview</h1>

                </span>
                <br />
                <hr className='flex w-[72%]  mx-auto  border-b my-1' />
                <div className=' w-full grid grid-cols-3 place-content-center mt-20  '>
                    <div className='relative  '>
                        <span className='mx-6 flex flex-col items-center space-y-3'>

                            {sections.map((section) => (
                                <Link href={`${section.link}`} key={section.id} className='hover:scale-105 transition-transform' >

                                    <div className={`relative flex flex-row space-x-3  bg-gray-50/50 dark:bg-neutral-950 rounded-md w-48 p-2 shadow-sm ${section.shadow} `}>
                                        <div className='w-20 flex flex-col space-y-3 items-center drop-shadow-sm'>

                                            <h2 className='text-tiny font-bold  '>{section.name}</h2>
                                            <h1 className=''>{section.icon}</h1>
                                        </div>
                                        <h1 className=' flex justify-end items-center font-bold'>
                                            {section.props}
                                        </h1>
                                    </div>
                                </Link>

                            ))}

                        </span>



                    </div>
                    <div className='flex justify-center items-center'>
                        {condition.map((condition, index) => (
                            <span key={index} >
                                <div className='flex justify-center items-center h-36 w-36 border  rounded-full shadow-lg '>
                                    <span className='flex flex-col space-y-3 justify-center drop-shadow-sm items-center'>
                                        {condition.name}
                                        {condition.icon}
                                        <p className='font-bold'>{condition.props}</p>

                                    </span>

                                </div>
                            </span>

                        ))}

                    </div>
                    <div className='relative  '>
                        <span className='mx-6 flex flex-col items-center space-y-3'>

                            {sectionsEx.map((section) => (
                                <span onClick={() => alert('will be Avaible next update')} key={section.id} className='hover:scale-105 transition-transform' >

                                    <div className={`relative flex flex-row space-x-3  bg-gray-50/50 dark:bg-neutral-950 rounded-md w-48 p-2 shadow-sm ${section.shadow} `}>
                                        <div className='w-20 flex flex-col space-y-3 items-center drop-shadow-sm'>

                                            <h2 className='text-tiny font-bold  '>{section.name}</h2>
                                            <h1 className=''>{section.icon}</h1>
                                        </div>
                                        <h1 className=' flex justify-end items-center font-bold'>
                                            {section.props}
                                        </h1>
                                    </div>

                                </span>
                            ))}

                        </span>



                    </div>

                </div>


            </div>

        </Suspense>
    )
}

export default Statics