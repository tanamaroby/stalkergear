'use client'

import { CursusUser } from '@/lib/types'
import { map } from 'lodash'
import UserCard from '../UserCard'

export interface HomePageProps {
    fastestUsers: CursusUser[]
}

export default function HomePage(props: HomePageProps) {
    const { fastestUsers } = props
    return (
        <div className='flex flex-col gap-y-4'>
            <p className='text-2xl text-center'>Fastest in 42</p>
            <div className='flex flex-col gap-y-2'>
                {map(fastestUsers, (user, index) => {
                    return (
                        <UserCard
                            key={user.id}
                            cursusUser={user}
                            index={index + 1}
                        />
                    )
                })}
            </div>
        </div>
    )
}
