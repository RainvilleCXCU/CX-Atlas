import '../faust.config';
import { FaustProvider } from '@faustwp/core';
import { useEffect } from 'react';
import Provider from '../provider/store';
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app';
import { pageview } from '../lib/routing';
import 'scss/main.scss';

export default function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events])
  return (
    <FaustProvider pageProps={pageProps}>
      <Provider>
        <Component {...pageProps} key={router.asPath} />
      </Provider>
    </FaustProvider>
  );
}
