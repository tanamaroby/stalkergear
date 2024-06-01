import { CursusUser, UserDetail } from '@/lib/types'
import dayjs from 'dayjs'
import { capitalize, find, reduce, size } from 'lodash'
import {
    MailIcon,
    PenToolIcon,
    PhoneIcon,
    StarIcon,
    TagIcon,
    ZapIcon,
} from 'lucide-react'
import Divider from '../Divider'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../ui/card'
import { Label } from '../ui/label'

export interface UserDetailPageProps {
    user: UserDetail
}

export default function UserDetailPage(props: UserDetailPageProps) {
    const { user } = props
    const cursusUser: CursusUser | undefined = find(
        user.cursus_users,
        (cursus) => cursus.cursus_id === 21,
    )
    const totalMark = reduce(
        user.projects_users,
        (prev, curr) => prev + (curr.final_mark ?? 0),
        0,
    )
    const totalProjectsFinished = reduce(
        user.projects_users,
        (prev, curr) => prev + (curr.status === 'finished' ? 1 : 0),
        0,
    )
    const numberOfAchievements = size(user.achievements)
    return (
        <div className='flex flex-col gap-y-4'>
            {/* Main Header */}
            <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-col gap-y-3'>
                    <p className='text-xl font-bold'>{user.login}</p>
                    <p>ID: {user.id}</p>
                </div>
                <div className='flex flex-row gap-x-2 items-center'>
                    <p>Total evaluation points:</p>
                    <p className='text-2xl font-bold'>
                        {user.correction_point}
                    </p>
                    <StarIcon />
                </div>
            </div>
            <Divider />
            {/* Image and User Details */}
            <div className='grid lg:grid-cols-3 gap-4 rounded-lg bg-gradient-to-br from-black to-slate-900'>
                <img
                    src={user.image?.link}
                    alt='User Image'
                    className='lg:h-full w-full object-cover border border-slate-500 rounded-lg'
                />
                <Card className='w-full'>
                    <CardHeader>
                        <CardTitle>User Info</CardTitle>
                        <CardDescription>
                            Any and all details about the user
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-col gap-y-4'>
                            <div>
                                <div className='flex flex-row gap-x-2 items-center'>
                                    <Label>Name</Label>
                                    <ZapIcon />
                                </div>
                                <p className='text-2xl font-bold'>
                                    {user.first_name} {user.last_name} (
                                    {capitalize(user.kind)})
                                </p>
                            </div>
                            <div>
                                <div className='flex flex-row gap-x-2 items-center'>
                                    <Label>Email</Label>
                                    <MailIcon />
                                </div>
                                <p className='text-lg font-semibold'>
                                    {user.email}
                                </p>
                            </div>
                            <div>
                                <div className='flex flex-row gap-x-2 items-center'>
                                    <Label>Phone</Label>
                                    <PhoneIcon />
                                </div>
                                <p>{user.phone}</p>
                            </div>
                            <div>
                                <div className='flex flex-row gap-x-2 items-center'>
                                    <Label>Display Name</Label>
                                    <TagIcon />
                                </div>
                                <p>{user.displayname}</p>
                            </div>
                            <div>
                                <div className='flex flex-row gap-x-2 items-center'>
                                    <Label>Pool</Label>
                                    <PenToolIcon />
                                </div>
                                <p>
                                    {capitalize(user.pool_month)}{' '}
                                    {user.pool_year}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className='w-full'>
                    <CardHeader>
                        <CardTitle>User Points</CardTitle>
                        <CardDescription>
                            The users performance and achievements and skills
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-col gap-y-4'>
                            <div>
                                <Label>Score</Label>
                                <p className='text-2xl font-bold'>
                                    {totalMark}
                                </p>
                            </div>
                            <div>
                                <Label>Wallet</Label>
                                <p className='text-lg font-semibold'>
                                    {user.wallet}
                                </p>
                            </div>
                            <div>
                                <Label>Achievements</Label>
                                <p>{numberOfAchievements}</p>
                            </div>
                            <div>
                                <Label>Projects Finished</Label>
                                <p>{totalProjectsFinished}</p>
                            </div>
                            <div>
                                <Label>Blackhole</Label>
                                <p>
                                    {dayjs(cursusUser?.blackholed_at)
                                        .toDate()
                                        .toDateString()}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
