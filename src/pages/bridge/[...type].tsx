import { gql } from '@apollo/client';
import * as MENUS from '../../constants/menus';
import { BlogInfoFragment } from '../../fragments/GeneralSettings';
import { ThirdPartySettingsFragment, GTM, HotJar, Personyze, Qualtrics, Spectrum, Siteimprove } from '../../components/ThirdParty';
import {
  Header,
  Footer,
  MenuNavigation,
  SEO,
} from '../../components';
import {
    ApplyStartFragment,
    ApplyNowFragment,
    ApplyNowMinorFragment,
    ApplyNowMemberFragment
} from '../../fragments/ApplyWidgets';
import { parseHtml } from 'lib/parser';
import Alert from 'components/Alerts/Alert';
import Loading from 'components/common/loading';
import { GetServerSidePropsContext } from 'next';
import { getNextServerSideProps } from '@faustwp/core';
import apolloClient from 'apolloClient';

export default function Component(props) {

    const { product, type, minor, member, widget } = props;
    const { title: siteTitle, description: siteDescription, logo: siteLogo, footerText: footerText, databaseId: databaseId } =
      props?.data?.generalSettings;
    const { gtmId, gtmEnabled, hotjarEnabled, hotjarId, personyzeDomains, personyzeEnabled, personyzeId, spectrumId, spectrumEnabled, qualtricsId, qualtricsEnabled, siteimproveId, siteimproveEnabled } = props?.data?.thirdPartySettings;
    const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
    const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
    const { title, content, seo, link, featuredImage } = props?.data?.page ?? { title: '' };
    const headerSettings = props?.data?.headerSettings; 
    const { footerUtilities, footerAppIcons, footerSocialIcons } = props?.data?.footerSettings;
    
    widget ? widget?.replace(/account=none/gi, `account=${product.title.replace(' ', '-').toLowerCase()}`) : '';
    

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
			<Alert id={databaseId} />
			<Loading /> 
            <span id='cx-bridge'>
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
                            {parseHtml(widget?.toString() || '')}
                        </article>
                    </main>
                </div>
            </span>

        {/* <Footer copyrightHolder={footerText} menuItems={footerMenu} logo={siteLogo} footerUtilities={footerUtilities} footerAppIcons={footerAppIcons} footerSocialIcons={footerSocialIcons} /> */}
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

Component.variables = (props) => {
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
    query GetHomePageData(
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
  

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { req, res, query } = context;
    const $account = query.account?.toString().replace('-', ' ');
    const type = query.type[0] || '';
    const minor = query.minor || '';
    const member = query.member || '';
    
    

    const { data } = await apolloClient.query({
        query: gql`
        query Products {
            products(where: {title: "${$account}"}) {
              edges {
                node {
                    id
                    title
                    displayName
                    bookNowURL
                    accurateDate
                    loanBasedAmount
                    memberApplyNowURL
                    memberQuickApplyURL
                    memberQuickApplyMobileURL
                    minorMemberApplyNowURL
                    minorNonMemberApplyNowURL
                    nonMemberApplyNowURL
                    productPageURL
                }
              }
            }
          }
      `,
    });

    const product = data.products.edges[0]?.node;
    const productInfo = { 
        account: product.title,
        minor
    };
    let widgetData;
    let widgetHtml = '';
    if(type && type == 'start') {
        console.log(`Start ${JSON.stringify(productInfo)}`)
        widgetData = await apolloClient.query({
            query: gql`
            ${ApplyStartFragment}
            query getApplyStart($account: String, $minor: String){
                widgetSettings {
                    ...ApplyStartFragment
                }
            }`, 
                variables: productInfo
            });
        widgetHtml = widgetData.data.widgetSettings.applyStart
    } else if(minor == 'yes') {
        widgetData = await apolloClient.query({
            query: gql`
            ${ApplyNowMinorFragment}
            query getApplyNowMinor($account: String, $minor: String){
                widgetSettings {
                    ...ApplyNowMinorFragment
                }
            }`,variables: productInfo
            });
            widgetHtml = widgetData.data.widgetSettings.applyNowMinor
    } else if(member) {
        widgetData = await apolloClient.query({
            query: gql`
            ${ApplyNowMemberFragment}
            query ApplyNowMember($account: String, $minor: String) {
                widgetSettings {
                    ...ApplyNowMemberFragment
                }
            }`, variables: productInfo
            });
            widgetHtml = widgetData.data.widgetSettings.applyNowMember
    } else {
        console.log('DATA');
        widgetData = await apolloClient.query({
            query: gql`
            ${ApplyNowFragment}
            query getApplyNow($account: String, $minor: String) {
                widgetSettings {
                    ...ApplyNowFragment
                }
            }`, variables: productInfo
            });
            widgetHtml = widgetData.data.widgetSettings.applyNow
    }

    if (data.products.edges.length == 0) {
        console.log('No Product');
        return getNextServerSideProps(context, {
            Page: Component,
            redirect: {
                destination: `/open-an-account/`,
                permanent: false,
            }
        });
    } else if (product.minorMemberApplyNowURL == '' && type == 'start') {
        console.log('Minor accounts not available');
        return getNextServerSideProps(context, {
            Page: Component,
            redirect: {
                destination: `/apply-now/?account=${query.account}&minor=na`,
                permanent: false,
            }
        });
    } else if (!minor && product.minorMemberApplyNowURL != '' && type != 'start') {
        console.log('Start Over');
        return getNextServerSideProps(context, {
            Page: Component,
            redirect: {
                destination: `/apply-start/?account=${query.account}`,
                permanent: false,
            }
        });
    } else if (minor && type == 'start') {
        console.log('Start Over');
        return getNextServerSideProps(context, {
            Page: Component,
            redirect: {
                destination: `/apply-start/?account=${query.account}`,
                permanent: false,
            }
        });
    } else if (minor && minor == 'yes' && product.minorMemberApplyNowURL == '' && type == 'now') {
        console.log('Change Minor to now, not available');
        return getNextServerSideProps(context, {
            Page: Component,
            redirect: {
                destination: `/apply-now/?account=${query.account}&minor=no`,
                permanent: false,
            }
        });
    } else if (minor && minor != 'na' && product.minorMemberApplyNowURL == '' && type == 'now' && !member) {
        console.log('Change Minor to now, not available');
        return getNextServerSideProps(context, {
            Page: Component,
            redirect: {
                destination: `/apply-now/?account=${query.account}&minor=na`,
                permanent: false,
            }
        });
    } else {
        console.log('NO ELSE');
        
    }
    return getNextServerSideProps(context, {
        Page: Component,
        props: {
            product,
            type,
            minor,
            member,
            widget: widgetHtml
        }
    });
}