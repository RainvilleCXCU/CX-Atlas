import { memo, useState, useEffect } from 'react';
import UtilityNav from './UtilityNav';
import Logo from 'components/Logo';
import { useRouter } from 'next/router';
import Navigation from './Navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';

interface CTAProps {
  buttonColor: string;
  ctaButtonType: string;
  ctaLink: string;
  ctaText: string;
  compact: boolean;
}
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
  template?: string;
  ctas?: Array<CTAProps>;
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
  headerSettings,
  template,
  ctas
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
          }
        } else { // scrolling up          
          header.style.transform = 'translateY(0)';
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

            {
              template && template.toLowerCase() === 'cta header' && 
                <section className='cx-header__cta'>
                  {ctas.map((cta, index) => (
                    <Link href={cta.ctaLink} key={`header-cta-${index}`} className={`cx-button cx-button--${cta.ctaButtonType}${cta.buttonColor}${cta.compact ? ' cx-button--compact' : ''} ${index !== 0 ? ' slim-margin--horizontal-left' : ''}`}>{cta.ctaText}</Link>
                  ))}
                </section>
            }
          </div>
        </section>
      } 
        {!showNavigation ?
              <Navigation template={template} ctas={ctas} showNavigation={showNavigation} showButtons={showButtons} logo={logo} desktopLogo={desktopLogo} mobileLogo={mobileLogo} desktopLogoWidth={desktopLogoWidth} mobileLogoWidth={mobileLogoWidth} logoText={logoText} setNavOpen={setNavOpen} navOpen={navOpen} showSearch={showSearch} headerSettings={headerSettings} menuItems={menuItems} />
             :
          <section className="cx-header__main-nav">
            <div className="cx-header__wrapper">
              <Navigation template={template} ctas={ctas} showNavigation={showNavigation} logo={logo} desktopLogo={desktopLogo} mobileLogo={mobileLogo} desktopLogoWidth={desktopLogoWidth} mobileLogoWidth={mobileLogoWidth} logoText={logoText} showButtons={showButtons} setNavOpen={setNavOpen} navOpen={navOpen} showSearch={showSearch} headerSettings={headerSettings} menuItems={menuItems} />
            </div>
          </section >
        }
    </header >
  );
}

// export { Header };

const MemoizedHeader = memo(Header);

export default MemoizedHeader;