import { client } from 'client';
import Link from 'next/link';
import SearchBar from './SearchBar';
import UtilityNavLinks from './UtilityNavLinks';
import MenuNavigation from 'components/Navigation/Navbar';
import { useEffect, useState } from 'react';

export default function MobileNav({ links, menuOpen = false, navOpen, setNavOpen, children = <></> }) {
    const { useQuery } = client;
    const generalSettings = useQuery().generalSettings;
    //const [navOpen, setNavOpen] = useState(false);
    useEffect(() => {
        if(navOpen) {
            document.querySelector('html').style.overflow = 'hidden';
        } else {
            document.querySelector('html').style.overflow = 'hidden scroll';
        }
    },[navOpen])

    useEffect(() => {
        setNavOpen(menuOpen);
    },[menuOpen])
    
    return (
        <div className={`cx-nav__collapse offcanvas offcanvas-end${navOpen ? ' show' : ''}`} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <button type="button" className="visually-hidden" data-bs-dismiss="offcanvas" aria-label="Close navigation"
                onClick={() => {
                    setNavOpen(false);
                }}></button>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 cx-nav__navbar">
                <li className="nav-item cx-nav__item">
                    <a className="nav-link cx-nav__link cx-nav__link--primary" href="https://onlinebanking.connexuscu.org/Mobile/Authentication">Log in</a>
                </li>
                <li className="nav-item cx-nav__item">
                    <Link href="/pay-my-loan/" passHref className="nav-link cx-nav__link cx-nav__link--primary" >Pay my loan</Link>
                </li>
                <div className="accordion accordion-flush" id="cxNavAccordion">
                    <MenuNavigation device="Mobile" menuItems={links} menuOpen={menuOpen} setNavOpen={setNavOpen} />
                    <UtilityNavLinks device="mobile" />
                </div>
            </ul>
        </div>
    )
}