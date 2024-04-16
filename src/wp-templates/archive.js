import { gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import { AlertFragment } from '../fragments/Alerts';
import { NavigationMenuItemFragment } from '../fragments/MenuItems';
// import { ThirdPartySettingsFragment, GTM, Personyze, HotJar, Qualtrics, Spectrum, Siteimprove } from '../components/ThirdParty';
import { ThirdPartySettingsFragment } from 'fragments/ThirdParty';
const GTM = dynamic(() => import('components/ThirdParty/gtm'), {ssr:false});
const Personyze = dynamic(() => import('components/ThirdParty/personyze'), {ssr:false});
const HotJar = dynamic(() => import('components/ThirdParty/hotjar'), {ssr:false});
const Qualtrics = dynamic(() => import('components/ThirdParty/qualtrics'), {ssr:false});
const Spectrum = dynamic(() => import('components/ThirdParty/spectrum'), {ssr:false});
const Siteimprove = dynamic(() => import('components/ThirdParty/siteimprove'), {ssr:false});
// import {
//   Header,
//   MenuNavigation,
//   SEO,
// } from '../components';
const Header = dynamic(()=> import('components/Header/Header'));
const Footer = dynamic(() => import('components/Footer/Footer'));
const SEO = dynamic(()=> import('components/SEO/SEO'));
import { parseHtml } from 'lib/parser';
const Alert = dynamic(() => import('components/Alerts/Alert'), {ssr:false});
const Loading = dynamic(() => import('components/common/loading'), {ssr:false});
import { useRouter } from 'next/router';
import Posts from '../components/Posts/listing';
import { getNextStaticProps } from '@faustwp/core';
import { getPageNum } from 'utils/urlParser';
import dynamic from 'next/dynamic';

const POSTS_PER_PAGE = 5;

export default function Page(props) {
  const { query = {} } = useRouter();

  const { title: siteTitle, description: siteDescription, logo: siteLogo, footerText: footerText, databaseId: databaseId } =
    props?.data?.generalSettings;
  const { gtmId, gtmEnabled, hotjarEnabled, hotjarId, personyzeDomains, personyzeEnabled, personyzeId, spectrumId, spectrumEnabled, qualtricsId, qualtricsEnabled, siteimproveId, siteimproveEnabled } = props?.data?.thirdPartySettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { title, content, seo, link, featuredImage } = props?.data?.page ?? { title: '' };
  const headerSettings = props?.data?.headerSettings; 
  const { footerUtilities, footerAppIcons, footerSocialIcons } = props?.data?.footerSettings;
  const { blogtop, blogSidebar } = props?.data?.widgetSettings;
  const posts = props?.data?.posts;
  const { postSlug, postCursor } = query;
  const currentPage = getPageNum(query.wordpressNode);
  const activeAlerts = props?.data?.cxAlerts?.nodes?.filter(alert => alert.displayPages.includes(databaseId.toString())) || [];

  return (
    <>
      <SEO
				title={title}
				metaDesc={seo?.metaDesc}
				canonicalURL={seo?.canonical ? seo?.canonical : link} //I'm unsure about this. Changing the canonical URL in Yoast doesn't seem to do anything...
				ogType={seo?.opengraphType}
				ogTitle={seo?.title}
				ogDescription={seo?.opengraphDescription}
				ogURL={seo?.opengraphUrl}
				ogSite_Name={seo?.opengraphSiteName}
				published_time={seo?.opengraphPublishedTime}
				modified_time={seo?.opengraphModifiedTime}
				ogImage={seo?.opengraphImage?.mediaItemUrl}
				ogImageWidth={seo?.opengraphImage?.mediaDetails.width}
				ogImageHeight={seo?.opengraphImage?.mediaDetails.height}
				ogImageType={seo?.opengraphImage?.mimeType}
				twitter_card={"summary_large_image"} // Not sure where this is in the page object
				twitter_label1={"Est. reading time"} // Not sure where this is in the page object
				twitter_data1={seo?.readingTime + " minutes"}
  />
  {gtmEnabled &&
  <GTM
    id={gtmId}
    enabled={gtmEnabled} />
  }
  {hotjarEnabled &&
  <HotJar
    id={hotjarId}
    enabled={hotjarEnabled} />
  }
  {personyzeEnabled &&
  <Personyze
    id={personyzeId}
    enabled={personyzeEnabled}
    domains={personyzeDomains} />
  }
    
  {
    activeAlerts.length > 0 &&
    <Alert alerts={activeAlerts} />
  }
			<Loading /> 
			<Header
				title={title}
				description={siteDescription}
				logo={siteLogo}
        menuItems={primaryMenu}
        headerSettings={headerSettings}
			/>
      <main id="main" className="entry-content content content-index blog">
        <article className='post-content'>
          {blogtop &&
            <div className="alignfull">
              {parseHtml(blogtop)}
            </div>
          }
          <Posts
            posts={posts.nodes}
            heading="Blog Posts"
            headingLevel="h2"
            postTitleLevel="h3"
            postInfo={posts.pageInfo}
            currentPage={currentPage}
            postsPerPage={POSTS_PER_PAGE}
            blogSidebar={blogSidebar}
          />
        </article>
      </main>

      {footerMenu &&
			<Footer copyrightHolder={footerText} menuItems={footerMenu} logo={siteLogo} footerUtilities={footerUtilities} footerAppIcons={footerAppIcons} footerSocialIcons={footerSocialIcons} />
     }
     {qualtricsEnabled &&
			<Qualtrics
        id={qualtricsId}
        enabled={qualtricsEnabled} />
     }
     {spectrumEnabled &&
			<Spectrum
        id={spectrumId}
        enabled={spectrumEnabled} />
     }
     {siteimproveEnabled &&
			<Siteimprove
        id={siteimproveId}
        enabled={siteimproveEnabled} />
     }
    </>
  );
}


Page.variables = (seedQuery, context, extra) => {
    const page = extra?.query?.page ? parseInt(extra?.query?.page) : 1;
    return {
      page: page,
      headerLocation: MENUS.PRIMARY_LOCATION,
      footerLocation: MENUS.FOOTER_LOCATION,
    };
  };
Page.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenuItemFragment}
  ${ThirdPartySettingsFragment}
  ${AlertFragment}
  query GetPosts(
    $page: Int
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    posts(where: {offsetPagination: {offset: $page, size: 5}}) {
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
            seo {
              canonical
              metaDesc
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

// export async function getServerSideProps(context) {
//   console.log('Context');
//   console.log(context)
//   return getNextServerSideProps(context, {
//     Page,
//   });
// }


export function getStaticProps(ctx, props) {
  /**
   * @link https://faustjs.org/docs/next/reference/getNextStaticProps
   */
  console.log('params');
  console.log(JSON.stringify(props))
  return getNextStaticProps(ctx, {
    Page
  });
}


  export function getStaticPaths() {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }