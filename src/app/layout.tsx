import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Oswald } from 'next/font/google'
import './globals.css'

const oswald = Oswald({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Stalker Gear',
    description: 'We use this to stalk!!!',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en' className='min-h-screen flex justify-center'>
            <body className={cn(oswald.className, 'flex flex-col flex-grow')}>
                <Navbar />
                <div className='p-4 flex flex-col flex-grow'>{children}</div>
                <Footer />
            </body>
        </html>
    )
}
