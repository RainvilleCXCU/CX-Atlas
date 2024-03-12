import { getWordPressProps, WordPressTemplate } from '@faustwp/core';
import { getPageNum } from 'utils/urlParser';

export default function Page(props) {
  return <WordPressTemplate {...props} />;
}

export function getStaticProps(ctx) {
  return getWordPressProps({ ctx,
    revalidate: parseInt(process.env.PAGE_REVALIDATION) ? parseInt(process.env.PAGE_REVALIDATION) : null, 
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

// export function getServerSideProps(ctx) {
//   // ctx.res.setHeaders('Cache-Control', 's-maxage=20, stale-while-revalidate=80')
//   return getWordPressProps({ 
//     ctx,
//     extra: {
//       query: ctx.query
//     }
//   });
// }

// // export async function getStaticPaths() {
// //   return {
// //     paths: [],
// //     fallback: 'blocking',
// //   };
// // }
