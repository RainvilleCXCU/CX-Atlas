
// const GTM = dynamic(() => import('components/ThirdParty/gtm'), {ssr:true});
// const Personyze = dynamic(() => import('components/ThirdParty/personyze'), {ssr:true});
// const HotJar = dynamic(() => import('components/ThirdParty/hotjar'), {ssr:true});
// const Qualtrics = dynamic(() => import('components/ThirdParty/qualtrics'), {ssr:true});
// const Spectrum = dynamic(() => import('components/ThirdParty/spectrum'), {ssr:true});
// const Siteimprove = dynamic(() => import('components/ThirdParty/siteimprove'), {ssr:true});
// const Clarity = dynamic(() => import('components/ThirdParty/clarity'), {ssr:true});

import GTM from 'components/ThirdParty/gtm';
import Personyze from 'components/ThirdParty/personyze';
import HotJar from 'components/ThirdParty/hotjar';
import Qualtrics from 'components/ThirdParty/qualtrics';
import Spectrum from 'components/ThirdParty/spectrum';
import Siteimprove from 'components/ThirdParty/siteimprove';
import Clarity from 'components/ThirdParty/clarity';

// import {
//   Header,
//   MenuNavigation,
//   SEO,
// } from '../components';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
// const SEO = dynamic(()=> import('components/SEO/SEO'), {ssr:true});
import SEO from './SEO/SEO';
import dynamic from 'next/dynamic';
import Alert from 'components/Alerts/Alert';
import Loading from 'components/common/loading';
import { m } from 'framer-motion';
// const Alert = dynamic(() => import('components/Alerts/Alert'), {ssr:true});
// const Loading = dynamic(() => import('components/common/loading'), {ssr:true});
interface BaseLayoutProps {
    props?
    pageTitle?
    children
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ props, children = <></>, pageTitle }) => {
    const { description: siteDescription = '', logo: siteLogo = '', desktopLogo: siteDesktopLogo = '', mobileLogo: siteMobileLogo = '', desktopLogoWidth: siteDesktopLogoWidth = '', mobileLogoWidth: siteMobileLogoWidth = '', logoTitleText: siteLogoText = '', footerText: footerText = '' } = props?.data?.generalSettings ?? {
        description: '',
        logo: '',
        desktopLogo: '',
        desktopLogoWidth: '',
        mobileLogo: '',
        mobileLogoWidth: '',
        footerText: '',
        logoTitleText: ''
    };
    const { clarityId, clarityEnabled, gtmId, gtmEnabled, hotjarEnabled, hotjarId, personyzeDomains, personyzeEnabled, personyzeId, spectrumId, spectrumEnabled, qualtricsId, qualtricsEnabled, siteimproveId, siteimproveEnabled } = props?.data?.thirdPartySettings;
    const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
    const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
    let { title = '', content, seo = {}, link = '', featuredImage, databaseId = '' } = props?.data?.page ?? props?.data?.post ?? {
        title: '',
        seo: {},
        link: '',
        databaseId: ''
    };
    const headerSettings = props?.data?.headerSettings; 
    const { footerUtilities, footerAppIcons, footerSocialIcons } = props?.data?.footerSettings;
    const Alerts = props?.data?.cxAlerts?.nodes?.filter(alert => alert.displayPages.includes(databaseId.toString())) || [];
    const activeAlerts = Alerts.filter(alert => alert.active == true);
    title = pageTitle ? pageTitle : title;
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
            metaRobotsNoindex={seo?.metaRobotsNoindex}
            metaRobotsNofollow={seo?.metaRobotsNofollow}
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
        {clarityEnabled &&
        <Clarity
            id={clarityId}
            enabled={clarityEnabled} />
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
                        logoText={siteLogoText}
                        desktopLogo={siteDesktopLogo}
                        desktopLogoWidth={siteDesktopLogoWidth}
                        mobileLogo={siteMobileLogo}
                        mobileLogoWidth={siteMobileLogoWidth}
                        menuItems={primaryMenu}
                        headerSettings={headerSettings}
                    />
                    {children}
            {footerMenu &&
                    <Footer copyrightHolder={footerText} menuItems={footerMenu} logo={siteLogo} logoText={siteLogoText} footerUtilities={footerUtilities} footerAppIcons={footerAppIcons} footerSocialIcons={footerSocialIcons} />
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


