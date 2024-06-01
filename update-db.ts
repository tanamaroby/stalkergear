import axios from 'axios'
import dotenv from 'dotenv'
import { isEmpty, size } from 'lodash'
import simpleOauth2 from 'simple-oauth2'

dotenv.config()

const SINGAPORE_CAMPUS_CODE = 64

const tokenParams = {
    scope: 'public',
}

const config = {
    client: {
        id: process.env.UID!,
        secret: process.env.SECRET!,
    },
    auth: {
        tokenHost: 'https://api.intra.42.fr',
    },
}

const { ClientCredentials } = simpleOauth2
export const client = new ClientCredentials(config)

const waitFor = (timeout: number) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(null), timeout)
    })
}

const fetchUsersOnPage = async (pageNumber: number) => {
    let attempt_no = 1
    const baseUrl = `https://api.intra.42.fr/v2/users?campus_id=${SINGAPORE_CAMPUS_CODE}`
    while (true) {
        console.log(
            `Fetching all users (${(pageNumber - 1) * 30} - ${pageNumber * 30})... Attempt number: ` +
                attempt_no,
        )
        let buildingUrl = [
            baseUrl,
            'filter[kind]=student',
            `page=${pageNumber}`,
        ].join('&')
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
            console.error('Fetching data error! Trying again...')
            attempt_no += 1
            await waitFor(1000)
        }
    }
}

const fetchAllSingaporeUsers = async () => {
    let data = []
    let pageNumber = 1
    let fetch = true
    while (fetch) {
        const json = await (await fetchUsersOnPage(pageNumber)).json()
        if (isEmpty(json)) fetch = false
        pageNumber += 1
        data.push(...json)
    }
    return data
}

fetchAllSingaporeUsers().then((data) => {
    console.log(data)
    console.log('Size: ', size(data))
})
