import { getNextStaticProps, is404 } from '@faustjs/next';
import { Footer, Header, Hero } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { client, Page as PageType, PageIdType } from 'client';
import React from 'react';
import { useState, useEffect } from 'react'
import parseHtml from "../lib/parser";
import Script from 'next/script';
import {addCSSAsset, addJSAsset} from "../lib/enqueuedFiles";


export interface PageProps {
  page: PageType | PageType['preview']['node'] | null | undefined;
}

export function PageComponent({ page }: PageProps) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  const enqueuedStylesheets = page.enqueuedStylesheets().edges;
  const enqueuedScripts = page.enqueuedScripts().edges;
  
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
/*
  useEffect(() => {
    setLoading(true)
    fetch('/api/profile-data')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
  */

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
        logo={generalSettings.logo}
      />

      <Head>
        <title>
          {page?.title()} - {generalSettings.title}
        </title>
        {enqueuedStylesheets.map((sheet) => {
          return addCSSAsset(sheet.node);
        })}
      </Head>
      <div id="page" className='container site'>
        <main className="content content-single">
            <article className='entry-content'>
              {parseHtml(page?.content() ?? '')}
              </article>
        </main>
      </div>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export default function Page() {
  const { usePage } = client;
  console.log('INDEX');
  const page = usePage({
    id: '/',
    idType: PageIdType.URI
  });

  return <PageComponent page={page} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
    notFound: await is404(context, { client }),
  });
}