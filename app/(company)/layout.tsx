

import Provider from '../Provider';
import type { Metadata } from 'next/types';


import ToasterUIProvider from '../context/ToasterUIProvider';
import SessionOptions from '../context/SessionOptions';
import SideBar from '../components/SideBar';
import NextProvider from '../NextProvider';





export const metadata: Metadata = {
    title: 'ORGNER',

}

const CompanyLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {



    return (


        <section  >



            <div className='flex flex-row space-x-5'>


                <SideBar />
                {children}

            </div>



        </section>

    )
}

export default CompanyLayout