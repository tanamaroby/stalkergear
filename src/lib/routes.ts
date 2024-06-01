import { concat } from 'lodash'

export const BASE_ROUTES = ['/', '/search', '/users']
export const ROUTES = concat(BASE_ROUTES, '/login')
