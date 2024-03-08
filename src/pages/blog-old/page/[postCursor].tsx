import { getNextStaticProps } from '@faustwp/core';
import { GetStaticPropsContext } from 'next';
import Page from '..';

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
    revalidate: parseInt(process.env.POST_REVALIDATION) ? parseInt(process.env.POST_REVALIDATION) : null,
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
