import { getNextStaticProps } from '@faustjs/next';
import { GetStaticPropsContext } from 'next';
import Page from '..';
import { client } from 'client';

export default Page;

export async function getStaticProps(context: GetStaticPropsContext) {
  // const { baseSlug } = context.params;

  // if (!(baseSlug === 'page')) {
  //   return {
  //     notFound: false,
  //   };
  // }


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
