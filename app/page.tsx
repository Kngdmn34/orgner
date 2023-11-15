'use client'

import Hero from "./getstarted/components/Hero";
import About from "./getstarted/components/About";
//icons 
import { IoWarningOutline } from 'react-icons/io5'


export default function Home() {

  return (
    <>
      <main className='hidden md:flex '>

        <div>
          <Hero />
          <About />
        </div>


      </main>
      <main className='md:hidden flex justify-center min-h-screen items-center '>

        <span className="flex flex-row items-center space-x-5">
          <span><IoWarningOutline className='text-yellow-700 drop-shadow-lg' /></span>
          <h1>Mobile version is unsported for now </h1>
        </span>

      </main>
    </>


  )
}
