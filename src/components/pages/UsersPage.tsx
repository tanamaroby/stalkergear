'use client'
import { CursusUser } from '@/lib/types'
import { SELECT_OPTIONS, UsersFormData } from '@/lib/types/users-form'
import { compact, isEmpty, map } from 'lodash'
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import UserCard from '../UserCard'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../ui/pagination'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'

export interface UsersPageProps {
    cursusUsers: CursusUser[]
    page: number
}

const pageHrefMaker = (page: number, pathname: ReadonlyURLSearchParams) => {
	const searchParams = new URLSearchParams(pathname.toString())
	searchParams.set('page', page.toString())
    return `/users?${searchParams.toString()}`
}

const createPaginationList = (page: number, pathname: ReadonlyURLSearchParams) => {
    if (page <= 2) {
        return [
            <PaginationItem>
                <PaginationLink href={pageHrefMaker(1, pathname)} isActive={page === 1}>
                    1
                </PaginationLink>
            </PaginationItem>,
            <PaginationItem>
                <PaginationLink href={pageHrefMaker(2, pathname)} isActive={page === 2}>
                    2
                </PaginationLink>
            </PaginationItem>,
            <PaginationItem>
                <PaginationLink href={pageHrefMaker(3, pathname)}>3</PaginationLink>
            </PaginationItem>,
        ]
    }
    return [
        <PaginationItem>
            <PaginationLink href={pageHrefMaker(page - 1, pathname)}>
                {page - 1}
            </PaginationLink>
        </PaginationItem>,
        <PaginationItem>
            <PaginationLink href={pageHrefMaker(page, pathname)} isActive>
                {page}
            </PaginationLink>
        </PaginationItem>,
        <PaginationItem>
            <PaginationLink href={pageHrefMaker(page + 1, pathname)}>
                {page + 1}
            </PaginationLink>
        </PaginationItem>,
    ]
}

export default function UsersPage(props: UsersPageProps) {
    const { cursusUsers, page } = props
    const pathname = usePathname()
    const router = useRouter()
	const searchParams = useSearchParams()

    // FORMS
    const form = useForm<UsersFormData>({
        defaultValues: {
            sort: searchParams.get('sort') ? searchParams.get('sort')?.replace(' ', '+') : SELECT_OPTIONS[0].value,
            login: '',
        },
    })

    const onSubmit = (e: UsersFormData) => {
        const { sort, login } = e
        const buildingParams = compact([
            sort ? `sort=${sort}` : undefined,
            login ? `login=${login}` : undefined,
        ])
        const realPathname = !isEmpty(buildingParams)
            ? `${pathname}?`
            : pathname
        router.push(
            `${realPathname}${!isEmpty(buildingParams) ? buildingParams.join('&') : ''}`,
        )
    }

    return (
        <div className='flex flex-col gap-y-6'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='flex flex-col gap-y-2'
                >
                    <FormField
                        control={form.control}
                        name='sort'
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Sort Users</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select a sort for users' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className='bg-black'>
                                            {map(SELECT_OPTIONS, (option) => {
                                                const { title, value } = option
                                                return (
                                                    <SelectItem
                                                        key={value}
                                                        value={value}
                                                    >
                                                        {title}
                                                    </SelectItem>
                                                )
                                            })}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )
                        }}
                    />
                    <FormField
                        control={form.control}
                        name='login'
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Login</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Search for users...'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )
                        }}
                    />
                    <Button
                        type='submit'
                        className='bg-white text-black hover:bg-slate-500'
                    >
                        Submit
                    </Button>
                </form>
            </Form>
            <div className='flex flex-col gap-y-2'>
                {map(cursusUsers, (cursusUser) => {
                    return (
                        <UserCard key={cursusUser.id} cursusUser={cursusUser} />
                    )
                })}
            </div>
            <Pagination>
                <PaginationContent>
                    {page !== 1 ? (
                        <PaginationItem>
                            <PaginationPrevious
                                href={pageHrefMaker(page - 1, searchParams)}
                            />
                        </PaginationItem>
                    ) : null}
                    {...createPaginationList(page, searchParams)}
                    <PaginationItem>
                        <PaginationNext href={pageHrefMaker(page + 1, searchParams)} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
