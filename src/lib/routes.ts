import { concat } from 'lodash'

export const BASE_ROUTES = ['/', '/users']
export const ROUTES = concat(BASE_ROUTES, '/login')
