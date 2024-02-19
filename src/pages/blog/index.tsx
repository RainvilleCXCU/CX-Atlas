import { getNextStaticProps, is404 } from '@faustjs/next';
import { client, OrderEnum, PostObjectsConnectionOrderbyEnum } from 'client';
import { Footer, Header, Pagination, Posts } from 'components';
import GTM from 'components/ThirdParty/gtm';
import HotJar from 'components/ThirdParty/hotjar';
import Personyze from 'components/ThirdParty/personyze';
import Qualtrics from 'components/ThirdParty/qualtrics';
import Spectrum from 'components/ThirdParty/spectrum';
import { parseHtml } from 'lib/parser';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const POSTS_PER_PAGE = 5;

export default function Page() {
  const { query = {} } = useRouter();
  const { postSlug, postCursor } = query;
  const currentPage = postCursor ? parseInt(postCursor.toString()) : 1;
  const { usePosts, useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const {blogtop} = useQuery().widgetSettings;
  const posts = usePosts({
    where: {
      offsetPagination: {
        offset: ((currentPage-1)*POSTS_PER_PAGE),
        size: POSTS_PER_PAGE
      }
    }
  });
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
          {`${generalSettings.title} - ${generalSettings.description}`}
        </title>
      </Head>
      <GTM />
      <Personyze />
      <HotJar />

      <main id="main" className="content content-index blog">
          {blogtop &&
            <div className="alignfull">
              {parseHtml(blogtop)}
            </div>
          }
        <Posts
          posts={posts.nodes}
          heading="Blog Posts"
          headingLevel="h2"
          postTitleLevel="h3"
          postInfo={posts.pageInfo}
          currentPage={currentPage}
          postsPerPage={POSTS_PER_PAGE}
        />
      </main>

      <Footer copyrightHolder={generalSettings.title} />
			<Spectrum />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
    revalidate: parseInt(process.env.POST_REVALIDATION) ? parseInt(process.env.POST_REVALIDATION) : null,
    notFound: await is404(context, { client }),
  });
}
