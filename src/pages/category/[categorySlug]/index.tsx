import { getNextStaticProps, is404 } from '@faustjs/next';
import Head from 'next/head';
import { Header, Footer, Posts, Pagination } from 'components';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { client } from 'client';
import GTM from 'components/ThirdParty/gtm';
import parseHtml from 'lib/parser';

const POSTS_PER_PAGE = 6;

export default function Page() {
  const { useQuery, usePosts, useCategory } = client;
  const { query = {} } = useRouter();
  const { categorySlug, paginationTerm, categoryCursor } = query;
  const generalSettings = useQuery().generalSettings;
  const { blogtop } = useQuery().widgetSettings;
  const category = useCategory();
  const isBefore = paginationTerm === 'before';
  const posts = usePosts({
    after: !isBefore ? (categoryCursor as string) : undefined,
    before: isBefore ? (categoryCursor as string) : undefined,
    first: !isBefore ? POSTS_PER_PAGE : undefined,
    last: isBefore ? POSTS_PER_PAGE : undefined,
  });

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>Posts - {generalSettings?.title}</title>
      </Head>
      <GTM />

      <main className="content content-single blog">
          {blogtop &&
            <div className="alignfull">
              {parseHtml(blogtop)}
            </div>
          }
          <Posts posts={posts.nodes} category={category?.name} />
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
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
