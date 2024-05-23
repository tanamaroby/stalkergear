'use client'
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CORRECT_PASSWORD, SESSION_STORAGE_PASSWORD_KEY } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { setCookie } from 'cookies-next'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import zod from 'zod'

export interface LoginFormProps {
    password: string
}

const schema = zod
    .object({
        password: zod.string(),
    })
    .superRefine(({ password }, ctx) => {
        if (password !== CORRECT_PASSWORD) {
            ctx.addIssue({
                code: 'custom',
                message: "Invalid password! You're not babab!",
                path: ['password'],
            })
        }
    })

const Login: NextPage = () => {
    const router = useRouter()
    const form = useForm<zod.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            password: '',
        },
    })

    const onSubmit = (data: zod.infer<typeof schema>) => {
        setCookie(SESSION_STORAGE_PASSWORD_KEY, data.password, { secure: true })
        router.push('/')
    }

    return (
        <div className='flex flex-col gap-y-6 items-center justify-center flex-grow'>
            <Image src='logo.svg' alt='logo' height='200' width='200' />
            <div className='flex flex-col gap-y-4 items-center justify-center'>
                <p className='text-center'>Hi there! Welcome to StalkerGear!</p>
                <p className='text-center'>
                    This is a highly classified tool, only for authorized users
                </p>
                <p className='text-center'>Please login below</p>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder='Type password here'
												type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-red-500' />
                                    </FormItem>
                                )
                            }}
                        />
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}

export default Login
