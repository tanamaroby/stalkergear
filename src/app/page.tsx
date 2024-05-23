import { NextPage } from 'next'

const Home: NextPage = async () => {
    //   const res = await fetch(`${API_URL}/users`, { method: "GET" });
    //   console.log("roby -> constHome:NextPage= -> data:", await res.json());

    return (
        <div className='w-full h-full flex flex-col gap-y-4'>
            <p>Hello! My name is Roby Tanama</p>
            <p>This is the stalker gear!!</p>
        </div>
    )
}

export default Home
