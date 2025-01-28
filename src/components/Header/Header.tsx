import { useState } from 'react';
import UtilityNav from './UtilityNav';
import Logo from 'components/Logo';
import { useRouter } from 'next/router';
import Navigation from './Navigation';
import dynamic from 'next/dynamic';
interface Props {
  title?: string;
  description?: string;
  logo?: string;
  desktopLogo?: string;
  mobileLogo?: string;
  logoText?: string;
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
  desktopLogo,
  mobileLogo,
  logoText,
  showNavigation = true,
  showUtilityNav = true,
  showButtons = true,
  showSearch = true,
  showLogo = true,
  menuItems,
  headerSettings
}: Props): JSX.Element {

  const { asPath } = useRouter();

  const [navOpen, setNavOpen] = useState(false);

  

  return (
    <header className={`cx-header${navOpen ? ' nav-open' : ''}`}>
      {(showLogo || showUtilityNav) &&
        <section className="cx-header__util-nav cx-header__desktop">
          <div className="cx-header__wrapper">
            {showLogo &&
              <Logo isH1={asPath === '/'} title={logoText} logo={logo} desktopLogo={desktopLogo} mobileLogo={mobileLogo} />
            }
            {showUtilityNav &&
              <UtilityNav logo={logo} desktopLogo={desktopLogo} mobileLogo={mobileLogo} logoText={logoText} headerUtilities={headerSettings.headerUtilities} />
            }
          </div>
        </section>
      } 
        {!showNavigation ?
              <Navigation showNavigation={showNavigation} showButtons={showButtons} logo={logo} desktopLogo={desktopLogo} mobileLogo={mobileLogo} logoText={logoText} setNavOpen={setNavOpen} navOpen={navOpen} showSearch={showSearch} headerSettings={headerSettings} menuItems={menuItems} />
             :
          <section className="cx-header__main-nav">
            <div className="cx-header__wrapper">
              <Navigation showNavigation={showNavigation} logo={logo} desktopLogo={desktopLogo} mobileLogo={mobileLogo} logoText={logoText} showButtons={showButtons} setNavOpen={setNavOpen} navOpen={navOpen} showSearch={showSearch} headerSettings={headerSettings} menuItems={menuItems} />
            </div>
          </section >
        }
    </header >
  );
}

export default Header;
