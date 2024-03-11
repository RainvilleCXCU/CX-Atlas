import { getWordPressProps, WordPressTemplate } from '@faustwp/core';

export default function Page(props) {
  return <WordPressTemplate {...props} />;
}

export function getStaticProps(ctx) {
  console.log('STATIC CONTEXT')
  console.log(ctx);
  return getWordPressProps({ ctx });
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
