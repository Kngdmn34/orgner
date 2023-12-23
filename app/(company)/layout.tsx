

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
    children
}: {
    children: React.ReactNode
}) => {



    return (


        <body  >
            {children}

        </body>

    )
}

export default CompanyLayout