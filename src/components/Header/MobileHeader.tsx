import Logo from 'components/Logo';
import { useEffect, useRef } from 'react';

interface MobileHeader {
    navOpen?: boolean,
    setNavOpen,
    isSearchExpanded?: boolean,
    setIsSearchExpanded?,
    setSearchTerm?
    logo
}

export default function MobileHeader(props: MobileHeader) {
    const { isSearchExpanded, logo, setNavOpen, navOpen, setIsSearchExpanded, setSearchTerm } = props;

    return (
        <div className="cx-inner-wrapper">
            <Logo logo={logo} />
            <div className="cx-nav__mobile-buttons">
                <button
                    className={`cx-search-mobile__toggler${isSearchExpanded ? ' cx-hide' : ''}`}
                    type="button"
                    onClick={() => {
                        setIsSearchExpanded(true);
                    }}
                >
                    <svg aria-hidden="true" focusable="false" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.25 16.8578H18.065L17.645 16.4528C19.115 14.7428 20 12.5228 20 10.1078C20 4.72279 15.635 0.357788 10.25 0.357788C4.865 0.357788 0.5 4.72279 0.5 10.1078C0.5 15.4928 4.865 19.8578 10.25 19.8578C12.665 19.8578 14.885 18.9728 16.595 17.5028L17 17.9228V19.1078L24.5 26.5928L26.735 24.3578L19.25 16.8578ZM10.25 16.8578C6.515 16.8578 3.5 13.8428 3.5 10.1078C3.5 6.37279 6.515 3.35779 10.25 3.35779C13.985 3.35779 17 6.37279 17 10.1078C17 13.8428 13.985 16.8578 10.25 16.8578Z" fill="#323232" />
                    </svg>
                    <span className="sr-only">Open site search</span>
                </button>
                <button
                    className={`cx-navbar-toggler${props.navOpen || isSearchExpanded ? '' : ' cx-collapsed'}`}
                    type="button" aria-controls="offcanvasRight"
                    aria-label="Toggle navigation"
                    onClick={() => {
                        if(isSearchExpanded) {
                            setIsSearchExpanded(false);
                            setSearchTerm('');
                        } else {
                            setNavOpen(!navOpen);
                        }
                    }}
                >
                    <span className="navbar-toggler-icon cx-navbar-toggler__line"></span>
                </button>
            </div>
        </div>
    );
}