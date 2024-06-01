import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'
import './globals.css'

const font = Kanit({ weight: '400', subsets: ['latin'] })

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
            <body
                className={cn(
                    font.className,
                    'flex flex-col flex-grow max-w-[1300px]',
                )}
            >
                <Navbar />
                <div className='p-4 flex flex-col flex-grow'>{children}</div>
                <Footer />
                <Toaster />
            </body>
        </html>
    )
}
