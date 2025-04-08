import React, { useState, useEffect } from 'react';
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
  desktopLogoWidth?: string;
  mobileLogo?: string;
  mobileLogoWidth?: string;
  logoText?: string;
  showNavigation?: boolean;
  showUtilityNav?: boolean;
  showSearch?: boolean;
  showButtons?: boolean;
  showLogo?: boolean;
  menuItems?;
  headerSettings?;
}

const Header = ({
  title = '',
  description,
  logo,
  desktopLogo,
  desktopLogoWidth,
  mobileLogo,
  mobileLogoWidth,
  logoText,
  showNavigation = true,
  showUtilityNav = true,
  showButtons = true,
  showSearch = true,
  showLogo = true,
  menuItems,
  headerSettings
}: Props): JSX.Element => {

  const { asPath } = useRouter();

  const [navOpen, setNavOpen] = useState(false);

  // hide/show the mobile header on scroll
  useEffect(() => {
    let lastScrollTop = 0;
    const header = document.querySelector('.cx-header');
    const pageContent = document.querySelector('#page') ? document.querySelector('#page') : document.querySelector('#main');

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (window.innerWidth < 992) {
        if (scrollTop > lastScrollTop) { // scrolling down
          if (scrollTop > 80) {
            header.style.transform = 'translateY(-100%)';
            header.style.opacity = '0';
          }
        } else { // scrolling up          
          header.style.transform = 'translateY(0)';
          header.style.opacity = '1';
          header.style.position = 'fixed';
          pageContent.style.paddingTop = '80px';
        }
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    // if the window is resized to a width greater than 992px, reset the inline styles
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        header.style.cssText = ''; 
        if (pageContent.style.paddingTop === '80px') {
          pageContent.style.cssText = ''; 
        }
      }
    };

    window.addEventListener('scroll', handleScroll); // add scroll event listener
    window.addEventListener('resize', handleResize); // add window resize event listener

    //cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  return (
    <header className={`cx-header${navOpen ? ' nav-open' : ''}`}>
      {(showLogo || showUtilityNav) &&
        <section className="cx-header__util-nav cx-header__desktop">
          <div className="cx-header__wrapper">
            {showLogo &&
              <Logo isH1={asPath === '/'} title={logoText} logo={logo} desktopLogo={desktopLogo} mobileLogo={mobileLogo} desktopLogoWidth={desktopLogoWidth} mobileLogoWidth={mobileLogoWidth} />
            }
            {showUtilityNav &&
              <UtilityNav logo={logo} desktopLogo={desktopLogo} mobileLogo={mobileLogo} desktopLogoWidth={desktopLogoWidth} mobileLogoWidth={mobileLogoWidth} logoText={logoText} headerUtilities={headerSettings.headerUtilities} />
            }
          </div>
        </section>
      } 
        {!showNavigation ?
              <Navigation showNavigation={showNavigation} showButtons={showButtons} logo={logo} desktopLogo={desktopLogo} mobileLogo={mobileLogo} desktopLogoWidth={desktopLogoWidth} mobileLogoWidth={mobileLogoWidth} logoText={logoText} setNavOpen={setNavOpen} navOpen={navOpen} showSearch={showSearch} headerSettings={headerSettings} menuItems={menuItems} />
             :
          <section className="cx-header__main-nav">
            <div className="cx-header__wrapper">
              <Navigation showNavigation={showNavigation} logo={logo} desktopLogo={desktopLogo} mobileLogo={mobileLogo} desktopLogoWidth={desktopLogoWidth} mobileLogoWidth={mobileLogoWidth} logoText={logoText} showButtons={showButtons} setNavOpen={setNavOpen} navOpen={navOpen} showSearch={showSearch} headerSettings={headerSettings} menuItems={menuItems} />
            </div>
          </section >
        }
    </header >
  );
}

// export { Header };

const MemoizedHeader = React.memo(Header);

export default MemoizedHeader;