
import React from 'react';

import Auth from '../components/Auth';

const SigninPage = () => {
    return (
        <main className="relative">
            <span className=' flex w-full justify-center p-5'>
                <h1 className='flex justify-center   cursor-default text-3xl drop-shadow-md border-neutral-800 dark:border-neutral-200 border-t-4 border-b-4 border-double rounded-tl-lg rounded-br-lg'>ORGNER</h1>
            </span>
            <span className='absolute z-0 -skew-y-12 top-52 border-neutral-700 dark:border-neutral-200 border-2 w-full  '> </span>
            <span className='absolute  z-0 -skew-y-6 -top-3 border-neutral-700 dark:border-neutral-200 border-2 w-full  '> </span>
            <span className='absolute  z-0 skew-y-6 top-48 border-neutral-700 dark:border-neutral-200 border-2 w-full  '> </span>





            <div className='static mt-44  w-full justify-centerz-10  '>

                <div className="flex relative  flex-col justify-center items-center  w-full text-center   ">
                    <Auth />
                </div>
            </div>
            <span className='absolute z-0 -skew-y-12 border-neutral-700 dark:border-neutral-200 border-2 w-full  '> </span>
            <span className='absolute  z-0 skew-y-6 -bottom-3 border-neutral-700 dark:border-neutral-200 border-2 w-full  '> </span>
            <span className='absolute  z-0 -skew-y-6 -bottom-20 border-neutral-700 dark:border-neutral-200 border-2 w-full  '> </span>



        </main>
    )
}

export default SigninPage