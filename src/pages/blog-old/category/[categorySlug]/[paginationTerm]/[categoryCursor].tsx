// import { GetStaticPropsContext } from 'next';
// import Page from 'pages/blog-old/category/[categorySlug]';
// import { getNextStaticProps } from '@faustwp/core';

// export default Page;

// export async function getStaticProps(context: GetStaticPropsContext) {
//   const { paginationTerm } = context.params;
//   if (!(paginationTerm === 'page')) {
//     return {
//       notFound: true,
//     };
//   }

//   return getNextStaticProps(context, {
//     Page,
//     revalidate: parseInt(process.env.POST_REVALIDATION) ? parseInt(process.env.POST_REVALIDATION) : null,
//   });
// }

// export function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: 'blocking',
//   };
// }
