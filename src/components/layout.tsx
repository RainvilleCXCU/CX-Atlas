
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
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
const SEO = dynamic(()=> import('components/SEO/SEO'));
import dynamic from 'next/dynamic';
const Alert = dynamic(() => import('components/Alerts/Alert'), {ssr:false});
const Loading = dynamic(() => import('components/common/loading'), {ssr:false});
interface BaseLayoutProps {
    props?
    children
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ props, children = <></> }) => {
    const { description: siteDescription = '', logo: siteLogo = '', footerText: footerText = '' } = props?.data?.generalSettings ?? {
        description: '',
        logo: '',
        footerText: ''
    };
    const { gtmId, gtmEnabled, hotjarEnabled, hotjarId, personyzeDomains, personyzeEnabled, personyzeId, spectrumId, spectrumEnabled, qualtricsId, qualtricsEnabled, siteimproveId, siteimproveEnabled } = props?.data?.thirdPartySettings;
    const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
    const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
    const { title = '', content, seo = {}, link = '', featuredImage, databaseId = '' } = props?.data?.page ?? props?.data?.post ?? {
        title: '',
        seo: {},
        link: '',
        databaseId: ''
    };
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
            breadcrumbs={seo?.breadcrumbs}
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
        <Personyze
            id={personyzeId}
            enabled={personyzeEnabled}
            domains={personyzeDomains} />
        {hotjarEnabled &&
        <HotJar
            id={hotjarId}
            enabled={hotjarEnabled} />
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
                    {children}
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
};

export default BaseLayout;


