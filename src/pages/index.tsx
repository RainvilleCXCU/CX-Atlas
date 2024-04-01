import { getWordPressProps, WordPressTemplate } from '@faustwp/core';

export default function Page(props) {
  return <WordPressTemplate {...props} />;
}

export function getStaticProps(ctx) {
  return getWordPressProps({ ctx,
    revalidate: process.env.NEXT_PUBLIC_PAGE_REVALIDATION ? parseInt(process.env.NEXT_PUBLIC_PAGE_REVALIDATION) : null
  });
}