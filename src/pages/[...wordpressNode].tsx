import { gql, useQuery } from "@apollo/client";
import { getWordPressProps, WordPressTemplate } from "@faustwp/core";
import * as MENUS from "../constants/menus";
import apolloClient from "apolloClient";
import { MenuNavigation } from "components";
import { getPageNum } from "utils/urlParser";

export default function Page(props) {
  return <WordPressTemplate {...props} />;
}

export function getStaticProps(ctx) {
  return getWordPressProps({
    ctx,
    revalidate: process.env.NEXT_PUBLIC_PAGE_REVALIDATION
      ? parseInt(process.env.NEXT_PUBLIC_PAGE_REVALIDATION)
      : null,
    extra: {
      query: {
        page: getPageNum(ctx.params.wordpressNode),
      },
    },
  });
}

export async function getStaticPaths() {
  // Get all Paths in Header Navigation
  // const { data } = await apolloClient.query({
  //   query: gql`
  //   ${MenuNavigation.fragments.entry}
  //   query GetMenuItems(
  //     $headerLocation: MenuLocationEnum
  //   ) {
  //   headerMenuItems: menuItems(where: { location: $headerLocation }, first: 255) {
  //     nodes {
  //       ...NavigationMenuItemFragment
  //     }
  //   }}`,
  //   variables: {
  //     headerLocation: MENUS.PRIMARY_LOCATION,
  //   }
  // })
  // const paths = data.headerMenuItems.nodes.map(item => {
  //   if(item.uri[0] === '/') {
  //     return item.uri
  //   }
  // }).filter(uri => uri !== undefined && uri !== '/about/branch-and-atm-locations/');
  // paths.push('/rates/');

  /**
   * Pre Render all Pages and Posts
   */

  const pageData = await apolloClient.query({
    query: gql`
      query GetAllPages {
        pages(first: 255, where: {status: PUBLISH}) {
          edges {
            node {
              uri
            }
          }
        }
      }
    `,
  });
  const postData = await apolloClient.query({
    query: gql`
      query GetAllPosts {
        posts(first: 255, where: {status: PUBLISH}) {
          edges {
            node {
              uri
            }
          }
        }
      }
    `,
  });
  const pages = pageData.data.pages.nodes
    .map((item) => {
      if (item.uri[0] === '/' && item !== '/') {
        return item.uri;
      }
    })
    .filter(
      (uri) => uri !== undefined && uri !== "/about/branch-and-atm-locations/"
    );

  const posts = postData.data.headerMenuItems.nodes
  .map((item) => {
    if (item.uri[0] === '/' && item !== '/') {
      return item.uri;
    }
  })
  .filter(
    (uri) => uri !== undefined
  );

  return {
    paths: [
      ...pages,
      ...posts
    ],
    fallback: "blocking",
  };
}
