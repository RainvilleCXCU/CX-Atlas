import Logo from "components/Logo";

interface CTAProps {
  buttonColor: string;
  ctaButtonType: string;
  ctaLink: string;
  ctaText: string;
  compact: boolean;
}
interface MobileHeader {
  navOpen?: boolean;
  setNavOpen;
  isSearchExpanded?: boolean;
  setIsSearchExpanded?;
  setSearchTerm?;
  logo?;
  desktopLogo?;
  desktopLogoWidth?;
  mobileLogo?;
  mobileLogoWidth?;
  logoText?;
  showNav?;
  template?: string;
  ctas?: Array<CTAProps>
}

export default function MobileHeader(props: MobileHeader) {
  const {
    isSearchExpanded,
    logo,
    desktopLogo,
    desktopLogoWidth,
    mobileLogo,
    mobileLogoWidth,
    logoText,
    setNavOpen,
    navOpen,
    setIsSearchExpanded,
    setSearchTerm,
    showNav = true,
    template,
    ctas
  } = props;

  return (
    <div className="cx-inner-wrapper">
      <Logo logo={logo} title={logoText} desktopLogo={desktopLogo} mobileLogo={mobileLogo} desktopLogoWidth={desktopLogoWidth} mobileLogoWidth={mobileLogoWidth} />
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

      

      {
          template && template.toLowerCase() === 'cta header' && 
            <section className='cx-header__cta'>
              {ctas.map((cta, index) => (
                <a href={cta.ctaLink} className={`cx-button cx-button--${cta.ctaButtonType}${cta.buttonColor}${cta.compact ? ' cx-button--compact' : ''}`}>{cta.ctaText}</a>
              ))}
            </section>
        }
    </div>
  );
}
