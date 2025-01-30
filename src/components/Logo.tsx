import Link from 'next/link';
import Heading from './Heading';
import Image from 'next/image';

export default function Logo({ 
  isH1 = false, 
  title = 'Connexus Credit Union',
  width = 300,
  height = 60,  
  logo,
  desktopLogo,
  desktopLogoWidth,
  mobileLogo,
  mobileLogoWidth }) {
    const desktopLogoToUse = (desktopLogo && desktopLogo !== '') ? desktopLogo : logo;
    const desktopLogoWidthToUse = (desktopLogoWidth && desktopLogoWidth !== '') ? desktopLogoWidth : width;
    const mobileLogoToUse = (mobileLogo && mobileLogo !== '') ? mobileLogo : logo;
    const mobileLogoWidthToUse = (mobileLogoWidth && mobileLogoWidth !== '') ? mobileLogoWidth : desktopLogoWidthToUse;
  return (
    <Link href="/" passHref className='navbar-brand cx-nav__logo' title={title}>
      {!isH1 ? 
        <>
        <Image className='cx-hidden__desktop' src={mobileLogoToUse} alt={title} width={mobileLogoWidthToUse} height={60} priority={true} /> 
        <Image className='cx-hidden__mobile cx-hidden__tablet' src={desktopLogoToUse} alt={title} width={desktopLogoWidthToUse} height={height} priority={true} />
        </> : 
        <Heading className='no-margin' level='h1'>
          <Image className='cx-hidden__desktop' src={mobileLogoToUse} alt={title} width={mobileLogoWidthToUse} height={60} priority={true} />
          <Image className='cx-hidden__mobile cx-hidden__tablet' src={desktopLogoToUse} alt={title} width={desktopLogoWidthToUse} height={height} priority={true} />
        </Heading>
      }
    </Link>
  )
};
