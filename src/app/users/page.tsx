import UsersPage from '@/components/pages/UsersPage'
import { API_URL } from '@/lib/config'
import axios from 'axios'
import { parseInt } from 'lodash'

interface UsersPageProps {
    searchParams: {
        [key: string]: string
    }
}

export default async function Users(props: UsersPageProps) {
    const { page } = props.searchParams
    const fallbackPage = page ?? 1
    const { data } = await axios.get(`${API_URL}/users?page=${fallbackPage}`)
    return <UsersPage users={data} page={parseInt(fallbackPage)} />
}
