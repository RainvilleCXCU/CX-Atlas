import SearchBar from './SearchBar';
import MobileNav from './MobileNav';
import MenuNavigation from 'components/Navigation/Navbar';
import Link from 'next/link';
import { trackMember } from 'utils/tracking';
interface NavigationProps {
    navOpen?: boolean,
    setNavOpen,
    menuItems?: boolean,
    headerSettings?,
    showButtons?
    logo?
    desktopLogo?
    desktopLogoWidth?
    mobileLogo?
    mobileLogoWidth?
    logoText,
    showNavigation?
    showSearch?
    template?
    ctas?
}

export default function Navigation(props: NavigationProps) {
    const { showNavigation, showButtons, logo, desktopLogo, mobileLogo, desktopLogoWidth, mobileLogoWidth, logoText, setNavOpen, navOpen, headerSettings, menuItems, showSearch, template, ctas } = props;

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-default cx-nav cx-header__mobile">
                <SearchBar template={template} ctas={ctas} showNavigation={showNavigation} logoText={logoText} logo={logo} desktopLogo={desktopLogo} mobileLogo={mobileLogo} desktopLogoWidth={desktopLogoWidth} mobileLogoWidth={mobileLogoWidth} device="mobile" setNavOpen={setNavOpen} navOpen={navOpen} showSearch={showSearch} />
              
                <MobileNav showNavigation={showNavigation} headerSettings={headerSettings} links={menuItems} menuOpen={navOpen} navOpen={navOpen} setNavOpen={setNavOpen} />
              
            </nav>


            {(showNavigation || showButtons) &&
              <nav className="navbar navbar-expand-lg navbar-default cx-nav cx-header__desktop">
                <div className="collapse navbar-collapse cx-nav__collapse" id="navbarSupportedContent">
                  {showNavigation &&
                    <MenuNavigation device="Desktop" menuItems={menuItems} menuOpen={false} setNavOpen={setNavOpen} /> || <div></div>
                  }
                  {showButtons &&
                    <div>
                      <Link href="/pay-my-loan/" prefetch={false} className="cx-button cx-button--compact cx-button--text cx-button--outlined-positive" type="button" onClick={trackMember}>Pay my loan
                      </Link>
                      <Link href="/mdr?loc=LStUVVkwNi1DO1c1Tj0nLTYsQGBgCmAK&login=desktop" prefetch={false} className="cx-button cx-button--compact cx-button--color-positive" onClick={trackMember}>Log in</Link>
                    </div>
                  }
                </div>
              </nav>
            }
        </>
    );
}