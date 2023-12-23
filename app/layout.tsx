import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css';
import Provider from './Provider';
import NextProvider from './NextProvider';
import SideBar from './components/SideBar';
import SessionOptions from './context/SessionOptions';
import ToasterUIProvider from './context/ToasterUIProvider';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Get Started',
  description: 'ORGNER',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={`${inter.className} `}>
        <SessionOptions>
          <NextProvider>
            <Provider >

              <NextTopLoader showSpinner={false} height={6} />
              <ToasterUIProvider />


              {children}


            </Provider>
          </NextProvider>
        </SessionOptions>
      </body>


    </html>
  )
}
