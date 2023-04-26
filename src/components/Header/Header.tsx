import React, { useState } from 'react';
import Link from 'next/link';
import { client, MenuLocationEnum } from 'client';
import MenuNavigation from '../Navigation/Navbar';
import UtilityNav from './UtilityNav';
import UtilityNavLinks from './UtilityNavLinks';
import SearchBar from './SearchBar';
import Logo from 'components/Logo';
import { useRouter } from 'next/router';
import MobileNav from './MobileNav';
interface Props {
  title?: string;
  description?: string;
  logo?: string;
}

function Header({
  title = '',
  description,
  logo
}: Props): JSX.Element {

  const { asPath, pathname } = useRouter();
  const { menuItems } = client.useQuery()
  const links = menuItems({
    first: 255,
    where: { location: MenuLocationEnum.PRIMARY },
  }).nodes;

  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className={`cx-header${navOpen ? ' nav-open' : ''}`}>
      <section className="cx-header__util-nav cx-header__desktop">
        <div className="cx-header__wrapper">
          <Logo isH1={asPath === '/'} />
          <UtilityNav />
        </div>
      </section>
      <section className="cx-header__main-nav">
        <div className="cx-header__wrapper">
          <nav className="navbar navbar-expand-lg navbar-default cx-nav cx-header__mobile">
            <SearchBar device="mobile" setNavOpen={setNavOpen} navOpen={navOpen} />
            <MobileNav links={links} menuOpen={navOpen} navOpen={navOpen} setNavOpen={setNavOpen} />
          </nav>


          <nav className="navbar navbar-expand-lg navbar-default cx-nav cx-header__desktop">
            <div className="collapse navbar-collapse cx-nav__collapse" id="navbarSupportedContent">

              <MenuNavigation device="Desktop" menuItems={links} menuOpen={false} setNavOpen={setNavOpen} />
              <div>
                <Link href="/pay-my-loan/" passHref className="cx-button cx-button--compact cx-button--text" type="button">Pay my loan
                </Link>
                <a href="https://onlinebanking.connexuscu.org/Authentication" className="cx-button cx-button--compact">Log in</a>
              </div>
            </div>
          </nav>
        </div>
      </section >
    </header >
  );
}

export default Header;
