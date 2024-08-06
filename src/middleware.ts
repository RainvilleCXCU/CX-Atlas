import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
const { fetchWordPressRedirects } = require("./utils/redirects");
 
export async function middleware(request: NextRequest) {
  if(!request.nextUrl.searchParams.get('wordpressNode')) {
    const wpRewrites = await fetchWordPressRedirects({ type: "pass" });
    const wpRedirects = await fetchWordPressRedirects({ type: "url" });

    const rewrite = wpRewrites.filter(rewritePath => {
      return request.nextUrl.pathname == rewritePath.source.replace('(.*)', '') ? rewritePath : null
    });

    const redirect = wpRedirects.filter(redirectPath => {
      if(redirectPath.regex) {
        if(request.nextUrl.pathname.match(redirectPath.source)) {
          return redirectPath;
        }
      } else if(request.nextUrl.pathname == redirectPath.source) {
        return redirectPath;
      }
    });
    
    if(rewrite.length == 1) {
      return NextResponse.rewrite(new URL(rewrite[0].destination, request.url))
    }
    if(redirect.length > 0) {
      return NextResponse.redirect(new URL(redirect[0].destination, request.url))
    }
  }
    
}
