import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { fetchWordPressRedirects } from './utils/redirects';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const redirectData = await fetchWordPressRedirects({type: 'url'}) || [];
    for(let redirect in redirectData) {
        const regEx = new RegExp(`${redirectData[redirect].source}`, "g");
        if(regEx.test(pathname)) {
            const statusCode = redirectData[redirect].permanent ? 308 : 307;
            return NextResponse.redirect(new URL(redirectData[redirect].destination, request.url), statusCode)
        }
    }
    
    // No redirect found, continue without redirecting
    return NextResponse.next()
}

const getRedirects = async () => {
    return await fetchWordPressRedirects({type: 'url'});
}
// See "Matching Paths" below to learn more
// export const config = {
//     matcher: [
//         {
//             source: '/disclosures/fee-schedule(.*)',
//         }
//     ]
// }