import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
 
export default function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl
  console.log('PRE SEARCH PARAMS');
  console.log(nextUrl.searchParams);
  nextUrl.searchParams.delete('wordpressNode')
  console.log('SEARCH PARAMS');
  console.log(nextUrl.searchParams);
  return NextResponse.rewrite(nextUrl)
}