import Link from 'next/link';
import Heading from './Heading';
import Image from 'next/image';

export default function Logo({ isH1 = false, children = <></>, title = 'Connexus Credit Union', logo }) {
  return (
    <Link href="/" passHref className='navbar-brand cx-nav__logo'>
      {!isH1 ? <Image src={logo} alt={title} width="145" height="54" priority={true} /> : <Heading className='no-margin' level='h1'> <Image src={logo} alt={title} width="145" height="54" /></Heading>}
    </Link>
  )
};