import ErrorPage from '@/components/pages/ErrorPage'
import HomePage from '@/components/pages/HomePage'
import { CursusUser } from '@/lib/types'
import { NextPage } from 'next'
import { fetchFastestUsers } from './users/actions'

const Home: NextPage = async () => {
    const { data, error } = await fetchFastestUsers()
    if (!data || error) return <ErrorPage />
    return <HomePage fastestUsers={data as CursusUser[]} />
}

export default Home
