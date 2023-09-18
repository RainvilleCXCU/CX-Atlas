import React from 'react';
import { client } from 'client';
import { Header, Footer } from '../components';
import GTM from 'components/ThirdParty/gtm';
import Head from 'next/head';
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustjs/next';
import HotJar from 'components/ThirdParty/hotjar';
import Qualtrics from 'components/ThirdParty/qualtrics';
import Spectrum from 'components/ThirdParty/spectrum';

export default function Page(): JSX.Element {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  return (
    <>
      <Head>
        <title>
          {`Page not found - ${generalSettings.description}`}
        </title>
      </Head>
      <GTM />
      <HotJar />
      <Header
        title={generalSettings?.title}
        description={generalSettings?.description}
      />
      <main className="content content-page">
        <div className="wrap">
          <div>
            <div>
              <p>
                The page you were looking for does not exist or is no longer
                available.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer copyrightHolder={generalSettings?.title} />
			<Qualtrics />
			<Spectrum />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}