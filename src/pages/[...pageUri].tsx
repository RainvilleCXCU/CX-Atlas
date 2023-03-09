import { getNextStaticProps, is404 } from '@faustjs/next';
import { Footer, Header, Hero } from 'components';
import Script from 'next/script'
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { client, Page as PageType } from 'client';
import parseHtml from "../lib/parser";
import { addCSSAsset, addJSAsset } from "../lib/enqueuedFiles";
import { useState, useEffect } from 'react';
import "../lib/loader";
import Styleguide from 'components/Styles/styleguide';
export interface PageProps {
  page: PageType | PageType['preview']['node'] | null | undefined;
}

export function PageComponent({ page }: PageProps) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const regScripts = useQuery().registeredScripts().edges;

  const enqueuedStylesheets = page.enqueuedStylesheets().edges;
  const enqueuedScripts = page.enqueuedScripts().edges;   


  return (
    <>

      <Head>
        <title>
          {page?.title()} - {generalSettings.title}
        </title>
        {enqueuedStylesheets.map((sheet) => {
          return addCSSAsset(sheet.node);
        })}
        <Styleguide />
      </Head>

      <Header
        title={generalSettings.title}
        description={generalSettings.description}
        logo={generalSettings.logo}
      />

      <div id="page" className='container site'>
        <main className="content content-single">
          <article className='entry-content'>
            {parseHtml(page?.content() ?? '')}
          </article>
        </main>
      </div>
      <Footer copyrightHolder={generalSettings.title} />
      {enqueuedScripts.map((sheet) => {
        return addJSAsset(sheet.node);
      })}
    </>
  );
}

export default function Page() {
  const { usePage } = client;
  const page = usePage();

  console.log(page.uri);

  return <PageComponent page={page} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
    notFound: await is404(context, { client }),
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
