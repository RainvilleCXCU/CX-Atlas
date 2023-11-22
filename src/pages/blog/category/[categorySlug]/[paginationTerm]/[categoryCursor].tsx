import { GetStaticPropsContext } from 'next';
import Page from 'pages/blog/category/[categorySlug]';
import { getNextStaticProps } from '@faustjs/next';
import { client } from 'client';

export default Page;

export async function getStaticProps(context: GetStaticPropsContext) {
  const { paginationTerm } = context.params;
  if (!(paginationTerm === 'page')) {
    return {
      notFound: true,
    };
  }

  return getNextStaticProps(context, {
    Page,
    client,
    revalidate: parseInt(process.env.POST_REVALIDATION) ? parseInt(process.env.POST_REVALIDATION) : null,
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
