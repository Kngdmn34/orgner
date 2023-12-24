'use client'
import getOrganisationStatus from '@/app/action/getOrganisation';
import React, { useEffect, useState, Suspense } from 'react';
import Loading from '../loading';



const Healthcheck = () => {

    const [health, setHealth] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            const result = await getOrganisationStatus();
            setHealth(result)

        };
        fetchData()
    }, [])



    return (
        <Suspense fallback={<Loading />}>
            <div>
                {health && health === 'Not Good' ?

                    <p className='relative px-2' >
                        <span className='bg-red-700 rounded-full animate-ping delay-500 w-2 h-2 absolute right-0 top-0'></span>
                        {health}
                    </p>


                    : health}
            </div>
        </Suspense>
    )
}

export default Healthcheck