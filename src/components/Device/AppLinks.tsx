import { siteSettingsContext } from 'context/siteSettings';
import { useContext, useState } from 'react';
import Bowser from "bowser";

export interface Props {
    iosLogo?
    androidLogo?
    qrCode?
    showQRCode?
    appOpeningText?
    androidAppLink?
    iosAppLink?
    attribs?
    children?;
    classNames?;
}

function AppLinks({
    iosLogo = '/images/logos/apple_logo_black.svg',
    androidLogo = '/images/logos/android-logo.svg',
    androidAppLink = 'https://play.google.com/store/apps/details?id=com.alkamitech.connexus',
    iosAppLink = 'https://apple.co/3qSq3u6',
    showQRCode = true,
    qrCode ='/images/appsQRCode.svg',
    appOpeningText = 'App is available on the ',
    attribs,
    children = <></>,
    classNames = "",
}: Props): JSX.Element {

    const { siteSettings } = useContext(siteSettingsContext);
    
    const browser = Bowser.getParser(window.navigator.userAgent);
    const isIOS = browser.getOSName().toLowerCase().includes('ios');
    const isAndroid = browser.getOSName().toLowerCase().includes('android');


    const appLink = isIOS ? siteSettings.iosAppLink ? siteSettings.iosAppLink : iosAppLink : isAndroid ? androidAppLink ? androidAppLink : siteSettings.androidAppLink : '';
    
  return (
    <div className="app-links">
        {appLink !== '' && 
            <a href={appLink} className={`cx-button cx-button--outlined-positive cx-button--icon cx-button--icon-right cx-button--icon-right-arrow cx-button--icon-right-arrow-positive ${classNames}`}>Download App</a>
        }

        {!isIOS && !isAndroid && 
            <div className='cx-text--small'>
                {appOpeningText}
                <img src={iosLogo} height={24} width={20} alt='iOS' /> and <img src={androidLogo} height={24} width={24} alt='Android' />
                {showQRCode && 
                    <>or <img src={qrCode ? qrCode : siteSettings?.appQRCode} className='cx-margin--horizontal' /></>
                }
            </div>
        }

    </div>
    )
}

export default AppLinks;
