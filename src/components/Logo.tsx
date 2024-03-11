import Link from 'next/link';
import Heading from './Heading';

export default function Logo({ isH1 = false, children = <></>, title = 'Connexus Credit Union', logo }) {
  return (
    <Link href="/" passHref className='navbar-brand cx-nav__logo'>
      {!isH1 ? <img src={logo} alt={title} /> : <Heading className='no-margin' level='h1'> <img src={logo} alt={title} /></Heading>}
    </Link>
  )
};