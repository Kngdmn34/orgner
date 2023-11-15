'use client'

import React, { Suspense } from 'react';
import { FiLoader } from 'react-icons/fi'
import Spline from '@splinetool/react-spline';
import Image from 'next/image'



const CubesUI = () => {
    return (
        <Suspense fallback={<div className=''>
            <span className='flex justify-center items-center min-h-screen'><FiLoader size={40} className='animate-spin' /></span>
        </div>}>
            <div className='   overflow-hidden' >
                <Spline scene='https://prod.spline.design/llxYrfwBJfyougAx/scene.splinecode' />


            </div>
        </Suspense>
    )
}

export default CubesUI