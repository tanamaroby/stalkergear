import { SINGAPORE_CAMPUS_CODE, client, tokenParams } from '@/lib/config'
import axios from 'axios'
import { compact } from 'lodash'
import { NextRequest } from 'next/server'

const URL = `https://api.intra.42.fr/v2/users?campus_id=${SINGAPORE_CAMPUS_CODE}&filter[kind]=student`

export const GET = async (req: NextRequest) => {
    const { searchParams } = req.nextUrl
    const pageNumber = searchParams.get('page')
    const login = searchParams.get('login')
    const buildingUrl = compact([
        URL,
        pageNumber ? `page=${pageNumber}` : undefined,
        login ? `filter[login]=${login}` : undefined,
    ]).join('&')
    try {
        const accessToken = await client.getToken(tokenParams)
        const { data } = await axios({
            url: buildingUrl,
            headers: {
                Authorization: `Bearer ${accessToken.token.access_token}`,
            },
        })
        return Response.json(data, { status: 200 })
    } catch (err) {
        return Response.json({ message: `Error occured!: ${err}` })
    }
}
