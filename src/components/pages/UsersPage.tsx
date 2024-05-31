import { User } from '@/lib/types'
import { map } from 'lodash'
import UserCard from '../UserCard'

export interface UsersPageProps {
    users: User[]
}

export default function UsersPage(props: UsersPageProps) {
    const { users } = props
    return (
        <div className='grid grid-cols-3 gap-4'>
            {map(users, (user) => {
                return <UserCard key={user.id} user={user} />
            })}
        </div>
    )
}
