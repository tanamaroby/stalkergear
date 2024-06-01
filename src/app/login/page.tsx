'use client'
import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoginFormData } from '@/lib/types/login'
import { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { BeatLoader } from 'react-spinners'
import { login } from './actions'

const Login: NextPage = () => {
    const [loading, setLoading] = useState(false)
    const form = useForm<LoginFormData>({
        defaultValues: {
            email: 'stalkergear@geekedout.com',
            password: '',
        },
    })

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true)
        const result = await login(data)
        if (result === 1)
            form.setError('password', { message: 'Invalid login credentials!' })
        setLoading(false)
    }

    return (
        <div className='flex flex-col gap-y-6 items-center justify-center flex-grow w-full'>
            <Image src='logo.svg' alt='logo' height='200' width='200' />
            <div className='flex flex-col gap-y-4 items-center justify-center'>
                <p className='text-center'>Hi there! Welcome to StalkerGear!</p>
                <p className='text-center'>
                    This is a highly classified tool, only for authorized users
                </p>
                <p className='text-center'>Please login below</p>
                <FormProvider {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='flex flex-col items-center justify-center gap-y-4 w-full'
                    >
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => {
                                return (
                                    <FormItem className='w-full'>
                                        <Label>Email</Label>
                                        <FormControl>
                                            <Input
                                                className='w-full'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-red-500' />
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => {
                                return (
                                    <FormItem className='w-full'>
                                        <Label>Password</Label>
                                        <FormControl>
                                            <Input
                                                placeholder='Type password here'
                                                type='password'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-red-500' />
                                    </FormItem>
                                )
                            }}
                        />
                        <Button variant='outline' type='submit'>
                            {loading ? <BeatLoader color='white' /> : 'Submit'}
                        </Button>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}

export default Login
