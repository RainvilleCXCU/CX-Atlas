import React from 'react';
import Link from 'next/link';
import { client, MenuLocationEnum } from 'client';
import MenuNavigation from '../Navigation/Navbar';
import UtilityNav from './UtilityNav';
import UtilityNavLinks from './UtilityNavLinks';
import SearchBar from './SearchBar';
import Logo from 'components/Logo';
import { useRouter } from 'next/router';
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

  return (
    <header className="cx-header">
      <section className="cx-header__util-nav cx-header__desktop">
        <div className="cx-header__wrapper">
          <Logo isH1={asPath === '/'}/>
          <UtilityNav />
        </div>
      </section>
      <section className="cx-header__main-nav">
        <div className="cx-header__wrapper">
          <nav className="navbar navbar-expand-lg navbar-default cx-nav cx-header__mobile">
            <SearchBar device="mobile" />
            <div className="cx-nav__collapse offcanvas offcanvas-end" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
              <button type="button" className="visually-hidden" data-bs-dismiss="offcanvas" aria-label="Close navigation"></button>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 cx-nav__navbar">
                <li className="nav-item cx-nav__item">
                  <a className="nav-link cx-nav__link cx-nav__link--primary" href="https://onlinebanking.connexuscu.org/Mobile/Authentication">Log in</a>
                </li>
                <li className="nav-item cx-nav__item">
                  <Link href="/pay-my-loan/" passHref className="nav-link cx-nav__link cx-nav__link--primary" >Pay my loan</Link>
                </li>
                <div className="accordion accordion-flush" id="cxNavAccordion">
                  <div className="accordion accordion-flush" id="cxNavAccordion">
                    <MenuNavigation device="Mobile" menuItems={links} />
                    <UtilityNavLinks device="mobile" />
                  </div>
                </div>
              </ul>
            </div>
          </nav>

          <nav className="navbar navbar-expand-lg navbar-default cx-nav cx-header__desktop">
            <div className="collapse navbar-collapse cx-nav__collapse" id="navbarSupportedContent">

              <MenuNavigation device="Desktop" menuItems={links} />
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
