import * as MENUS from "constants/menus";
import { BlogInfoFragment } from "../../../fragments/GeneralSettings";
import { AlertFragment } from '../../../fragments/Alerts';
import { NavigationMenuItemFragment } from 'fragments/MenuItems';
import { ThirdPartySettingsFragment } from 'fragments/ThirdParty';
const GTM = dynamic(() => import('components/ThirdParty/gtm'), {ssr:false});
const Personyze = dynamic(() => import('components/ThirdParty/personyze'), {ssr:false});
const HotJar = dynamic(() => import('components/ThirdParty/hotjar'), {ssr:false});
const Qualtrics = dynamic(() => import('components/ThirdParty/qualtrics'), {ssr:false});
const Spectrum = dynamic(() => import('components/ThirdParty/spectrum'), {ssr:false});
const Siteimprove = dynamic(() => import('components/ThirdParty/siteimprove'), {ssr:false});
const Clarity = dynamic(() => import('components/ThirdParty/clarity'), {ssr:false});
// const Header = dynamic(()=> import('components/Header/Header'));
// const Footer = dynamic(() => import('components/Footer/Footer'));
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
// const SEO = dynamic(()=> import('components/SEO/SEO'));
import { parseHtml } from "lib/parser";
const Alert = dynamic(() => import('components/Alerts/Alert'), {ssr:false});
const Modal = dynamic(() => import("components/Modal/modal"));
import {isModalOpenContext, modalContentContext} from 'components/Modal/modalContext';
import Loading from "components/common/loading";
import Head from "next/head";
import { useState, useContext } from "react";
import {
  showDetailsContext,
  selectedLocationContext,
} from "components/Locations/locationsContext";
import { gql, useQuery } from "@apollo/client";
import PageTitle from "components/Blocks/PageTitle";
import Container from "components/Blocks/Container";
import Columns from "components/Blocks/Columns";
import Column from "components/Blocks/Column";
import { Store } from "context/store";
import { useRouter } from "next/router";
import { getNextStaticProps } from "@faustwp/core";
import dynamic from "next/dynamic";
import Locations from "components/Locations/view";
export default function Page() {
  const props = useQuery(Page.query, {
    variables: Page.variables(),
  });
  const { query = {} } = useRouter();

  const location = query.location;

  console.log("QUERY");
  console.log(query);
  console.log(location);

  // const [state, setState] = useContext(Store);

  const {
    title: siteTitle,
    description: siteDescription,
    logo: siteLogo,
    footerText: footerText,
    databaseId: databaseId,
  } = props?.data?.generalSettings;
  const {
    clarityEnabled,
    clarityId,
    gtmId,
    gtmEnabled,
    hotjarEnabled,
    hotjarId,
    personyzeDomains,
    personyzeEnabled,
    personyzeId,
    spectrumId,
    spectrumEnabled,
    qualtricsId,
    qualtricsEnabled,
    siteimproveId,
    siteimproveEnabled,
  } = props?.data?.thirdPartySettings;
  const locationSettings = props?.data?.locationSettings;
  const widgetSettings = props?.data?.widgetSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];

  const headerSettings = props?.data?.headerSettings;
  const { footerUtilities, footerAppIcons, footerSocialIcons } =
    props?.data?.footerSettings;

  // const [data, setData] = useState(null);
  // const [length, setLength] = useState(null);
  // const [isLoading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const activeAlerts = props?.data?.cxAlerts?.nodes?.filter(alert => alert.displayPages.includes(databaseId.toString())) || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  return (
    <>
      
      <Head>
        <title>{`Locations - ${siteTitle}`}</title>
      </Head>
      {/* <SEO
				title={title}
				metaDesc={seo?.metaDesc}
				canonicalURL={seo?.canonical ? seo?.canonical : link} //I'm unsure about this. Changing the canonical URL in Yoast doesn't seem to do anything...
				ogLocale={seo?.locale} // Not sure where this is in the page object
				ogType={seo?.opengraphType}
				ogTitle={seo?.title}
				ogDescription={seo?.opengraphDescription}
				ogURL={seo?.opengraphUrl}
				breadcrumbs={seo?.breadcrumbs}
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
			/> */}
      
  <GTM
    id={gtmId}
    enabled={gtmEnabled} />
  <Personyze
    id={personyzeId}
    enabled={personyzeEnabled}
    domains={personyzeDomains} />
  {hotjarEnabled &&
  <HotJar
    id={hotjarId}
    enabled={hotjarEnabled} />
  }
  {clarityEnabled &&
  <Clarity
      id={clarityId}
      enabled={clarityEnabled} />
  }
        
    <isModalOpenContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      <modalContentContext.Provider value={{modalContent, setModalContent}}>
        {isModalOpen && modalContent &&
          <Modal />
        }
      {
        activeAlerts.length > 0 &&
        <Alert alerts={activeAlerts} />
      }
      <Loading />
      <Header
        title={siteTitle}
        description={siteDescription}
        logo={siteLogo}
        menuItems={primaryMenu}
        headerSettings={headerSettings}
      />
      <showDetailsContext.Provider value={{ showDetails, setShowDetails }}>
        <selectedLocationContext.Provider
          value={{ selectedLocation, setSelectedLocation }}
        >
          <div id="page" className="container site">
            <main className="content content-single">
              <article className="entry-content">
                <Container align="full" classNames={`no-margin`}>
                  <Columns classNames={`no-margin`}>
                    <Column>
                      <PageTitle heading="Locations & ATMs" />
                    </Column>
                  </Columns>
                </Container>
                <Container align="full">
                  <Columns classNames={`no-margin`}>
                    <Column>
                      <Locations location={location} locationSettings={locationSettings} siteLogo={siteLogo} />
                    </Column>
                  </Columns>
                </Container>
                {parseHtml(widgetSettings?.locationsSearch || "")}
              </article>
            </main>
          </div>
        </selectedLocationContext.Provider>
      </showDetailsContext.Provider>

      <Footer
        copyrightHolder={footerText}
        menuItems={footerMenu}
        logo={siteLogo}
        footerUtilities={footerUtilities}
        footerAppIcons={footerAppIcons}
        footerSocialIcons={footerSocialIcons}
      />
      </modalContentContext.Provider>
      </isModalOpenContext.Provider>
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

Page.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};

Page.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenuItemFragment}
  ${ThirdPartySettingsFragment}
  ${AlertFragment}
  query GetLocationPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
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

    locationSettings {
      autoLocate
      startLatlng
      searchRadius
      apiBrowserKey
      autoZoomLevel
      mapType
      distanceUnit
      zoomLevel
      urlLabel
      streetview
      startLatlng
      typeControl
      scrollwheel
      controlPosition
      markerIconProps
      startMarker
      storeMarker
    }
    widgetSettings {
      locationsSearch
    }

    cxAlerts: cXAlerts {
      edges {
        node {
          ...AlertsFragment
        }
      }
    }
    footerMenuItems: menuItems(
      where: { location: $footerLocation }
      first: 255
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    headerMenuItems: menuItems(
      where: { location: $headerLocation }
      first: 255
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

export function getStaticProps(ctx) {
  return getNextStaticProps(ctx, {
    Page,
    revalidate: process.env.NEXT_PUBLIC_PAGE_REVALIDATION
      ? parseInt(process.env.NEXT_PUBLIC_PAGE_REVALIDATION)
      : null,
  });
}
