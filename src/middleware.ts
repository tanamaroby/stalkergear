import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { SESSION_STORAGE_PASSWORD_KEY } from './lib/types'

export const middleware = (req: NextRequest) => {
    const cookiestore = cookies()
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    const password = cookiestore.get(SESSION_STORAGE_PASSWORD_KEY)
    if (!password) return NextResponse.redirect(url)
    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/users'],
}
