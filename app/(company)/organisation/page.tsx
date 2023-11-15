'use client'

import React, { useState, useEffect, Suspense } from 'react';
import Orgset from './components/Orgset';
import axios from 'axios';
import { AiOutlineLeft } from 'react-icons/ai';
import { useRouter } from 'next/navigation'
import Loading from './loading';
import Statics from './components/Statics';
import { BiLoaderAlt } from 'react-icons/bi';


type OrganisationData = {
    organisationName: string;
    employees: number;
    value: string;
    phase: string;

}

const Organisationpage = () => {

    const [loading, setLoading] = useState(false)
    const [orgData, setOrgData] = useState<OrganisationData | null>(null);
    const [setup, setSetup] = useState(false);
    const router = useRouter()


    useEffect(() => {
        setLoading(true)
        axios.get('/api/organisation')
            .then((res) => {
                // Check if the response contains data
                if (res.data && res.data.organisation) {

                    setOrgData(res.data.organisation);

                    setLoading(false)
                    console.log(res.data.organisation)
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

    const ToggleVariant = () => {
        if (setup === false) {
            setSetup(true)
            { <button></button> }
        }
        if (setup === true) {
            setSetup(false)
        }
    }

    return (
        <>
            {loading ? <div className='flex animate-spin delay-700  w-full justify-center items-center'> <BiLoaderAlt size={50} /></div> : <><main className='flex justify-center border-2   w-full m-6 rounded-lg shadow-xlb dark:shadow-amber-300'>

                {orgData ? (
                    <Statics OrganisationData={orgData} />
                ) : (

                    <>
                        <Suspense fallback={<Loading />} >
                            {setup ?

                                <div className='w-full'>
                                    <span className='flex flex-col justify-start '>
                                        <button className='px-4 w-11 transition-transform hover:-translate-x-3   drop-shadow-md py-2' onClick={() => ToggleVariant()}> <AiOutlineLeft size={25} /></button>
                                        <h1 className='mx-16  drop-shadow-lg text-6xl tracking-wide'>  Create </h1>
                                    </span>
                                    <div className='flex  py-20  justify-center '>

                                        <Orgset />
                                    </div>
                                </div> :
                                <div className='flex flex-col items-center justify-center'>
                                    <div className='w-full flex flex-col justify-center items-center'>
                                        <h1 className='italic text-small text-neutral-400 drop-shadow-sm underline cursor-default'>No Organisation Found, setup new Organisation </h1>

                                    </div>
                                    <button className='text-neutral-400 hover:text-neutral-500' onClick={ToggleVariant}>Set up new organisation  </button>
                                </div>

                            }

                        </Suspense>
                    </>
                )}


            </main></>}

        </>
    );
};

export default Organisationpage;
