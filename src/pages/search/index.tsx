import { client, Page as PageType, PageIdType } from 'client';
import { Footer, Header, Pagination, Posts } from 'components';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { addCSSAsset, addJSAsset } from "../../lib/enqueuedFiles";
import Heading, { HeadingProps } from '../../components/Heading';
import GTM from 'components/ThirdParty/gtm';
import Categories from 'components/Posts/categories';
import parseHtml from 'lib/parser';
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustjs/next';

const POSTS_PER_PAGE = 6;

export interface PageProps {
  page: PageType | PageType['preview']['node'] | null | undefined;
}

export default function Page() {
  const { query = {} } = useRouter();
  const { searchSlug, searchTerm ='', searchCursor } = query;
  const currentPage = searchCursor ? parseInt(searchCursor.toString()) : 1;

  const { usePosts, useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  const [isLoading, setLoading] = useState(false);

  const { results, total } = useQuery().searchwp({
    terms: searchSlug?.toString(),
    offset: currentPage?.toString(),
    postsPerPage: POSTS_PER_PAGE?.toString()
  });

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>
          {generalSettings.title} - {generalSettings.description}
        </title>
      </Head>
      <GTM />

      <main className="content content-index">
        <div id="post-wrap" className='cx-search__wrapper'>
          <div className='cx-search__results'>
            {results && results.map((post) => (
              <div
                key={post.id ?? ''}
                id={`post-${post.id}`}>
                <div>
                  <Heading level={'h2'} className='cx-h3'>
                    <Link href={post.url}>{parseHtml(post.title)}
                    </Link>
                  </Heading>
                  <div>
                    {parseHtml(post.excerpt)}
                  </div>
                </div>
              </div>
            ))}
            {/* <Pagination currentPage={currentPage} pageInfo={page.pageInfo} basePath='/search' perPage={POSTS_PER_PAGE} /> */}
          </div>

          <aside className="cx-search__sidebar sidebar">
            <Categories />
          </aside>
        </div>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}


