import { client, tokenParams } from '@/lib/config'
import axios from 'axios'

const URL = 'https://api.intra.42.fr/v2/users'

export const GET = async (
    _: Request,
    { params }: { params: { id: string } },
) => {
    try {
        const { id } = params
        const accessToken = await client.getToken(tokenParams)
        const { data } = await axios({
            url: `${URL}/${id}`,
            headers: {
                Authorization: `Bearer ${accessToken.token.access_token}`,
            },
        })
        return Response.json(data, { status: 200 })
    } catch (err) {
        return Response.json({ message: `Error occured!: ${err}` })
    }
}
