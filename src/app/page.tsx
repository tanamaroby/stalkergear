import { API_URL } from '@/lib/config'
import axios from 'axios'
import { get, map } from 'lodash'
import { NextPage } from 'next'

const Home: NextPage = async () => {
	const { data } = await axios.get(`${API_URL}/users`)
    return (
        <div className='w-full h-full flex flex-col gap-y-4'>
		{map(get(data, 'data'),async  (datum) => {
			return <p>{JSON.stringify(datum)}</p>
		})}
        </div>
    )
}

export default Home
