import UsersPage from '@/components/pages/UsersPage'
import { MOCK_USERS } from '@/mocks/users'

export default async function Users({ params }: { params: { id: number } }) {
    const { id } = params
    // const { data } = await axios.get(`${API_URL}/users?page=${id}`)
    return <UsersPage users={MOCK_USERS} />
}
