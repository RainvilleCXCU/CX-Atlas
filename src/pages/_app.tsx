import '../faust.config';
import { FaustProvider } from '@faustwp/core';
import { useEffect } from 'react';
import Provider from '../provider/store';
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app';
import { pageview } from '../lib/routing';
import Bowser from "bowser";
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
    const browser = Bowser.getParser(window.navigator.userAgent);
    document.documentElement.setAttribute('data-os-name', browser.getOSName().replaceAll(' ', ''));
    document.documentElement.setAttribute('data-browser-name', browser.getBrowserName().replaceAll(' ', ''));
    document.documentElement.setAttribute('data-is-mac', browser.getOSName().toLowerCase().includes('mac').toString());
    document.documentElement.setAttribute('data-is-windows', browser.getOSName().toLowerCase().includes('window').toString());
    document.documentElement.setAttribute('data-is-android', browser.getOSName().toLowerCase().includes('android').toString());
    document.documentElement.setAttribute('data-is-ios', browser.getOSName().toLowerCase().includes('ios').toString());
    
    // Or add multiple classes
    // document.documentElement.classList.add(osName, browserName);
    document.documentElement.className = `os-${browser.getOSName().replaceAll(' ', '')} browser-${browser.getBrowserName().replaceAll(' ', '')}`
    
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
