import { getWordPressProps, WordPressTemplate } from '@faustwp/core';
import { getPageNum } from 'utils/urlParser';

export default function Page(props) {
  return <WordPressTemplate {...props} />;
}

export function getStaticProps(ctx) {
  return getWordPressProps({ ctx,
    revalidate: process.env.NEXT_PUBLIC_PAGE_REVALIDATION ? parseInt(process.env.NEXT_PUBLIC_PAGE_REVALIDATION) : null, 
    extra: {
      query: {
        page: getPageNum(ctx.params.wordpressNode)
      }
    } } );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}