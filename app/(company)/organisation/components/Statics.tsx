'use client'

import React, { Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import axios from 'axios';

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
import Laws from './Laws';
import { Button, useDisclosure } from '@nextui-org/react';



interface StaticsProps {
    OrganisationData: {
        organisationName: string;
        employees: number;
        phase: string;
        country: string;
        value: string;
    };

}

type TasksData = {
    tasks: number
}




const Statics: React.FC<StaticsProps> = ({ OrganisationData }) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [tsks, setTsks] = useState<TasksData[] | null>([])
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
            props: `${tsks?.length}`,
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





    const lawsCondition = [
        {
            label: 'Challenging',
            value: 'morocco',
            description: "Morocco aspires to establish a business law that promotes the economic development of the country and settles disputes in an appropriate and effective manner. A new legal framework, based on a clear and predictable structure and content, that is reasonably applied by the economic actors and wisely interpreted by the Moroccan courts. In order to achieve this goal, Morocco has launched, since the early 1990s, a series of legal reforms designed to modernise the legal and regulatory framework for business, amend and modify several legislation and codes including: the commercial code, the investment charter, the intellectual property law, the law on freedom of pricing and competition, the law on public-private partnership, the law on public limited companies and the arbitration act. Furthermore, Morocco's accession to the world trade organization, the ratification of the free trade agreement with the United States and the partnership agreements with the European Union have served as a catalyst for the process of legislative reform. The main projects of reform that have been adopted in recent years are listed hereunder: The adoption of the law on public-private partnership (in 2020); The adoption of the Movable Collateral Act / Personal Property Security Act (in 2019); The adoption of the deconcentration charter (in 2019); The reform of book V of the commercial code on the regulation of corporate insolvency (in 2018); The reform of law no. 17.95 on public limited companies (in 2019 and 2015); The adoption of law no.104.12 on the freedom of pricing and competition (in 2014); The adoption of Law no. 103.12 relating to credit institutions and similar bodies (in 2014); Similarly, other projects are in progress in order to establish a transparent and predictable investment climate such as: the investment charter. The Moroccan business law is currently experiencing far-reaching changes. Moreover, the long-term efforts made by the country have contributed to establishing a modern business environment for investors by aligning with international standards in some areas.",

        },
        {
            label: 'Oppurtinity',
            value: 'uae',
            description: ''
        },
        {
            label: 'Challenging',
            value: 'french',
            description: ''
        },
        {
            label: 'Risky',
            value: 'uk',
            description: ''
        }
    ]
    const checkCountryValue = () => {
        const matchedCondition = lawsCondition.find((condition) => condition.value === OrganisationData.country);

        return matchedCondition && matchedCondition.label
    }
    const lawsResult = () => {
        const matchedCondition = lawsCondition.find((condition) => condition.value === OrganisationData.country);
        return matchedCondition && matchedCondition.description
    }

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
            props: `${checkCountryValue()}`,
            link: `/`,
            shadow: `shadow-teal-800`,

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



    useEffect(() => {
        setLoading(true)
        axios.get('/api/tasks')
            .then((res) => {
                // Check if the response contains data
                if (res.data && res.data.tasks) {

                    setTsks(res.data.tasks);

                    setLoading(false)
                    console.log(res.data.tasks)
                } else {
                    console.log('No organization data found');
                    setLoading(false)
                }
            })
            .catch((error) => {
                console.error('API request error:', error);
                setLoading(false)
            });
    }, []);



    return (
        <Suspense fallback={'loading'}>
            <div className='w-full  overflow-hidden  '>
                <span className='flex pt-5 mx-10 w-[86%] items-center flex-row space-x-10'>
                    <h1 className=' tracking-wide font-semibold text-3xl text-neutral-800 dark:text-neutral-300 drop-shadow-sm'>
                        {OrganisationData?.organisationName.toUpperCase().slice(0, 15)}


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
                                <span onClick={() => alert('Function will be added next update')} key={section.id} className='hover:scale-105 transition-transform' >

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