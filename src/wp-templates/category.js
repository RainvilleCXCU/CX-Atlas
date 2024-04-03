import { gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import { AlertFragment } from '../fragments/Alerts';
import { Footer, Header, MenuNavigation, SEO } from 'components';
import Alert from 'components/Alerts/Alert';
import { ThirdPartySettingsFragment, GTM, HotJar, Personyze, Qualtrics, Spectrum, Siteimprove } from '../components/ThirdParty';
import Loading from 'components/common/loading';
import { parseHtml } from 'lib/parser';
import Posts from 'components/Posts/listing';
import { useRouter } from 'next/router';
import { getPageNum } from '../utils/urlParser';

const POSTS_PER_PAGE = 5;
export default function Component(props) {
  const { query = {} } = useRouter();
  
  const { blogtop, blogSidebar } = props?.data?.widgetSettings;
  const { posts } = props?.data;
  const { name, slug } = props?.data?.category;
  const { title: siteTitle, description: siteDescription, logo: siteLogo, footerText: footerText, databaseId: databaseId } =
    props?.data?.generalSettings;
  const { gtmId, gtmEnabled, hotjarEnabled, hotjarId, personyzeDomains, personyzeEnabled, personyzeId, spectrumId, spectrumEnabled, qualtricsId, qualtricsEnabled, siteimproveId, siteimproveEnabled } = props?.data?.thirdPartySettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { title, content, seo, link, featuredImage } = props?.data?.page ?? { title: '' };
  const headerSettings = props?.data?.headerSettings; 
  const { footerUtilities, footerAppIcons, footerSocialIcons } = props?.data?.footerSettings;
  const currentPage = getPageNum(query.wordpressNode);
  const activeAlerts = props?.data?.cxAlerts?.nodes?.filter(alert => alert.displayPages.includes(databaseId.toString())) || [];
  return (
    <>
      <SEO
				title={seo?.title}
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
			<GTM
        id={gtmId}
        enabled={gtmEnabled} />
      <HotJar
        id={hotjarId}
        enabled={hotjarEnabled} />
			<Personyze
        id={personyzeId}
        enabled={personyzeEnabled}
        domains={personyzeDomains} />
        
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

      <main id="main" className="entry-content content content-single blog">
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
      </main>
      <Footer copyrightHolder={footerText} menuItems={footerMenu} logo={siteLogo} footerUtilities={footerUtilities} footerAppIcons={footerAppIcons} footerSocialIcons={footerSocialIcons} />
			<Qualtrics
        id={qualtricsId}
        enabled={qualtricsEnabled} />
			<Spectrum
        id={spectrumId}
        enabled={spectrumEnabled} />
			<Siteimprove
        id={siteimproveId}
        enabled={siteimproveEnabled} />
    </>
  );
}

Component.variables = (seedQuery, context, extra) => {
  const page = extra?.query?.page ? parseInt(extra?.query?.page) : 1;
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
  ${MenuNavigation.fragments.entry}
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