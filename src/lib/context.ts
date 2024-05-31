import { createContext } from 'react'
import { User } from './types'

export interface UserContextProps {
    users: User[]
}

export const UserContext = createContext<UserContextProps>({
    users: [],
})
