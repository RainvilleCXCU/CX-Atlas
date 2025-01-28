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
  mobileLogo}) {
    const desktopLogoToUse = (desktopLogo && desktopLogo !== '') ? desktopLogo : logo;
    const mobileLogoToUse = (mobileLogo && mobileLogo !== '') ? mobileLogo : logo;
  return (
    <Link href="/" passHref className='navbar-brand cx-nav__logo' title={title}>
      {!isH1 ? 
        <>
        <Image className='cx-hidden__desktop' src={mobileLogoToUse} alt={title} width={mobileLogo && mobileLogo !== '' ? 157 : width} height={60} priority={true} /> 
        <Image className='cx-hidden__mobile cx-hidden__tablet' src={desktopLogoToUse} alt={title} width={width} height={height} priority={true} />
        </> : 
        <Heading className='no-margin' level='h1'>
          <Image className='cx-hidden__desktop' src={mobileLogoToUse} alt={title} width={157} height={60} priority={true} />
          <Image className='cx-hidden__mobile cx-hidden__tablet' src={desktopLogoToUse} alt={title} width={width} height={height} priority={true} />
        </Heading>
      }
    </Link>
  )
};
