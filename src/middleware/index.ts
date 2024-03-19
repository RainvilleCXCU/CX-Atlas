import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
 
export default function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl
  nextUrl.searchParams.delete('wordpressNode')
  return NextResponse.rewrite(nextUrl)
}