import * as MENUS from 'constants/menus';
import { BlogInfoFragment } from '../../fragments/GeneralSettings';
import { AlertFragment } from 'fragments/Alerts';
import { NavigationMenuItemFragment } from 'fragments/MenuItems';
import { ThirdPartySettingsFragment } from 'fragments/ThirdParty';
import Pagination from 'components/Pagination';
import SearchBar from 'components/Search/SearchBar';
import SearchListing from 'components/Search/Listing';
import { getNextServerSideProps, getNextStaticProps } from '@faustwp/core';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Categories from 'components/Posts/categories';
import BaseLayout from 'components/layout';

const POSTS_PER_PAGE = 5;

export default function Component(props) {
  const { query = {} } = useRouter();
  const { title, content, seo, link, featuredImage } = props?.data?.page ?? { title: '' };
  let results, total ;
  if(process.env.NEXT_PUBLIC_SEARCH_APPLIANCE === 'searchwp' || !process.env.NEXT_PUBLIC_SEARCH_APPLIANCE) {
    results = props.data.searchwp.results || [];
    total = props.data.searchwp.total;
  }
  if(process.env.NEXT_PUBLIC_SEARCH_APPLIANCE === 'smartsearch') {
    results = props.data.contentNodes.nodes || [];
    total = props.data.contentNodes.pageInfo.offsetPagination.total;
  }
  const currentPage = query?.page ? parseInt(query?.page.toString()) : 1;
  const search = query.s;
  const categories = props?.data?.categories;

  return (
    <BaseLayout props={props} pageTitle={search}>
			<main id="main" className="content content-index container">
          <div id="post-wrap" className='cx-search__wrapper search'>
            <div className='cx-search__results'>
              <SearchBar /> 
               {results.map((post) => (
                <SearchListing
                    key={post.id ? `post-listing=${post.id}` : ''}
                    id={`post-${post.id}`}
                    title={post.title}
                    url={post.uri}
                    type={post.contentTypeName ? post.contentTypeName : null}
                    content={post.excerpt !== '' ? post.excerpt : ''}
                    categories={post.categories?.nodes}
                    featuredImage={post.featuredImage} />
                ))}
                <Pagination currentPage={currentPage} totalResults={parseInt(total)} basePath={`/search`} perPage={POSTS_PER_PAGE} querys={`?s=${search}`} />
            </div>

            <aside className="cx-search__sidebar sidebar">
                <Categories categories={categories?.nodes} />
            </aside>
          </div>
      </main>
    </BaseLayout>
  );
}

Component.variables = (params, ctx) => {
  let offset: string | number = params.query.page ? (POSTS_PER_PAGE * parseInt(params.query.page) - 1).toString() : '0';
  let postsPerPage: string | number = POSTS_PER_PAGE.toString();

  if(process.env.NEXT_PUBLIC_SEARCH_APPLIANCE === 'smartsearch') {
    offset = params.query.page ? (POSTS_PER_PAGE * (parseInt(params.query.page) - 1)) : 0;
    postsPerPage = POSTS_PER_PAGE;
  }
  return {
    searchTerm: params.query.s || '',
    offset: offset,
    postsPerPage: postsPerPage,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION
  };
};

if(process.env.NEXT_PUBLIC_SEARCH_APPLIANCE === 'smartsearch') {
Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenuItemFragment}
  ${ThirdPartySettingsFragment}
  ${AlertFragment}
  query GetSearchData(
    $searchTerm: String!
    $offset: Int!
    $postsPerPage: Int!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    # contentNodes(offset: $offset, postsPerPage: $postsPerPage, terms: $searchTerm) {
    contentNodes(where: {search: $searchTerm, offsetPagination: {offset: $offset, size: $postsPerPage}}) {
      nodes {
        ... on Page {
          id
          title
          uri
          excerpt(format: RENDERED)
          featuredImage {
            node {
              id
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          contentTypeName
        }
        ... on Post {
          id
          title
          uri
          excerpt(format: RENDERED)
          categories {
            nodes {
              name
              uri
            }
          }
          featuredImage {
            node {
              id
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          contentTypeName
        }
        ... on Location {
          id
          excerpt
          featuredImage {
            node {
              id
            }
          }
          title(format: RENDERED)
          uri
          contentTypeName
        }
        ... on Ufaq {
          id
          title
          uri
          excerpt(format: RENDERED)
          contentTypeName
        }
      }
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
    headerSettings {
      headerUtilities
      headerUtilitiesMobile
      headerButtons
      headerButtonsMobile
    }
    footerSettings {
      footerUtilities
      footerAppIcons
      footerSocialIcons
    }
    thirdPartySettings {
      ...ThirdPartySettingsFragment
    }
    categories {
      nodes {
        name
        uri
        count
      }
    }

    cxAlerts: cXAlerts {
        edges {
          node{
            ...AlertsFragment
          }
        }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }, first: 255) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }, first: 255) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;
}



if(process.env.NEXT_PUBLIC_SEARCH_APPLIANCE === 'searchwp' || !process.env.NEXT_PUBLIC_SEARCH_APPLIANCE) {
  Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenuItemFragment}
  ${ThirdPartySettingsFragment}
  ${AlertFragment}
  query GetSearchData(
    $searchTerm: String!
    $offset: String!
    $postsPerPage: String!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    searchwp(offset: $offset, postsPerPage: $postsPerPage, terms: $searchTerm) {
      results {
        id
        title
        uri
        excerpt
        categories {
          nodes {
            name
            uri
          }
        }
        featuredImage {
          node {
            id
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        contentTypeName
      }
      total
    }
    generalSettings {
      ...BlogInfoFragment
    }
    headerSettings {
      headerUtilities
      headerUtilitiesMobile
      headerButtons
      headerButtonsMobile
    }
    footerSettings {
      footerUtilities
      footerAppIcons
      footerSocialIcons
    }
    thirdPartySettings {
      ...ThirdPartySettingsFragment
    }
    categories {
      nodes {
        name
        uri
        count
      }
    }

    cxAlerts: cXAlerts {
        edges {
          node{
            ...AlertsFragment
          }
        }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }, first: 255) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }, first: 255) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

}


export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getNextServerSideProps(context, {
      Page: Component,
  });
}