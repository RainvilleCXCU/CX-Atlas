import { gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import { AlertFragment } from '../fragments/Alerts';
import { NavigationMenuItemFragment } from '../fragments/MenuItems';
import { ThirdPartySettingsFragment } from 'fragments/ThirdParty';
import { parseHtml } from 'lib/parser';
import Posts from 'components/Posts/listing';
import { useRouter } from 'next/router';
import { getPageNum } from '../utils/urlParser';
import dynamic from 'next/dynamic';
const BaseLayout = dynamic(() => import('components/layout'));

const POSTS_PER_PAGE = 5;

export default function Component(props) {
  const { query = {} } = useRouter();
  const { name, slug } = props?.data?.category;
  const { blogtop, blogSidebar } = props?.data?.widgetSettings;
  const { posts } = props?.data;
  const currentPage = getPageNum(query.wordpressNode);

  return (
    <BaseLayout props={props} pageTitle={`${name} Archives`}>
      <main id="main" className="entry-content content content-single blog">
          <article className='post-content'>
            {blogtop &&
              <div className="alignfull">
                {parseHtml(blogtop)}
              </div>
            }
            <Posts
              posts={posts?.nodes}
              postInfo={posts?.pageInfo}          
              category={slug}
              categoryName={name}
              currentPage={currentPage}
              postsPerPage={POSTS_PER_PAGE}
              blogSidebar={blogSidebar}
              />
            </article>
        </main>
    </BaseLayout>
  );
}
Component.variables = (seedQuery, context, extra) => {
  const page = extra?.query?.page ? parseInt(extra?.query?.page - 1) * 5 : 0;
  const categoryName = seedQuery?.slug ? seedQuery?.slug : "";
  return {
    page: page,
    categoryName,
    id: seedQuery.databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};


Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenuItemFragment}
  ${ThirdPartySettingsFragment}
  ${AlertFragment}
  query GetCategoryPage(
    $page: Int
    $id: ID!
    $categoryName: String
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    category(id: $id, idType: DATABASE_ID) {
      ... on Category {
        name
        slug
        seo {
          breadcrumbs {
            text,
            url
          }
          canonical
          metaDesc
          opengraphDescription
          opengraphModifiedTime
          opengraphPublishedTime
          opengraphType
          opengraphUrl
          metaRobotsNofollow
          metaRobotsNoindex
          title
          opengraphSiteName
          opengraphImage {
            mimeType
            mediaItemUrl
            mediaDetails {
              height
              width
            }
          }
        }
        template {
          templateName
        }
      }
    }
    posts(where: {offsetPagination: {offset: $page, size: 5}, categoryName: $categoryName}) {
        pageInfo {
            offsetPagination {
                total
            }
        }
        nodes {
            id
            uri
            excerpt
            title
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
        }
    }
    widgetSettings {
        blogtop
        blogSidebar
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

    cxAlerts: cXAlerts {
      nodes {
        ...AlertsFragment
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