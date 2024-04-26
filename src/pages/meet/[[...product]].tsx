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
// const Header = dynamic(()=> import('components/Header/Header'));
// const Footer = dynamic(() => import('components/Footer/Footer'));
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
// const SEO = dynamic(()=> import('components/SEO/SEO'));
import { parseHtml } from "lib/parser";
const Alert = dynamic(() => import('components/Alerts/Alert'), {ssr:false});
import Modal from 'components/Modal/modal';
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
  const headerSettings = props?.data?.headerSettings;
  const { footerUtilities, footerAppIcons, footerSocialIcons } =
    props?.data?.footerSettings;

  const { scheduler } = props?.data?.widgetSettings;
  const activeAlerts = props?.data?.cxAlerts?.nodes?.filter(alert => alert.displayPages.includes(databaseId.toString())) || [];

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
        
    <isModalOpenContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      <modalContentContext.Provider value={{modalContent, setModalContent}}>
      <Modal />
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


