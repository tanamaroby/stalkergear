import UserDetailPage from '@/components/pages/UserDetailPage'
import { API_URL } from '@/lib/config'
import axios from 'axios'

export default async function UsersIdPage({
    params,
}: {
    params: { id: number }
}) {
    const { id } = params
    const { data } = await axios.get(`${API_URL}/users/${id}`)
    return <UserDetailPage user={data} />
}
