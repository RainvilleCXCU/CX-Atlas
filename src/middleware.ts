import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
const { fetchWordPressRedirects } = require("./utils/redirects");
const { fetchVanityByPath } = require("./utils/vanity");
 
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const vanityPathMatch = process.env.NEXT_PUBLIC_VANITY_PATH_MATCH ? new RegExp(process.env.NEXT_PUBLIC_VANITY_PATH_MATCH) : new RegExp('/(disclosures/.*)');

  console.log('MIDDLEWARE');
  console.log(pathname);
  console.log(vanityPathMatch);

  if(!request.nextUrl.searchParams.get('wordpressNode') && (!process.env.NEXT_PUBLIC_DISABLE_MIDDLEWARE_REDIRECT || process.env.NEXT_PUBLIC_DISABLE_MIDDLEWARE_REDIRECT == 'false')) {
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
      return NextResponse.redirect(new URL(redirect[0].destination, request.url), {
        status: redirect[0].permanent ? 308 : 307
      })
    }
  }

  if(vanityPathMatch.test(pathname) && (!process.env.NEXT_PUBLIC_DISABLE_MIDDLEWARE_VANITY || process.env.NEXT_PUBLIC_DISABLE_MIDDLEWARE_VANITY == 'false')) {
    const vanityURL = await fetchVanityByPath({path: pathname});
    if(vanityURL) {
      return NextResponse.rewrite(new URL(vanityURL.destinationUrl, request.url))
    }
  }
  return NextResponse.next();
    
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    // '/(disclosures/.*)/',
  ],
};
