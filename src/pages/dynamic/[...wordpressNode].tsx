import { getWordPressProps, WordPressTemplate } from "@faustwp/core";
import { getPageNum } from "utils/urlParser";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
const Modal = dynamic(() => import("components/Modal/modal"));
import {isModalOpenContext, modalContentContext} from 'components/Modal/modalContext';
import dynamic from "next/dynamic";

export default function Page(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  return (
    <isModalOpenContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      <modalContentContext.Provider value={{modalContent, setModalContent}}>
        {isModalOpen && modalContent &&
          <Modal />
        }
        <WordPressTemplate {...props} />
      </modalContentContext.Provider>
    </isModalOpenContext.Provider>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { query } = ctx;
  ctx.resolvedUrl = ctx.resolvedUrl.replace('/dynamic','');
  ctx.resolvedUrl = ctx.resolvedUrl.replace('&post_type=wpsl_stores','');
  let paramString = '';


  Object.keys(query).map(k => {
    if(k !== 'wordpressNode') {
      paramString += `${k}=${query[k]}`
    }
  })
  return getWordPressProps({
    ctx,
    revalidate: 1,
    extra: {
      query: {
        page: getPageNum(ctx.params.wordpressNode),
        params: paramString,
        query: query
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
