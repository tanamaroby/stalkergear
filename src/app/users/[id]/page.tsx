import ErrorPage from '@/components/ErrorPage'

export default async function UsersIdPage({
    params,
}: {
    params: { id: number }
}) {
    const { id } = params
    return <ErrorPage />
    // return <UserDetailPage user={} />
}
