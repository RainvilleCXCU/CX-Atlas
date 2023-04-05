import 'faust.config';
import { FaustProvider } from '@faustjs/next';
//import 'normalize.css/normalize.css';
import React, { useEffect } from 'react';
//import 'scss/main.scss';
import { client } from 'client';
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app';
import { pageview } from '../lib/gtm';

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
        <Component {...pageProps} />
      </FaustProvider>
    </>
  );
}
