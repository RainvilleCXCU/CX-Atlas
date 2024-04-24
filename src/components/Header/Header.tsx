import { useState } from 'react';
import Link from 'next/link';
import MenuNavigation from '../Navigation/Navbar';
import UtilityNav from './UtilityNav';
import SearchBar from './SearchBar';
import Logo from 'components/Logo';
import { useRouter } from 'next/router';
import MobileNav from './MobileNav';
interface Props {
  title?: string;
  description?: string;
  logo?: string;
  showNavigation?: boolean;
  showUtilityNav?: boolean;
  showSearch?: boolean;
  showButtons?: boolean;
  showLogo?: boolean;
  menuItems?;
  headerSettings?;
}

function Header({
  title = '',
  description,
  logo,
  showNavigation = true,
  showUtilityNav = true,
  showButtons = true,
  showSearch = true,
  showLogo = true,
  menuItems,
  headerSettings
}: Props): JSX.Element {

  const { asPath, pathname } = useRouter();

  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className={`cx-header${navOpen ? ' nav-open' : ''}`}>
      {(showLogo || showUtilityNav) &&
        <section className="cx-header__util-nav cx-header__desktop">
          <div className="cx-header__wrapper">
            {showLogo &&
              <Logo isH1={asPath === '/'} title={title} logo={logo} />
            }
            {showUtilityNav &&
              <UtilityNav logo={logo} headerUtilities={headerSettings.headerUtilities} />
            }
          </div>
        </section>
      }
        <section className="cx-header__main-nav">
          <div className="cx-header__wrapper">

            <nav className="navbar navbar-expand-lg navbar-default cx-nav cx-header__mobile">
                <SearchBar logo={logo} device="mobile" setNavOpen={setNavOpen} navOpen={navOpen} showSearch={showSearch} />
              
              {showNavigation &&
                <MobileNav headerSettings={headerSettings} links={menuItems} menuOpen={navOpen} navOpen={navOpen} setNavOpen={setNavOpen} />
              }
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
          </div>
        </section >
    </header >
  );
}

export default Header;
