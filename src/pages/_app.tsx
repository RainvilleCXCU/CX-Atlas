import '../faust.config';
import { FaustProvider } from '@faustwp/core';
import { useEffect } from 'react';
import Provider from '../provider/store';
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app';
import { pageview } from '../lib/routing';
import { osName, browserName, isMacOs, isWindows, isAndroid, isIOS } from 'mobile-device-detect';
import { CookiesProvider } from 'react-cookie';

export default function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events]);
  
  useEffect(() => {
    // Add attributes to html tag
    document.documentElement.setAttribute('data-os-name', osName.replaceAll(' ', ''));
    document.documentElement.setAttribute('data-browser-name', browserName.replaceAll(' ', ''));
    document.documentElement.setAttribute('data-is-mac', isMacOs.toString());
    document.documentElement.setAttribute('data-is-windows', isWindows.toString());
    document.documentElement.setAttribute('data-is-android', isAndroid.toString());
    document.documentElement.setAttribute('data-is-ios', isIOS.toString());
    
    // Or add multiple classes
    // document.documentElement.classList.add(osName, browserName);
    document.documentElement.className = `os-${osName.replaceAll(' ', '')} browser-${browserName.replaceAll(' ', '')}`
    
    // Cleanup function (optional)
    return () => {
      document.documentElement.removeAttribute('data-os-name');
      document.documentElement.removeAttribute('data-browser-name');
      document.documentElement.removeAttribute('data-is-mac');
      document.documentElement.removeAttribute('data-is-windows');
      document.documentElement.removeAttribute('data-is-android');
      document.documentElement.removeAttribute('data-is-ios');
    }
  }, [])

  return (
    <FaustProvider pageProps={pageProps}>
      <Provider>
        <CookiesProvider>
          <Component {...pageProps} key={router.asPath} />
        </CookiesProvider>
      </Provider>
    </FaustProvider>
  );
}
