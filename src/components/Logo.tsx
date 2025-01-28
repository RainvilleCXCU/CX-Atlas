import Link from 'next/link';
import Heading from './Heading';
import Image from 'next/image';

export default function Logo({ 
  isH1 = false, 
  title = 'Connexus Credit Union',
  width = 220,
  height = 60,  
  logo }) {
  return (
    <Link href="/" passHref className='navbar-brand cx-nav__logo' title={title + ' - Celebrating 90 Years (1935-2025)'}>
      {!isH1 ? <Image src={logo} alt={title + ' - Celebrating 90 Years (1935-2025)'} width={width} height={height} priority={true} /> : <Heading className='no-margin' level='h1'> <Image src={logo} alt={title} width={width} height={height} priority={true} /></Heading>}
    </Link>
  )
};
