import Logo from "components/Logo";
interface MobileHeader {
  navOpen?: boolean;
  setNavOpen;
  isSearchExpanded?: boolean;
  setIsSearchExpanded?;
  setSearchTerm?;
  logo?;
  logoText?;
  showNav?;
}

export default function MobileHeader(props: MobileHeader) {
  const {
    isSearchExpanded,
    logo,
    logoText,
    setNavOpen,
    navOpen,
    setIsSearchExpanded,
    setSearchTerm,
    showNav = true,
  } = props;

  return (
    <div className="cx-inner-wrapper">
      <Logo logo={logo} title={logoText} />
      {showNav && (
        <div className="cx-nav__mobile-buttons">
          {!navOpen && (
            <a
              href="/mdr?loc=LStUVVkwNi1DO1c1Tj0nLTYsQGBgCmAK&login=mobile"
              className="cx-button cx-button--compact cx-button--color-positive"
            >
              Log in
            </a>
          )}
          <button
            className={`cx-navbar-toggler${
              props.navOpen || isSearchExpanded ? "" : " cx-collapsed"
            }`}
            type="button"
            aria-controls="offcanvasRight"
            aria-label="Toggle navigation"
            onClick={() => {setNavOpen(!navOpen)}}
          >
            <span className="navbar-toggler-icon cx-navbar-toggler__line"></span>
          </button>
        </div>
      )}
    </div>
  );
}
