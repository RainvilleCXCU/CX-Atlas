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
import { parseHtml } from 'lib/parser';
const Alert = dynamic(() => import('components/Alerts/Alert'), {ssr:false});;
import Loading from 'components/common/loading';
import dynamic from 'next/dynamic';

export default function Component(props) {
  // Loading state for previews

  const { title: siteTitle, description: siteDescription, logo: siteLogo, footerText: footerText, databaseId: databaseId } =
    props?.data?.generalSettings;
  const { gtmId, gtmEnabled, hotjarEnabled, hotjarId, personyzeDomains, personyzeEnabled, personyzeId, spectrumId, spectrumEnabled, qualtricsId, qualtricsEnabled, siteimproveId, siteimproveEnabled } = props?.data?.thirdPartySettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { title, content, seo, link } = props?.data?.page ?? { title: '' };
  const headerSettings = props?.data?.headerSettings; 
  const { footerUtilities, footerAppIcons, footerSocialIcons } = props?.data?.footerSettings;
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
				<main id="main" className="content content-single">
					<article className="entry-content post-content">
            { content && 
                parseHtml(content.toString())
            }
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

Component.variables = (seedQuery, ctx) => {
  const {databaseId} = seedQuery;
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  };
};

Component.query = gql`
  ${BlogInfoFragment}
  ${MenuNavigation.fragments.entry}
  ${ThirdPartySettingsFragment}
  ${AlertFragment}
  query GetPageData(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
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
      link
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
