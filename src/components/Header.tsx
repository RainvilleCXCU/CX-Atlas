import React, { Fragment } from 'react';
import styles from 'scss/components/Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { client, MenuLocationEnum } from 'client';
import MenuNavigation from './Navigation/Menu';

interface Props {
  title?: string;
  description?: string;
  logo?: string;
}

function Header({
  title = 'Headless by WP Engine',
  description,
  logo
}: Props): JSX.Element {


const { menuItems } = client.useQuery()
const links = menuItems({
    first: 255,
    where: { location: MenuLocationEnum.PRIMARY, parentDatabaseId: 0 },
  }).nodes;


  return (
    <header className="cx-header">
      <section className="cx-header__util-nav cx-header__desktop">
        <div className="cx-header__wrapper">
          <Link href="/">
            <a><img src={logo} alt={title} /></a>
          </Link>
          <ul className="cx-header__util-nav-list">
            <li>
              <form className="cx-search" role="search" action="/">
                <button type="button" className="cx-search-open">
                  <svg aria-hidden="true" focusable="false" width="15" height="15"
                    className="cx-search-open__icon" viewBox="0 0 15 15" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6.86384" cy="6.86384" r="5.24333" stroke="#323333" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11 11L14 14" stroke="#323333" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round" />
                  </svg>
                  <span className="cx-search-open__text"><span className="visually-hidden">Open site </span>
                    Search</span>
                </button>
                <div className="cx-search__input">
                  <input type="search" aria-label="Search" placeholder="Search" id="cxsearch" name="s" />
                </div>
                <button type="button" className="cx-search__clear">
                  clear<span className="visually-hidden"> current search</span>
                </button>
                <button type="button" className="cx-search__close">
                  <span className="visually-hidden">close search</span>
                </button>
                <button type="submit" className="visually-hidden cx-search__submit">
                  submit search
                </button>
              </form>
            </li>
            <li>
              <Link href="/about/branch-and-atm-locations/">
                <a className="cx-nav__link cx-nav__link--secondary">
                  <svg aria-hidden="true" focusable="false" className="cx-icon" width="24px" height="24px"
                    viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Iconly/Bold/Location" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g id="Location" transform="translate(3.500000, 2.000000)" fill="#000000"
                        fillRule="nonzero">
                        <path
                          d="M8.49344564,0 C13.1561184,0 17,3.71789185 17,8.31775805 C17,10.6356906 16.1570081,12.787628 14.7695,14.611575 C13.2388042,16.6235165 11.3521561,18.3764655 9.22854262,19.7524254 C8.74251142,20.0704162 8.3038733,20.0944155 7.77044902,19.7524254 C5.63473516,18.3764655 3.74808708,16.6235165 2.23050003,14.611575 C0.84198351,12.787628 0,10.6356906 0,8.31775805 C0,3.71789185 3.84388161,0 8.49344564,0 Z M8.49344564,5.77683196 C6.95165787,5.77683196 5.6942286,7.04779499 5.6942286,8.57675052 C5.6942286,10.1177057 6.95165787,11.3296704 8.49344564,11.3296704 C10.0362418,11.3296704 11.3057714,10.1177057 11.3057714,8.57675052 C11.3057714,7.04779499 10.0362418,5.77683196 8.49344564,5.77683196 Z">
                        </path>
                      </g>
                    </g>
                  </svg> ATMs &amp; Locations
                </a>
              </Link>
            </li>
            <li>
              <Link href="/about/contact-us/">
                <a className="cx-nav__link cx-nav__link--secondary">
                  <svg aria-hidden="true" focusable="false" className="cx-icon" width="24px" height="24px"
                    viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g id="Iconly/Bold/Message" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g id="Message" transform="translate(2.000400, 3.000000)" fill="#000000"
                        fillRule="nonzero">
                        <path
                          d="M14.939,0 C16.28,0 17.57,0.53 18.519,1.481 C19.469,2.43 20,3.71 20,5.05 L20,5.05 L20,12.95 C20,15.74 17.73,18 14.939,18 L14.939,18 L5.06,18 C2.269,18 0,15.74 0,12.95 L0,12.95 L0,5.05 C0,2.26 2.259,0 5.06,0 L5.06,0 Z M16.07,5.2 C15.86,5.189 15.66,5.26 15.509,5.4 L15.509,5.4 L11,9 C10.42,9.481 9.589,9.481 9,9 L9,9 L4.5,5.4 C4.189,5.17 3.759,5.2 3.5,5.47 C3.23,5.74 3.2,6.17 3.429,6.47 L3.429,6.47 L3.56,6.6 L8.11,10.15 C8.67,10.59 9.349,10.83 10.06,10.83 C10.769,10.83 11.46,10.59 12.019,10.15 L12.019,10.15 L16.53,6.54 L16.61,6.46 C16.849,6.17 16.849,5.75 16.599,5.46 C16.46,5.311 16.269,5.22 16.07,5.2 Z">
                        </path>
                      </g>
                    </g>
                  </svg> Contact Us
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <section className="cx-header__main-nav">
        <div className="cx-header__wrapper">
          <nav className="navbar navbar-expand-lg navbar-default cx-nav cx-header__mobile">
            <div className="cx-inner-wrapper">
              <Link href="/">
                <a className="cx-nav__logo">
                  {title}
                </a>
              </Link>
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
                  className="cx-navbar-toggler cx-collapsed"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
                  aria-label="Toggle navigation"
                  data-bs-backdrop="false"
                >
                  <span className="navbar-toggler-icon cx-navbar-toggler__line"></span>
                </button>
              </div>
            </div>
            <div className="modal cx-modal" id="searchModal" aria-labelledby="searchModalLabel" aria-hidden="true">
              <form className="modal-dialog cx-search-mobile" role="search" action="/">
                <div className="modal-content cx-search-mobile__content">
                  <div className="modal-header cx-search-mobile__header">
                    <Link href="/">
                      <a className="cx-nav__logo">
                      </a>
                    </Link>
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
            <div className="cx-nav__collapse offcanvas offcanvas-end" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
              <button type="button" className="visually-hidden" data-bs-dismiss="offcanvas" aria-label="Close navigation"></button>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 cx-nav__navbar">
                <li className="nav-item cx-nav__item">
                  <a className="nav-link cx-nav__link cx-nav__link--primary" href="https://onlinebanking.connexuscu.org/Mobile/Authentication">Log in</a>
                </li>
                <li className="nav-item cx-nav__item">
                  <Link href="/pay-my-loan/">
                    <a className="nav-link cx-nav__link cx-nav__link--primary" >Pay my loan</a>
                  </Link>
                </li>
                <div className="accordion accordion-flush" id="cxNavAccordion">
                  <div className="accordion accordion-flush" id="cxNavAccordion">
                    <MenuNavigation device="Mobile" menuItems={links} />
                    <li className="nav-item cx-nav__item cx-nav__item--no-border cx-nav__item--space-above">
                      <Link href="/about/branch-and-atm-locations/">
                        <a className="nav-link cx-nav__link cx-nav__link--secondary">
                          <svg aria-hidden="true" focusable="false" className="cx-icon" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g id="Iconly/Bold/Location" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                              <g id="Location" transform="translate(3.500000, 2.000000)" fill="#5B5C5C" fillRule="nonzero">
                                <path d="M8.49344564,0 C13.1561184,0 17,3.71789185 17,8.31775805 C17,10.6356906 16.1570081,12.787628 14.7695,14.611575 C13.2388042,16.6235165 11.3521561,18.3764655 9.22854262,19.7524254 C8.74251142,20.0704162 8.3038733,20.0944155 7.77044902,19.7524254 C5.63473516,18.3764655 3.74808708,16.6235165 2.23050003,14.611575 C0.84198351,12.787628 0,10.6356906 0,8.31775805 C0,3.71789185 3.84388161,0 8.49344564,0 Z M8.49344564,5.77683196 C6.95165787,5.77683196 5.6942286,7.04779499 5.6942286,8.57675052 C5.6942286,10.1177057 6.95165787,11.3296704 8.49344564,11.3296704 C10.0362418,11.3296704 11.3057714,10.1177057 11.3057714,8.57675052 C11.3057714,7.04779499 10.0362418,5.77683196 8.49344564,5.77683196 Z"></path>
                              </g>
                            </g>
                          </svg> Find ATMs &amp; Locations
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item cx-nav__item cx-nav__item--no-border">
                      <Link href="/services/contact-us/">
                        <a className="nav-link cx-nav__link cx-nav__link--secondary">
                          <svg aria-hidden="true" focusable="false" className="cx-icon" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g id="Iconly/Bold/Message" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                              <g id="Message" transform="translate(2.000400, 3.000000)" fill="#5B5C5C" fillRule="nonzero">
                                <path d="M14.939,0 C16.28,0 17.57,0.53 18.519,1.481 C19.469,2.43 20,3.71 20,5.05 L20,5.05 L20,12.95 C20,15.74 17.73,18 14.939,18 L14.939,18 L5.06,18 C2.269,18 0,15.74 0,12.95 L0,12.95 L0,5.05 C0,2.26 2.259,0 5.06,0 L5.06,0 Z M16.07,5.2 C15.86,5.189 15.66,5.26 15.509,5.4 L15.509,5.4 L11,9 C10.42,9.481 9.589,9.481 9,9 L9,9 L4.5,5.4 C4.189,5.17 3.759,5.2 3.5,5.47 C3.23,5.74 3.2,6.17 3.429,6.47 L3.429,6.47 L3.56,6.6 L8.11,10.15 C8.67,10.59 9.349,10.83 10.06,10.83 C10.769,10.83 11.46,10.59 12.019,10.15 L12.019,10.15 L16.53,6.54 L16.61,6.46 C16.849,6.17 16.849,5.75 16.599,5.46 C16.46,5.311 16.269,5.22 16.07,5.2 Z"></path>
                              </g>
                            </g>
                          </svg> Contact Us
                        </a>
                      </Link>
                    </li>

                  </div>
                </div>
              </ul>
            </div>
          </nav>

          <nav className="navbar navbar-expand-lg navbar-default cx-nav cx-header__desktop">
            <div className="collapse navbar-collapse cx-nav__collapse" id="navbarSupportedContent">

              <MenuNavigation device="Desktop" menuItems={links} />
              <div>

                <Link href="/pay-my-loan/">
                  <a className="cx-button cx-button--compact cx-button--text" type="button">Pay my loan</a>
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
