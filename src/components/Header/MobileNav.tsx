import Link from 'next/link';
import UtilityNavLinks from './UtilityNavLinks';
import MenuNavigation from 'components/Navigation/Navbar';
import { useEffect } from 'react';
import { parseHtml } from 'lib/parser';

export default function MobileNav({ links, menuOpen = false, navOpen = false, setNavOpen, headerSettings, showNavigation, children = <></> }) {
    //const [navOpen, setNavOpen] = useState(false);
    useEffect(() => {
        if(navOpen) {
            document.querySelector('html').classList.add('nav-open');
        } else {
            document.querySelector('html').classList.remove('nav-open');
        }
    },[navOpen])

    useEffect(() => {
        setNavOpen(menuOpen);
    },[menuOpen])
    
    return (
        <>
        {showNavigation &&
        <div className={`cx-nav__collapse offcanvas offcanvas-end${navOpen ? ' show' : ''}`} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <button type="button" className="visually-hidden" data-bs-dismiss="offcanvas" aria-label="Close navigation"
                onClick={() => {
                    setNavOpen(false);
                }}></button>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 cx-nav__navbar">

                {
                    headerSettings?.headerButtonsMobile && headerSettings?.headerButtonsMobile !== '' ?
                    <li className="cx-nav__buttons header-buttons-mobile"
                    onClick={() => {
                        setNavOpen(false);
                    }}>
                        {parseHtml(headerSettings.headerButtonsMobile)}
                    </li>
                     :
                    <>
                        <li className="nav-item cx-nav__item">
                            <Link className="nav-link cx-nav__link cx-nav__link--primary" href="/mdr?loc=LStUVVkwNi1DO1c1Tj0nLTYsQGBgCmAK&login=mobile">Log in</Link>
                        </li>
                        <li className="nav-item cx-nav__item">
                            <Link href="/pay-my-loan/" passHref className="nav-link cx-nav__link cx-nav__link--primary"
                            onClick={() => {
                                setNavOpen(false);
                            }}>Pay my loan</Link>
                        </li>
                    </>
                }


                <div className="accordion accordion-flush" id="cxNavAccordion">
                    <MenuNavigation device="Mobile" menuItems={links} menuOpen={menuOpen} setNavOpen={setNavOpen} />
                    <span className="cx-nav__items"
                    onClick={() => {
                        setNavOpen(false);
                    }}>
                    <UtilityNavLinks headerUtilities={headerSettings.headerUtilitiesMobile}  />
                    </span>
                </div>
            </ul>
        </div>
                }
        </>
    )
}