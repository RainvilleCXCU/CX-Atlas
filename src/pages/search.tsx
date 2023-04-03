import { getNextStaticProps } from '@faustjs/next';
import { client, Page as PageType, PageIdType } from 'client';
import { Footer, Header, Pagination, Posts } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styles from 'scss/pages/posts.module.scss';
import Styleguide from 'components/Styles/styleguide';
import { addCSSAsset, addJSAsset } from "../lib/enqueuedFiles";
import { loadGetInitialProps } from 'next/dist/shared/lib/utils';
import Heading, { HeadingProps } from '../components/Heading';

const POSTS_PER_PAGE = 6;

export interface PageProps {
  page: PageType | PageType['preview']['node'] | null | undefined;
}

export default function Page() {
  const { query = {}} = useRouter();
  const { postSlug, postCursor } = query;
  const { usePosts, useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const { usePage } = client;
  const page = usePage({
    id: '/',
    idType: PageIdType.URI
  });
  const [searchTerm, setSearchTerm] = useState(query.s || '');
  const [results, setResults] = useState([])
  const [isLoading, setLoading] = useState(false);

  const enqueuedStylesheets = page.enqueuedStylesheets().edges;

  const isBefore = postSlug === 'before';
  console.log(query);

  useEffect(() => {
    setLoading(true);
    setSearchTerm(query.s);
    fetch(`/wp-json/wp/v2/posts?search=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data)
        setLoading(false)
      })
  }, [query.s])

  if (useQuery().$state.isLoading) {
    return null;
  }

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

      {enqueuedStylesheets.map((sheet) => {
        return addCSSAsset(sheet.node);
      })}

      <main className="content content-index">
        Search Term {searchTerm} :

        {results.map((post) => (
            <div
              className={styles.single}
              key={post.id ?? ''}
              id={`post-${post.id}`}>
              <div>
                <Heading level={'h1'} className={styles.title}>
                  <Link href={post.link}>{post.title.rendered}
                  </Link>
                </Heading>
                <div
                  className={styles.excerpt}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered ?? '' }}
                />
                <Link href={post.link} aria-label={`Read more about ${post.title.rendered || 'the post'}`}>
                    Read More
                </Link>
              </div>
            </div>
        ))}
      
      {/*  <Posts
          posts={results}
          heading="Search Results"
          headingLevel="h2"
          postTitleLevel="h3"
          id={styles.post_list}
        />
      <Pagination pageInfo={results.pageInfo} basePath="/posts" />*/}
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}


