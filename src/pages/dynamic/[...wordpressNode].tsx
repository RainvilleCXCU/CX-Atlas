import { gql, useQuery } from "@apollo/client";
import { getWordPressProps, WordPressTemplate } from "@faustwp/core";
import * as MENUS from "constants/menus";
import apolloClient from "apolloClient";
import { MenuNavigation } from "components";
import { getPageNum } from "utils/urlParser";
import { GetServerSidePropsContext } from "next";
import { encode } from 'querystring';

export default function Page(props) {
  return (
    <WordPressTemplate {...props} />
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { req, res, query } = ctx;
  console.log('ServerSide ')
  console.log(query);
  ctx.resolvedUrl = ctx.resolvedUrl.replace('/dynamic','');
  let paramString = '';

  Object.keys(query).map(k => {
    if(k !== 'wordpressNode') {
      paramString += `${k}=${query[k]}`
    }
  })

  // console.log(ctx)
  return getWordPressProps({
    ctx,
    revalidate: process.env.NEXT_PUBLIC_PAGE_REVALIDATION
      ? parseInt(process.env.NEXT_PUBLIC_PAGE_REVALIDATION)
      : null,
    extra: {
      query: {
        page: getPageNum(ctx.params.wordpressNode),
        params: paramString
      },
    },
  });
}

// export async function getStaticPaths() {
//   // Get all Paths in Header Navigation
//   const NavData = await apolloClient.query({
//     query: gql`
//     ${MenuNavigation.fragments.entry}
//     query GetMenuItems(
//       $headerLocation: MenuLocationEnum
//     ) {
//     headerMenuItems: menuItems(where: { location: $headerLocation }, first: 255) {
//       nodes {
//         ...NavigationMenuItemFragment
//       }
//     }}`,
//     variables: {
//       headerLocation: MENUS.PRIMARY_LOCATION,
//     }
//   })
//   const navPaths = NavData.data.headerMenuItems.nodes.map(item => {
//     if(item.uri[0] === '/') {
//       return item.uri
//     }
//   }).filter(uri => uri !== undefined && uri !== '/about/branch-and-atm-locations/');
//   navPaths.push('/rates/');

//   /**
//    * Pre Render all Pages and Posts
//    */
//   let pages, posts = [];

//   const pathData = await apolloClient.query({
//     query: gql`
//       query GetAllPagesAndPages {
//         pages(first: 255, where: {status: PUBLISH}) {
//           nodes {
//             uri
//           }
//         }
//         posts(first: 255, where: {status: PUBLISH}) {
//           nodes {
//             uri
//           }
//         }
//       }
//     `,
//   });
//   pages = pathData.data.pages.nodes
//     .map((item) => {
//       if (item.uri && item.uri[0] === '/' && item.uri !== '/') {
//         return item.uri;
//       }
//     })
//     .filter(
//       (uri) => uri !== undefined && uri !== "/about/branch-and-atm-locations/"
//     );

//   posts = pathData.data.posts.nodes
//   .map((item) => {
//     if (item.uri && item.uri[0] === '/' && item.uri !== '/') {
//       return item.uri;
//     }
//   })
//   .filter(
//     (uri) => uri !== undefined
//   );

//   let paths = process.env.NEXT_PUBLIC_PREBUILD_PAGESPOSTS === 'true' ? [...pages,...posts] : process.env.NEXT_PUBLIC_PREBUILD_NAVIGATION === 'true' ? navPaths : [];


//   return {
//     paths: paths,
//     fallback: "blocking",
//   };
// }