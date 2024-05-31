import UsersPage from '@/components/pages/UsersPage'
import { MOCK_USERS } from '@/mocks/users'
import { parseInt } from 'lodash'

interface UsersPageProps {
    searchParams: {
        [key: string]: string
    }
}

export default async function Users(props: UsersPageProps) {
    const { page } = props.searchParams
    const fallbackPage = page ?? 1
    // const { data } = await axios.get(`${API_URL}/users?page=${fallbackPage}`)
    return <UsersPage users={MOCK_USERS} page={parseInt(fallbackPage)} />
}
