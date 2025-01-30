import { isAndroid, isIOS } from 'mobile-device-detect';

export interface Props {
    iosLogo?
    androidLogo?
    qrCode?
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
    qrCode ='/images/appsQRCode.png',
    appOpeningText = 'The App is available on the ',
  attribs,
  children = <></>,
  classNames = "",
}: Props): JSX.Element {

 const appLink = isIOS ? iosAppLink : isAndroid ? androidAppLink : '';
    
  return (
    <div className="app-links">
        
        {appLink !== '' && 
            <a href={appLink} className={`cx-button cx-button--outlined-positive cx-button--icon cx-button--icon-right cx-button--icon-right-arrow cx-button--icon-right-arrow-positive ${classNames}`}>Download App</a>
        }

        {!isIOS && !isAndroid && 
            <div className='cx-text--small'>
                {appOpeningText}
                <img src={iosLogo} height={24} width={20} alt='iOS' /> and <img src={androidLogo} height={24} width={24} alt='Android' />
                <img src={qrCode} className='cx-margin--horizontal' />
            </div>
        }

    </div>
    )
}

export default AppLinks;
