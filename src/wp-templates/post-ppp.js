import { gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import { AlertFragment } from '../fragments/Alerts';
import { NavigationMenuItemFragment } from '../fragments/MenuItems';
import { parseHtml } from 'lib/parser';
import { ThirdPartySettingsFragment } from 'fragments/ThirdParty';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import RelatedPosts from 'components/Posts/relatedPosts';
import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
const BaseLayout = dynamic(() => import('components/layout'));

export default function Component(props) {
  const { title, content, databaseId, featuredImage, categories, relatedPosts  } = props?.data?.postPreview ?? { title: '' };
  const { blogtop, blogSidebar } = props?.data?.widgetSettings;

  return (
    <>
    <BaseLayout props={props}>
			<div id="page" className="container site">
         <main className="content single-post">
            <article id={`post-${databaseId}`} className="post post-content">
          
              <aside className="sidebar">
                {databaseId &&
                  <RelatedPosts relatedPosts={relatedPosts} />
                }
                {blogSidebar &&
                  parseHtml(blogSidebar)
                }
              </aside>
              <div className='post-content'>
                <header className='entry-header'>
                  {featuredImage && featuredImage?.node?.sourceUrl && 
                    <div className='featured-image'>
                      <Image src={featuredImage?.node.sourceUrl?.replace(/^(?:\/\/|[^\/]+)*\//gi, '/')} alt='' width={featuredImage.node.mediaDetails.width} height={featuredImage.node.mediaDetails.height} />
                    </div>
                  }
                  <h1>{title}</h1>
                  {categories &&
                    <div className='categories'>
                      {categories.nodes.map((category, index) => (
                        <Fragment key={category.name}>
                          {category.uri &&
                            <><Link href={category.uri}>{category.name}</Link>{index < categories.nodes.length - 1 ? ', ' : ''}</>
                          }
                        </Fragment>
                      ))}
                    </div>}
                </header>
                <div className='entry-content'>
                  { content && 
                      parseHtml(content.toString())
                  }
                  {/* <div id="cx-qt-feedback" className="blog-post"></div> */}
                </div>
              </div>
            </article>
          </main>
			</div>
    </BaseLayout>
    </>
  );
}

Component.variables = (seedQuery, ctx, extra) => {
  const {databaseId, uri} = seedQuery;
  return {
    // uri: `${uri}${extra?.query?.params ? `?${JSON.stringify(extra?.query?.params)}`: ''}`,
    cache: new Date().getSeconds().toString(),
    pageId: extra?.query?.query?.page_id ? extra?.query?.query?.page_id : extra?.query?.query?.p,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION
  };
};

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenuItemFragment}
  ${ThirdPartySettingsFragment}
  ${AlertFragment}
  query GetPagePreviewData(
    $pageId: String
    $cache: String
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    postPreview(pageId: $pageId, cache:$cache) {
      title
      content
      databaseId
      seo {
          canonical
          metaDesc
          breadcrumbs {
            text,
            url
          }
          opengraphDescription
          opengraphModifiedTime
          opengraphPublishedTime
          opengraphType
          opengraphUrl
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
      author {
        node {
          name
        }
      }
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
    relatedPosts(postId: $pageId) {
      title
      uri
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
    widgetSettings {
        blogtop
        blogSidebar
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
