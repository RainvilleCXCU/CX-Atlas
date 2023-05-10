import { getNextStaticProps } from '@faustjs/next';
import { GetStaticPropsContext } from 'next';
import Page from '..';
import { client } from 'client';

export default Page;

export async function getStaticProps(context: GetStaticPropsContext) {
  const { searchSlug } = context.params;
  
  if (!(searchSlug === 'page')) {
    return {
      notFound: true,
    };
  }

  return getNextStaticProps(context, {
    Page,
    client,
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
