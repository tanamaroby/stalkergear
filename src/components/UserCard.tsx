'use client'
import { CursusUser } from '@/lib/types'
import { cn } from '@/lib/utils'
import dayjs from 'dayjs'
import { first, isNil } from 'lodash'
import Link from 'next/link'
import { useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'

export interface UserCardProps {
    cursusUser: CursusUser
    className?: string
    index?: number
}

function UserRow(props: {
    name: string | null
    value?: string | number | null
    className?: string
}) {
    const { name, value, className } = props
    return (
        <div className='flex flex-col gap-1 text-center'>
            <Label>{name}</Label>
            <p className={cn('font-bold', className)}>{value}</p>
        </div>
    )
}

export default function UserCard(props: UserCardProps) {
    const { cursusUser, className, index } = props
    const { user } = cursusUser
    const [loading, setLoading] = useState<boolean>(false)
    return (
        <Card className={className}>
            <div className='flex lg:flex-row flex-col items-center justify-center gap-6 p-6'>
                {index ? <p className='text-2xl'>{index}</p> : null}
                <Avatar className='border border-slate-300 h-[80px] w-[80px]'>
                    <AvatarImage
                        src={user?.image?.versions.medium}
                        alt={`${user?.login}'s avatar`}
                        className='object-cover'
                    />
                    <AvatarFallback>
                        {first(user?.first_name)}
                        {first(user?.last_name)}
                    </AvatarFallback>
                </Avatar>
                <div className='flex flex-col lg:flex-row gap-6 flex-grow items-center justify-between'>
                    <CardHeader className='p-0 lg:w-[200px]'>
                        <CardTitle>{user?.login}</CardTitle>
                        <CardDescription>ID: {user?.id}</CardDescription>
                    </CardHeader>
                    <div className='flex flex-col lg:flex-row gap-4 items-center justify-between flex-grow'>
                        <UserRow name='Level' value={cursusUser.level} />
                        <UserRow
                            name='Eval Points'
                            value={user?.correction_point}
                        />
                        <UserRow
                            name='Blackhole'
                            value={dayjs(cursusUser.blackholed_at)
                                .toDate()
                                .toDateString()}
                            className={
                                dayjs(cursusUser.blackholed_at).diff(dayjs()) <
                                0
                                    ? 'text-red-600'
                                    : 'text-green-600'
                            }
                        />
                        <UserRow
                            name='Active?'
                            value={user?.['active?'] ? 'TRUE' : 'FALSE'}
                            className={
                                user?.['active?']
                                    ? 'text-green-600'
                                    : 'text-red-600'
                            }
                        />
                        {!isNil(cursusUser.speed_index) ? (
                            <UserRow
                                name='Speed Index'
                                value={cursusUser.speed_index.toFixed(2)}
                            />
                        ) : null}
                    </div>
                </div>
                <Link href={`https://profile.intra.42.fr/users/${user?.login}`}>
                    <Button variant='outline' onClick={() => setLoading(true)}>
                        {loading ? <BeatLoader color='white' /> : 'Access'}
                    </Button>
                </Link>
            </div>
        </Card>
    )
}
