import { NextResponse, NextRequest } from 'next/server'
export async function middleware(req: NextRequest, ev: NextResponse) {
    const { pathname } = req.nextUrl
    if (pathname == '/') {
        if (typeof window !== 'undefined') {
            const userId = localStorage.getItem("userId")
            if (userId) {
                return NextResponse.redirect('/dashboard')
            }
        }
        return NextResponse.redirect('/login')
    }
    return NextResponse.next()
}