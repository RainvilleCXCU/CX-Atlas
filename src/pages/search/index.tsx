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
import { parseHtml } from 'lib/parser';
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustjs/next';
import SearchListing from 'components/Search/Listing';
import SearchBar from 'components/Search/SearchBar';
import HotJar from 'components/ThirdParty/hotjar';
import Qualtrics from 'components/ThirdParty/qualtrics';
import Spectrum from 'components/ThirdParty/spectrum';
import Personyze from 'components/ThirdParty/personyze';

const POSTS_PER_PAGE = 6;

export interface PageProps {
  page: PageType | PageType['preview']['node'] | null | undefined;
}

export default function Page() {
  const { query = {} } = useRouter();
  const { searchCursor, s = '' } = query;
  const currentPage = searchCursor ? parseInt(searchCursor.toString()) : 1;

  const { usePosts, useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  const search = s ? s : '';

  const [isLoading, setLoading] = useState(false);

  const { results, total } = useQuery().searchwp({
    terms: search?.toString(),
    offset: currentPage?.toString(),
    postsPerPage: POSTS_PER_PAGE?.toString()
  });

  return (
    <>
      <Head>
        <title>
          {`You searched for ${s} - ${generalSettings.title}`}
        </title>
      </Head>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <GTM />
      <Personyze />
      <HotJar />

      <main id="main" className="content content-index container">
        <div id="post-wrap" className='cx-search__wrapper search'>
          <div className='cx-search__results'>
            <SearchBar />
            {results && results.map((post) => (
              <SearchListing
                key={`post-listing=${post.id}` ?? ''}
                id={`post-${post.id}`}
                title={post.title()}
                url={post.uri}
                content={post.excerpt()}
                categories={post.categories()?.nodes}
                featuredImage={post.featuredImage} />
            ))}

            <Pagination currentPage={currentPage} totalResults={parseInt(total)} basePath={`/search`} perPage={POSTS_PER_PAGE} querys={`?s=${search}`} />
          </div>

          <aside className="cx-search__sidebar sidebar">
            <Categories />
          </aside>
        </div>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
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


