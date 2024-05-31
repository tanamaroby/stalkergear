'use client'
import { User } from '@/lib/types'
import Link from 'next/link'
import { useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { Button } from './ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './ui/card'

export interface UserCardProps {
    user: User
    className?: string
}

function UserRow(props: { name: string; value: string }) {
    const { name, value } = props
    return (
        <div className='flex flex-row'>
            <div className='w-2/5'>
                <p className='font-bold'>{name}</p>
            </div>
            <div className='grow'>
                <p>{value}</p>
            </div>
        </div>
    )
}

export default function UserCard(props: UserCardProps) {
    const { user, className } = props
    const [loading, setLoading] = useState<boolean>(false)
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{user.login}</CardTitle>
                <CardDescription>ID: {user.id}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-y-4'>
                    <img
                        src={user.image.link}
                        className='w-full aspect-square object-cover border-2 border-slate-500 rounded-md'
                    />
                    <div className='flex flex-col'>
                        <UserRow name='First Name' value={user.first_name} />
                        <UserRow name='Last Name' value={user.last_name} />
                        <UserRow name='Display Name' value={user.displayname} />
                        <UserRow name='Kind' value={user.kind} />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Link href={`/users/${user.id}`}>
                    <Button variant='outline' onClick={() => setLoading(true)}>
                        {loading ? <BeatLoader color='white' /> : 'Access'}
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
