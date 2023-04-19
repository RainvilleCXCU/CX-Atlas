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

            <div className="cx-inner-wrapper">
              <Logo />
              <div className="cx-nav__mobile-buttons">
                <button
                  className="cx-search-mobile__toggler"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#searchModal"
                  data-bs-backdrop="false"
                >
                  <svg aria-hidden="true" focusable="false" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.25 16.8578H18.065L17.645 16.4528C19.115 14.7428 20 12.5228 20 10.1078C20 4.72279 15.635 0.357788 10.25 0.357788C4.865 0.357788 0.5 4.72279 0.5 10.1078C0.5 15.4928 4.865 19.8578 10.25 19.8578C12.665 19.8578 14.885 18.9728 16.595 17.5028L17 17.9228V19.1078L24.5 26.5928L26.735 24.3578L19.25 16.8578ZM10.25 16.8578C6.515 16.8578 3.5 13.8428 3.5 10.1078C3.5 6.37279 6.515 3.35779 10.25 3.35779C13.985 3.35779 17 6.37279 17 10.1078C17 13.8428 13.985 16.8578 10.25 16.8578Z" fill="#323232" />
                  </svg>
                  <span className="sr-only">Open site search</span>
                </button>
                <button
                  className={`cx-navbar-toggler${navOpen ? '' : ' cx-collapsed'}`}
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
                  aria-label="Toggle navigation"
                  data-bs-backdrop="false"
                  onClick={() => {
                    setNavOpen(!navOpen);
                  }}
                >
                  <span className="navbar-toggler-icon cx-navbar-toggler__line"></span>
                </button>
              </div>
            </div>
            <div className="modal cx-modal" id="searchModal" aria-labelledby="searchModalLabel" aria-hidden="true">
              <form className="modal-dialog cx-search-mobile" role="search" action="/">
                <div className="modal-content cx-search-mobile__content">
                  <div className="modal-header cx-search-mobile__header">
                    <Logo />
                    <h5 className="modal-title visually-hidden" id="searchModalLabel">Site search</h5>
                    <button className="cx-search-mobile__close" type="button" data-bs-dismiss="modal" aria-label="Close search">
                      <span className="navbar-toggler-icon cx-navbar-toggler__line"></span>
                    </button>
                    <button className="cx-search-mobile__close--anim cx-collapsed" type="button" data-bs-dismiss="modal" aria-label="Close search">
                      <span className="navbar-toggler-icon cx-navbar-toggler__line"></span>
                    </button>
                  </div>
                  <div className="modal-body cx-search-mobile__body">
                    <div className="cx-search-mobile__input">
                      <input type="search" aria-label="Search" placeholder="Search the site..." id="cxMobileSearch" name="s" />
                    </div>
                    <button type="button" className="cx-search-mobile__clear">
                      clear<span className="visually-hidden"> current search</span>
                    </button>
                    <button type="submit" className="cx-search-mobile__submit">
                      <svg className="cx-search-mobile__icon" aria-hidden="true" focusable="false" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.25 16.8578H18.065L17.645 16.4528C19.115 14.7428 20 12.5228 20 10.1078C20 4.72279 15.635 0.357788 10.25 0.357788C4.865 0.357788 0.5 4.72279 0.5 10.1078C0.5 15.4928 4.865 19.8578 10.25 19.8578C12.665 19.8578 14.885 18.9728 16.595 17.5028L17 17.9228V19.1078L24.5 26.5928L26.735 24.3578L19.25 16.8578ZM10.25 16.8578C6.515 16.8578 3.5 13.8428 3.5 10.1078C3.5 6.37279 6.515 3.35779 10.25 3.35779C13.985 3.35779 17 6.37279 17 10.1078C17 13.8428 13.985 16.8578 10.25 16.8578Z" fill="#323232" />
                      </svg>
                      <span className="visually-hidden">submit search</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
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
