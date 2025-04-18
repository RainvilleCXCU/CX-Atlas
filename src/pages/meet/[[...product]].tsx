import { gql } from '@apollo/client';
import * as MENUS from "../../constants/menus";
import { BlogInfoFragment } from "../../fragments/GeneralSettings";
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
import { getNextServerSideProps } from "@faustwp/core";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { AlertFragment } from 'fragments/Alerts';
import dynamic from 'next/dynamic';
import { useState } from 'react';

export default function Component(props) {

  const {
    title: siteTitle,
    description: siteDescription,
    logo: siteLogo,
    desktopLogo: siteDesktopLogo,
    desktopLogoWidth: siteDesktopLogoWidth,
    mobileLogo: siteMobileLogo,
    mobileLogoWidth: siteMobileLogoWidth,
    logoTitleText: siteLogoText,
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
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const headerSettings = props?.data?.headerSettings;
  const { footerUtilities, footerAppIcons, footerSocialIcons } =
    props?.data?.footerSettings;

  const { scheduler } = props?.data?.widgetSettings;
  const getActiveAlerts = () => {
    const now = new Date();
    // Get alerts for the current page
    const pageAlerts = props?.data?.cxAlerts?.nodes?.filter(alert => alert.displayPages.includes(databaseId.toString())) || [];
    // Get alerts that have "active" selected
    const activeAlerts = pageAlerts.filter(alert => alert.active == true);
    // Get alerts that are within the start and end date
    const alertsWithinDates = activeAlerts.filter(alert => {
        // Replace space with T to make it a valid date string
        const formattedStart = alert.startDate.replace(" ", "T");
        const formattedEnd = alert.endDate.replace(" ", "T");
        // Convert to Date object
        const startDate = new Date(formattedStart);
        const endDate = new Date(formattedEnd);
        // Check if current date is within the start and end date
        if (startDate < now && endDate > now) {
            return alert;
        }
    });
    return alertsWithinDates;
  };
  const activeAlerts = getActiveAlerts();
    // const productName = product && product !== ':path*' ? product.charAt(0).toUpperCase() + product.slice(1) : '';
    const productName = props.product && props.product !== ':path*' ? props.product.split('-').map(word => { 
        return word.charAt(0).toUpperCase() + word.slice(1)
    }).join(' ') : null;
  const title = `Schedule a Call${productName ? ' about ' : ''}${productName ? productName.replace('-', ' ') : ''} - ${siteTitle}`;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  return (
    <>
		<Head>
			<title>{`${title}`}</title></Head>
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
        title={title}
        description={siteDescription}
        logo={siteLogo}
        desktopLogo={siteDesktopLogo}
        desktopLogoWidth={siteDesktopLogoWidth}
        mobileLogo={siteMobileLogo}
        mobileLogoWidth={siteMobileLogoWidth}
        logoText={siteLogoText}
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
                        {parseHtml(scheduler?.toString() || '')}
            </article>
        </main>
      </div>

      <Footer
        copyrightHolder={footerText}
        menuItems={footerMenu}
        logo={siteLogo}
        desktopLogo={siteDesktopLogo}
        mobileLogo={siteMobileLogo}
        desktopLogoWidth={siteDesktopLogoWidth}
        mobileLogoWidth={siteMobileLogoWidth}
        logoText={siteLogoText}
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
Component.variables = (params) => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION
  };
};

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenuItemFragment}
  ${ThirdPartySettingsFragment}
  ${AlertFragment}
  query GetMediaCenterData(
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
    widgetSettings {
      scheduler
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
            productFilters,
            query
        }
    });
}


