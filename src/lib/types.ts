export interface User {
    id: number
    email: string
    login: string
    first_name: string
    last_name: string
    usual_full_name: string
    usual_first_name: string | null
    url: string
    phone: string
    displayname: string
    kind: string
    image: {
        link: string
        versions: unknown
    }
    'staff?': boolean
    correction_point: number
    pool_month: string
    pool_year: string
    location: string | null
    wallet: number
    anonymize_date: string
    data_erasure_date: string
    created_at: string
    updated_at: string
    alumnized_at: string | null
    'alumni?': boolean
    'active?': boolean
}

export const SESSION_STORAGE_PASSWORD_KEY = 'password'
export const CORRECT_PASSWORD = 'tanama'
