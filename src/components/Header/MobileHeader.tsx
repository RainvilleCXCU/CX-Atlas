import Logo from "components/Logo";
interface MobileHeader {
  navOpen?: boolean;
  setNavOpen;
  isSearchExpanded?: boolean;
  setIsSearchExpanded?;
  setSearchTerm?;
  logo?;
  desktopLogo?;
  mobileLogo?;
  logoText?;
  showNav?;
}

export default function MobileHeader(props: MobileHeader) {
  const {
    isSearchExpanded,
    logo,
    desktopLogo,
    mobileLogo,
    logoText,
    setNavOpen,
    navOpen,
    setIsSearchExpanded,
    setSearchTerm,
    showNav = true,
  } = props;

  return (
    <div className="cx-inner-wrapper">
      <Logo logo={logo} title={logoText} desktopLogo={desktopLogo} mobileLogo={mobileLogo} />
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
