import { siteSettingsContext } from 'context/siteSettings';
import { Store } from 'context/store';
import { isAndroid, isIOS } from 'mobile-device-detect';
import { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

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

function AppLinksBanner({
    iosLogo = '/wp-content/uploads/apple-store.svg',
    androidLogo = '/wp-content/uploads/get-it-on-google-play.svg',
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
    
    const [state] = useContext(Store);
    const [cookies, setCookie ] = useCookies(['ismember']);
    const [isMember, setIsMember] = useState(false);
    const appLink = isIOS ? siteSettings.iosAppLink ? siteSettings.iosAppLink : iosAppLink : isAndroid ? androidAppLink ? androidAppLink : siteSettings.androidAppLink : '';
    const appLogo = isIOS ? siteSettings.iosAppLogo ? siteSettings.iosAppLogo : iosLogo : isAndroid ? androidLogo ? androidLogo : siteSettings.androidAppLogo : '';
    useEffect(() => {
        if(cookies.ismember === 'true') {
            setIsMember(true);
        }
    }, [cookies]);
  return (
    <>
        {isMember &&
            <div className="app-links" style={{textAlign:'center', padding : '1rem', backgroundColor: '#CCC'}}>
                {appLink !== '' && 
                    <>
                        Download the Connexus {isIOS ? 'iOS' : 'Android'} App
                        <a href={appLink} className={`${classNames}`}><img src={appLogo} alt={isIOS ? 'iOS' : 'Android'} /></a>
                    </>
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
        }
    </>
    )
}

export default AppLinksBanner;
