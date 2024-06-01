import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

const size = 600

export default function ErrorPage() {
    return (
        <div className='flex flex-col flex-grow gap-y-4 items-center justify-center'>
            <p className='text-xl'>An error has occured!</p>
            <Image
                src='/error.png'
                alt='Error icon'
                height={size}
                width={size}
                unoptimized
            />
            <p>Please go back to home page</p>
            <Link href='/'>
                <Button variant='outline'>Back to home</Button>
            </Link>
        </div>
    )
}
