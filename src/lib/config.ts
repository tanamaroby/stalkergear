import dotenv from 'dotenv'
import simpleOauth2 from 'simple-oauth2'

dotenv.config()

export const config = {
    client: {
        id: process.env.UID!,
        secret: process.env.SECRET!,
    },
    auth: {
        tokenHost: 'https://api.intra.42.fr',
    },
}

export const tokenParams = {
    scope: 'public',
}

export const SINGAPORE_CAMPUS_CODE = 64

const { ClientCredentials } = simpleOauth2
export const client = new ClientCredentials(config)

export const BASE_URL = 'http://localhost:3000'
export const API_URL = 'http://localhost:3000/api'
