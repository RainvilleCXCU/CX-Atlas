import { memo, useState, useEffect, useCallback, useRef } from 'react';
import UtilityNav from './UtilityNav';
import Logo from 'components/Logo';
import { useRouter } from 'next/router';
import Navigation from './Navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Alert from 'components/Alerts/Alert';
import { h } from 'preact';

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
  activeAlerts?: Array<any>;
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
  activeAlerts,
  ctas
}: Props): JSX.Element => {

  const { asPath } = useRouter();

  const [navOpen, setNavOpen] = useState(false);
  const elementRefs = useRef<{
    header?: HTMLElement | null;
    pageContent?: HTMLElement | null;
    smartBanner?: HTMLElement | null;
    alertBanner?: HTMLElement | null;
  }>({});
  const lastScrollTop = useRef(0);
  const resizeTimeoutId = useRef<NodeJS.Timeout | null>(null);

  const throttledHandleResize = useCallback(() => {
    if (resizeTimeoutId.current) {
      clearTimeout(resizeTimeoutId.current);
    }
    
    resizeTimeoutId.current = setTimeout(() => {
      const { header, pageContent } = elementRefs.current;
      if (window.innerWidth >= 992 && header) {
        header.style.cssText = ''; 
        if (pageContent && pageContent.style.paddingTop === header.clientHeight + 'px') {
          pageContent.style.cssText = ''; 
        }
      }
    }, 100);
  }, []);

  // hide/show the mobile header on scroll
  useEffect(() => {
    elementRefs.current = {
      header: document.querySelector('.cx-header'),
      pageContent: document.querySelector('#page') || document.querySelector('#main'),
      smartBanner: document.querySelector('.smartbanner-container'),
      alertBanner: document.querySelector('#alert-banner')
    };

    const handleScroll = () => {
      const { header, pageContent, smartBanner, alertBanner } = elementRefs.current;
      if (!header) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      let headerHeight = header.clientHeight;
      if (smartBanner) {
        headerHeight += smartBanner.clientHeight;
      }
      
      const alertBannerHeight = alertBanner ? alertBanner.clientHeight : 0;
      const scrollThreshold = headerHeight;
      
      if (window.innerWidth < 992) {
        // At the very top, keep everything relative
        if (scrollTop <= alertBannerHeight) {
          header.style.position = 'relative';
          header.style.transform = 'translateY(0)';
          header.style.top = 'auto';
          if (pageContent) {
            pageContent.style.paddingTop = '0px';
          }
          return;
        }
        
        if (scrollTop > lastScrollTop.current) {
          // Scrolling down
          if (scrollTop > scrollThreshold + alertBannerHeight) {
            header.style.transform = 'translateY(-100%)';
          }
        } else {
          // Scrolling up - make header fixed and position appropriately
          header.style.transform = 'translateY(0)';
          header.style.position = 'fixed';
          
          // Position header based on whether alert is in view
          const alertTopPosition = alertBannerHeight - scrollTop;
          if (alertTopPosition > 0 && alertBannerHeight > 0) {
            // Alert is partially or fully visible
            header.style.top = `${alertTopPosition}px`;
          } else {
            // Alert is out of view, header at top
            header.style.top = '0px';
          }
          
          if (pageContent) {
            pageContent.style.paddingTop = `${headerHeight}px`;
          }
        }
      }

      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', throttledHandleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', throttledHandleResize);
      if (resizeTimeoutId.current) {
        clearTimeout(resizeTimeoutId.current);
      }
    };
  }, [throttledHandleResize]);
  

  return (
    <>
    {
        activeAlerts?.length > 0 &&
        <Alert alerts={activeAlerts} />
    }
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
              ctas && template && template.toLowerCase() === 'cta header' && 
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
    </>
  );
}

// export { Header };

const MemoizedHeader = memo(Header);

export default MemoizedHeader;