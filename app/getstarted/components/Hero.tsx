import React from 'react';
import CubesUI from '../UIcomponents/Cubes';
import Image from 'next/image';
import kngdmn from '@/public/images/favicond.png';
import { BsChevronDown } from 'react-icons/bs';
import { Link } from 'react-scroll/modules'



const Hero = () => {
    return (
        <main className=''>
            <nav className='border-b py-1 w-[72%] drop-shadow-lg mx-auto  flex justify-center items-center'>
                <Image src={kngdmn} alt='' width={30} height={30} />
            </nav>
            <div className='relative min-h-screen  flex overflow-hidden justify-center items-center    w-full '>
                <CubesUI />
                <div className='absolute w-full flex flex-col   justify-center items-center  min-h-screen '>
                    <div className='border-t flex  flex-col justify-center items-center  border-b   w-full  backdrop-blur-xl p-1 '>
                        <div className='flex  cursor-default   items-center text-base font-semibold  align-top text-clip'>
                            <h2 className='text-7xl drop-shadow-lg tracking-wider   text-neutral-900 dark:text-neutral-200 border-t-8 border-double border-b-8 rounded-br-large   dark:border-white   rounded-tl-large border-black'>ORGNER</h2>
                        </div>
                        <p className='flex text-neutral-700 dark:text-neutral-200  drop-shadow-md font-bold tracking-widest'>MAKE YOUR COMPANY EASY AND SIMPLE TO ORGANISE ...</p>
                    </div>
                    <div className='mt-11 flex  justify-center items-center text-center'>

                        <a href='/signin' className='hover:opacity-75 text-neutral-300 p-2 border backdrop-blur-2xl backdrop-brightness-75  font-semibold rounded-lg'>Continue </a>

                        <div className='absolute flex justify-center items-center bottom-3 mb-16'>
                            <Link
                                to='about'
                                activeClass='active'
                                spy={true}
                                smooth={true}
                                offset={-100}
                                duration={500}
                                className='  mt-10 text-neutral-200  shadow-md animate-bounce duration-500 rounded-full backdrop-blur-lg p-2'
                            >
                                <BsChevronDown
                                    className='font-bold hover:cursor-pointer'
                                />
                            </Link>
                        </div>
                    </div>
                </div>



            </div>



        </main>
    )
}

export default Hero