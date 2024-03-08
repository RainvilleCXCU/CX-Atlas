import { gql } from "graphql-tag";
import * as MENUS from "../../constants/menus";
import { BlogInfoFragment } from "../../fragments/GeneralSettings";
import {
  ThirdPartySettingsFragment,
  GTM,
  HotJar,
  Personyze,
  Qualtrics,
  Spectrum,
  Siteimprove,
} from "../../components/ThirdParty";
import { Header, Footer, MenuNavigation, SEO } from "../../components";
import { parseHtml } from "lib/parser";
import Alert from "components/Alerts/Alert";
import Loading from "components/common/loading";
import { useContext, useEffect } from "react";
import { Store } from "context/store";
import { useRouter } from "next/router";
import { getNextServerSideProps } from "@faustwp/core";
import { GetServerSidePropsContext } from "next";

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { query = {}, isReady } = useRouter();
  const { catId, page = "1" } = query;
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
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { title, content, seo, link, featuredImage } = props?.data?.page ?? {
    title: "",
  };
  const headerSettings = props?.data?.headerSettings;
  const { footerUtilities, footerAppIcons, footerSocialIcons } =
    props?.data?.footerSettings;

    // const productName = product && product !== ':path*' ? product.charAt(0).toUpperCase() + product.slice(1) : '';
    const productName = props.product && props.product !== ':path*' ? props.product.split('-').map(word => { 
        return word.charAt(0).toUpperCase() + word.slice(1)
    }).join(' ') : null;

  return (
    <>
      <SEO
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
      />
      <GTM id={gtmId} enabled={gtmEnabled} />
      <HotJar id={hotjarId} enabled={hotjarEnabled} />
      <Personyze
        id={personyzeId}
        enabled={personyzeEnabled}
        domains={personyzeDomains}
      />
      <Alert id={databaseId} />
      <Loading />
      <Header
        title={title}
        description={siteDescription}
        logo={siteLogo}
        menuItems={primaryMenu}
        headerSettings={headerSettings}
        showButtons={false}
        showNavigation={false}
        showSearch={false}
        showUtilityNav={false}
      />

      <div id="page" className="container site">
          <main id="main" className="content content-single">
              <article className="entry-content">
                {parseHtml(content ?? "")}
            </article>
        </main>
      </div>

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
      <Siteimprove id={siteimproveId} enabled={siteimproveEnabled} />
    </>
  );
}
Component.variables = (params) => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION
  };
};

Component.query = gql`
  ${BlogInfoFragment}
  ${MenuNavigation.fragments.entry}
  ${ThirdPartySettingsFragment}
  ${Alert.fragments.entry}
  query GetMediaCenterData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    page(id: "/meet/", idType: URI) {
      title
      content
    }
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { req, res, query } = context;
    const product = query.productType || '';
    const productFilters = query.productFilters || '';

    return getNextServerSideProps(context, {
        Page: Component,
        props: {
            product,
            productFilters
        }
    });
}


