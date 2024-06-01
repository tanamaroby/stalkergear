'use client'
import { CursusUser } from '@/lib/types'
import { map } from 'lodash'
import UserCard from '../UserCard'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../ui/pagination'

export interface UsersPageProps {
    cursusUsers: CursusUser[]
    page: number
}

const pageHrefMaker = (page: number) => {
    return `/users?page=${page}`
}

const createPaginationList = (page: number) => {
    if (page <= 2) {
        return [
            <PaginationItem>
                <PaginationLink href={pageHrefMaker(1)} isActive={page === 1}>
                    1
                </PaginationLink>
            </PaginationItem>,
            <PaginationItem>
                <PaginationLink href={pageHrefMaker(2)} isActive={page === 2}>
                    2
                </PaginationLink>
            </PaginationItem>,
            <PaginationItem>
                <PaginationLink href={pageHrefMaker(3)}>3</PaginationLink>
            </PaginationItem>,
        ]
    }
    return [
        <PaginationItem>
            <PaginationLink href={pageHrefMaker(page - 1)}>
                {page - 1}
            </PaginationLink>
        </PaginationItem>,
        <PaginationItem>
            <PaginationLink href={pageHrefMaker(page)} isActive>
                {page}
            </PaginationLink>
        </PaginationItem>,
        <PaginationItem>
            <PaginationLink href={pageHrefMaker(page + 1)}>
                {page + 1}
            </PaginationLink>
        </PaginationItem>,
    ]
}

export default function UsersPage(props: UsersPageProps) {
    const { cursusUsers, page } = props

    return (
        <div className='flex flex-col gap-y-4'>
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
                                href={pageHrefMaker(page - 1)}
                            />
                        </PaginationItem>
                    ) : null}
                    {...createPaginationList(page)}
                    <PaginationItem>
                        <PaginationNext href={pageHrefMaker(page + 1)} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
