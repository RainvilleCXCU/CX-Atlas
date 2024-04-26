import SearchBar from './SearchBar';
import MobileNav from './MobileNav';
import MenuNavigation from 'components/Navigation/Navbar';
import Link from 'next/link';
interface NavigationProps {
    navOpen?: boolean,
    setNavOpen,
    menuItems?: boolean,
    headerSettings?,
    showButtons?
    logo?
    showNavigation?
    showSearch?
}

export default function Navigation(props: NavigationProps) {
    const { showNavigation, showButtons, logo, setNavOpen, navOpen, headerSettings, menuItems, showSearch } = props;

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-default cx-nav cx-header__mobile">
                <SearchBar showNavigation={showNavigation} logo={logo} device="mobile" setNavOpen={setNavOpen} navOpen={navOpen} showSearch={showSearch} />
              
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
                      <Link href="/pay-my-loan/" passHref className="cx-button cx-button--compact cx-button--text cx-button--outlined" type="button">Pay my loan
                      </Link>
                      <Link href="/mdr?loc=LStUVVkwNi1DO1c1Tj0nLTYsQGBgCmAK&login=desktop" className="cx-button cx-button--compact">Log in</Link>
                    </div>
                  }
                </div>
              </nav>
            }
        </>
    );
}