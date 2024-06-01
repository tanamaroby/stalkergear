import ErrorPage from '@/components/pages/ErrorPage'
import UsersPage from '@/components/pages/UsersPage'
import { CursusUser } from '@/lib/types'
import { parseInt } from 'lodash'
import { fetchAllUsers } from './actions'

interface UsersPageProps {
    searchParams: {
        [key: string]: string
    }
}

export default async function Users(props: UsersPageProps) {
    const { page, sort } = props.searchParams
    const fallbackPage = page ? parseInt(page) : 1
    const { data, error } = await fetchAllUsers({
        pageNumber: fallbackPage,
        sort,
    })
    if (!data || error) return <ErrorPage />
    return <UsersPage cursusUsers={data as CursusUser[]} page={fallbackPage} />
}
