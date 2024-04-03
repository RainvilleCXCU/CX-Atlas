import * as MENUS from "constants/menus";
import { BlogInfoFragment } from "../../../fragments/GeneralSettings";
import { AlertFragment } from '../../../fragments/Alerts';
import {
  ThirdPartySettingsFragment,
  GTM,
  HotJar,
  Personyze,
  Qualtrics,
  Spectrum,
  Siteimprove,
} from "components/ThirdParty";
import { Header, Footer, MenuNavigation } from "components";
import { parseHtml } from "lib/parser";
const Alert = dynamic(() => import('components/Alerts/Alert'), {ssr:false});
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
  const { query = {}, push, isReady } = useRouter();

  const location = query.location;

  console.log("QUERY");
  console.log(query);
  console.log(location);

  const [state, setState] = useContext(Store);

  const {
    title: siteTitle,
    description: siteDescription,
    logo: siteLogo,
    footerText: footerText,
    databaseId: databaseId,
  } = props?.data?.generalSettings;
  const {
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

  const [data, setData] = useState(null);
  const [length, setLength] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const activeAlerts = props?.data?.cxAlerts?.nodes?.filter(alert => alert.displayPages.includes(databaseId.toString())) || [];

  return (
    <>
      <Header
        title={siteTitle}
        description={siteDescription}
        logo={siteLogo}
        menuItems={primaryMenu}
        headerSettings={headerSettings}
      />
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
      <GTM id={gtmId} enabled={gtmEnabled} />
      <HotJar id={hotjarId} enabled={hotjarEnabled} />
      <Personyze
        id={personyzeId}
        enabled={personyzeEnabled}
        domains={personyzeDomains}
      />
        
      {
        activeAlerts.length > 0 &&
        <Alert alerts={activeAlerts} />
      }
      <Loading />
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
      <Qualtrics id={qualtricsId} enabled={qualtricsEnabled} />
      <Spectrum id={spectrumId} enabled={spectrumEnabled} />
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
  ${MenuNavigation.fragments.entry}
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
