import React from 'react'

const About = () => {
    return (

        <section id='about' >
            <div className='relative mt-36 flex flex-col  justify-center items-center'>
                <br />
                <h1 className='text-center text-xl font-bold tracking-wide'>WHAT IS ORGNER </h1>
                <hr className=' w-6 border-b my-2 border-neutral-700 ' />

            </div>

            <div className='w-[72%] mx-auto mb-52  mt-10'>
                <div className=' flex flex-col space-y-5 justify-center '>
                    <p className='text-lg indent-5 drop-shadow-sm '>Introducing orgner beta, the web application designed to streamline and optimize your organization&#39;s structure. While orgneR is currently undergoing construction, it promises to revolutionize the way you manage your organization. Please note that certain features are temporarily disabled or under development, but the future holds a dynamic and powerful tool for enhancing your organizational efficiency </p>

                </div>
            </div>

        </section>
    )
}

export default About