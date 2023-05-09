import 'faust.config';
import { FaustProvider } from '@faustjs/next';
import React, { useEffect } from 'react';
import Provider from '../provider/store';
import { client } from 'client';
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app';
import { pageview } from '../lib/gtm';
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
    <>
      <FaustProvider client={client} pageProps={pageProps}>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </FaustProvider>
    </>
  );
}
