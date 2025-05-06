import { gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import { AlertFragment } from '../fragments/Alerts';
import { NavigationMenuItemFragment } from '../fragments/MenuItems';
import { ThirdPartySettingsFragment } from 'fragments/ThirdParty';
import { parseHtml } from 'lib/parser';
import RelatedPosts from 'components/Posts/relatedPosts';
import Image from 'next/image';
import { Fragment } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const BaseLayout = dynamic(() => import('components/layout'));
export default function Component(props) {
  const { title, content, databaseId, featuredImage, categories } = props?.data?.post ?? { title: '' };
  const relatedPosts = props?.data?.relatedPosts;
  const { blogtop, blogSidebar } = props?.data?.widgetSettings;

  return (
    <>
    <BaseLayout props={props}>
      <div id="page" className="container site">
        <main className="content single-post">
          <article id={`post-${databaseId}`} className="post post-content">        
            <aside className="sidebar">
              {/* {databaseId &&
                <RelatedPosts relatedPosts={relatedPosts} />
              } */}
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

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenuItemFragment}
  ${ThirdPartySettingsFragment}
  ${AlertFragment}
  query GetPost(
    $databaseId: ID!
    $id: String
    $searchEngine: String
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      id
      databaseId
      title
      content
      date
      link
      template {
        templateName
      }
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
          metaRobotsNofollow
          metaRobotsNoindex
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
    relatedPosts(postId: $id, searchEngine: $searchEngine) {
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

Component.variables = ({ databaseId }, ctx) => {
  console.log('Variables');
  console.log(ctx)
  return {
    id: String(databaseId),
    databaseId,
    searchEngine: process.env.NEXT_PUBLIC_SEARCH_APPLIANCE ? process.env.NEXT_PUBLIC_SEARCH_APPLIANCE : '',
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  };
};
