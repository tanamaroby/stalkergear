import { User } from '@/lib/types'
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
    const { user } = props
    return (
        <Card>
            <CardHeader>
                <CardTitle>{user.login}</CardTitle>
                <CardDescription>ID: {user.id}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-y-4'>
                    <img
                        src={user.image.versions.medium}
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
                <Button variant='outline'>Access</Button>
            </CardFooter>
        </Card>
    )
}