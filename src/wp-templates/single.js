import { gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import { AlertFragment } from '../fragments/Alerts';
import { ThirdPartySettingsFragment, GTM, HotJar, Personyze, Qualtrics, Spectrum, Siteimprove } from '../components/ThirdParty';
import {
  Header,
  Footer,
  MenuNavigation,
  SEO,
} from '../components';
const Alert = dynamic(() => import('components/Alerts/Alert'), {ssr:false});
import Loading from 'components/common/loading';
import { parseHtml } from 'lib/parser';
import RelatedPosts from 'components/Posts/relatedPosts';
import Image from 'next/image';
import { Fragment } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

export default function Component(props) {

  const { title: siteTitle, description: siteDescription, logo: siteLogo, footerText: footerText } =
    props?.data?.generalSettings;
  const { gtmId, gtmEnabled, hotjarEnabled, hotjarId, personyzeDomains, personyzeEnabled, personyzeId, spectrumId, spectrumEnabled, qualtricsId, qualtricsEnabled, siteimproveId, siteimproveEnabled } = props?.data?.thirdPartySettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { title, content, seo, link, featuredImage, databaseId, categories } = props?.data?.post ?? { title: '' };
  const { relatedPosts } = props?.data;
  const headerSettings = props?.data?.headerSettings; 
  const { footerUtilities, footerAppIcons, footerSocialIcons } = props?.data?.footerSettings;
  const { blogtop, blogSidebar } = props?.data?.widgetSettings;
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
				ogImageWidth={seo?.opengraphImage?.mediaDetails?.width}
				ogImageHeight={seo?.opengraphImage?.mediaDetails?.height}
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

Component.query = gql`
  ${BlogInfoFragment}
  ${MenuNavigation.fragments.entry}
  ${ThirdPartySettingsFragment}
  ${AlertFragment}
  query GetPost(
    $databaseId: ID!
    $id: String
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
    relatedPosts(postId: $id) {
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

Component.variables = ({ databaseId }, ctx) => {
  return {
    id: String(databaseId),
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  };
};
