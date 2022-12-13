import { getNextStaticProps, is404 } from '@faustjs/next';
import { Footer, Header, Hero } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { client, Page as PageType, PageIdType } from 'client';
import React from 'react';
import parseHtml from "../lib/parser";
import {addCSSAsset, addJSAsset} from "../lib/enqueuedFiles";


export interface PageProps {
  page: PageType | PageType['preview']['node'] | null | undefined;
}

export function PageComponent({ page }: PageProps) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const registeredScripts = useQuery().registeredScripts().edges;

  const enqueuedStylesheets = page.enqueuedStylesheets().edges;
  const enqueuedScripts = page.enqueuedScripts().edges;

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
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-content/themes/CXCU/assets/${generalSettings.styleguideVersion}/cxcu.css`} />
      </Head>
      <div id="page" className='container site'>
        <main className="content content-single">
            <article className='entry-content'>
              {parseHtml(page?.content() ?? '')}
              </article>
        </main>
      </div>

      <Footer copyrightHolder={generalSettings.title} />
        {registeredScripts.map((script) => {
          if(script.node.handle == 'jquery-core') {
            return addJSAsset(script.node);
          }
        })}
        {enqueuedScripts.map((sheet) => {
          return addJSAsset(sheet.node);
        })}
    </>
  );
}

export default function Page() {
  const { usePage } = client;
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