import UsersPage from '@/components/pages/UsersPage'
import { API_URL } from '@/lib/config'
import axios from 'axios'

export default async function Users({ params }: { params: { id: number } }) {
    const { id } = params
    const { data } = await axios.get(`${API_URL}/users?page=${id}`)
    return <UsersPage users={data} />
}
