'use client'
import { API_URL } from '@/lib/config'
import { User } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { isEmpty, map } from 'lodash'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { PropagateLoader } from 'react-spinners'
import { z } from 'zod'
import UserCard from '../UserCard'
import { Button } from '../ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

const formSchema = z.object({
    search: z.string().min(3, { message: 'Need at least 3 characters!' }),
})

export default function SearchPage() {
    const [loading, setLoading] = useState<boolean>(false)
    const [users, setUsers] = useState<User[]>([])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
        },
    })

    const onSubmit = async (e: z.infer<typeof formSchema>) => {
        const { search } = e
        setLoading(true)
        setUsers([])
        const { data } = await axios.get(`${API_URL}/users?login=${search}`)
        setUsers(data)
        setLoading(false)
    }

    return (
        <div className='flex flex-col gap-y-4 flex-grow'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name='search'
                        control={form.control}
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Search</FormLabel>
                                    <FormControl>
                                        <div className='flex flex-row gap-x-1'>
                                            <Input
                                                placeholder='Search login...'
                                                {...field}
                                            />
                                            <Button type='submit' size='icon'>
                                                <SearchIcon />
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        Search for the user login you want to
                                        find
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />
                </form>
            </Form>
            {isEmpty(users) ? (
                <div className='flex flex-grow items-center justify-center'>
                    {loading ? (
                        <PropagateLoader
                            size={25}
                            loading={loading}
                            color='white'
                        />
                    ) : (
                        'Cannot find any users.'
                    )}
                </div>
            ) : (
                <div className='flex flex-row items-center justify-center'>
                    {map(users, (user) => (
                        <UserCard
                            className='max-w-[600px]'
                            key={user.login}
                            user={user}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
