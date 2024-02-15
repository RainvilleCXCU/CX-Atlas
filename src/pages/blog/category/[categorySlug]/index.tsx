import { getNextStaticProps, is404 } from '@faustjs/next';
import Head from 'next/head';
import { Header, Footer, Posts, Pagination } from 'components';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { client } from 'client';
import GTM from 'components/ThirdParty/gtm';
import { parseHtml } from 'lib/parser';
import HotJar from 'components/ThirdParty/hotjar';
import Qualtrics from 'components/ThirdParty/qualtrics';
import Spectrum from 'components/ThirdParty/spectrum';
import Personyze from 'components/ThirdParty/personyze';

const POSTS_PER_PAGE = 5;

export default function Page() {
  const { useQuery, usePosts, useCategory } = client;
  const { query = {} } = useRouter();
  const { categorySlug, paginationTerm, categoryCursor } = query;
  const currentPage = categoryCursor ? parseInt(categoryCursor.toString()) : 1;
  const generalSettings = useQuery().generalSettings;
  const { blogtop } = useQuery().widgetSettings;
  const category = useCategory();

  const posts = usePosts({
    where: {
      categoryName: categorySlug.toString(),
      offsetPagination: {
        offset: ((currentPage - 1) * POSTS_PER_PAGE),
        size: POSTS_PER_PAGE
      }
    }
  });

  return (
    <>

      <Head>
        <title>{`Posts - ${generalSettings?.title}`}</title>
      </Head>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />
      <GTM />
      <Personyze />
      <HotJar />

      <main id="main" className="content content-single blog">
        {blogtop &&
          <div className="alignfull">
            {parseHtml(blogtop)}
          </div>
        }
        <Posts
          posts={posts.nodes}
          postInfo={posts.pageInfo}          
          category={categorySlug.toString()}
          categoryName={category.name}
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

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
