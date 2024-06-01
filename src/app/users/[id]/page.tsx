import UserDetailPage from '@/components/pages/UserDetailPage'
import { MOCK_USER_DETAIL } from '@/mocks/users'

export default async function UsersIdPage({
    params,
}: {
    params: { id: number }
}) {
    const { id } = params
    return <UserDetailPage user={MOCK_USER_DETAIL} />
}
