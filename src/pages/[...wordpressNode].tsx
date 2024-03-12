import { getWordPressProps, WordPressTemplate } from '@faustwp/core';
import { getPageNum } from 'utils/urlParser';

export default function Page(props) {
  return <WordPressTemplate {...props} />;
}

export function getStaticProps(ctx) {
  const propData = getWordPressProps({ ctx, extra: {
    query: {
      page: getPageNum(ctx.params.wordpressNode)
    }
  } } );
  return propData;
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
