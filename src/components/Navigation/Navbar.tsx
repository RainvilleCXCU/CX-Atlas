import Link from 'next/link';
import { MenuItem } from 'client';
import { client, MenuLocationEnum } from 'client';
import React, { useEffect, useState } from 'react';

interface HeaderNavigationProps {
    device: string;
    menuItems: Array<MenuItem>;
    menuOpen: boolean;
    setNavOpen;
}

function DesktopHeaderNavigation(props: HeaderNavigationProps) {
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const [navSelected, setNavSelected] = useState('');
    return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 cx-nav__navbar">
            {props.menuItems?.map((link, index) => {
                if (link.parentDatabaseId !== 0) {
                    return;
                } else {
                    return (
                        <li className={`menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children dropdown nav-item dropdown cx-nav__item cx-nav__dropdown nav-item-${index}`} key={`${link.label}$-menu${index}`}>
                            <a className={`nav-link dropdown-toggle cx-nav__link cx-dropdown-toggle cx-dropdown-toggle__main-dropdown${navSelected === link.label ? ' show' : ''}`} aria-expanded={navSelected === link.label ? true : false} data-bs-toggle="dropdown" href={link.uri}
                                onMouseOver={() => {
                                    setIsNavExpanded(!isNavExpanded);
                                    setNavSelected(link?.label);
                                }}
                                onMouseOut={() => {
                                    setIsNavExpanded(!isNavExpanded);
                                    setNavSelected('');
                                }}
                            >{link.label}</a>
                            <ul className={`dropdown-menu cx-nav__dropdown-menu depth_0${navSelected === link.label ? ' show' : ''}`} aria-labelledby="navbadropdown"
                                onMouseOver={() => {
                                    setIsNavExpanded(!isNavExpanded);
                                    setNavSelected(link?.label);
                                }}
                                onMouseOut={() => {
                                    setIsNavExpanded(!isNavExpanded);
                                    setNavSelected('');
                                }}>
                                <div className="cx-nav__dropdown-menu-container">
                                    {link?.childItems()?.nodes?.map((title, index) => {
                                        return (
                                            <li className="cx-nav__dropdown-menu-section" key={`${title.id}-${title.databaseId}`}>
                                                {
                                                    title.label != '[column]' &&
                                                    <h2>{title.label}</h2>
                                                }
                                                <ul className="cx-nav__dropdown-menu-list" key={`list-${title.id}-${title.databaseId}`}>
                                                    {title?.childItems()?.nodes?.map((navLink, index) => {
                                                        return (
                                                            <li key={`${navLink.id}-${navLink.databaseId}`}>
                                                                <Link href={navLink.uri || ''} passHref prefetch={false} className='dropdown-item cx-nav__dropdown-item'
                                                                    onClick={() => {
                                                                        setIsNavExpanded(!isNavExpanded);
                                                                        setNavSelected('');
                                                                    }}>{navLink.label}
                                                                </Link>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </li>
                                        );
                                    })}
                                </div>
                            </ul>
                        </li>
                    );
                }
            })}
        </ul>
    );
}

function MobileHeaderNavigation(props: HeaderNavigationProps) {

    const [navsSelected, setNavsSelected] = useState([]);
    const toggleSelected = (menuItem) => {
        if (navsSelected.includes(menuItem)) {
            setNavsSelected(navsSelected.filter(item => item !== menuItem));
        } else {
            setNavsSelected([
                ...navsSelected,
                menuItem
            ]);
        }
    }
    return (
        <div className="accordion accordion-flush" id="cxNavAccordion">
            {props.menuItems?.map((link, index) => {
                if (link.parentDatabaseId !== 0) {
                    return;
                } else {
                    return (
                        <li className='accordion-item cx-nav__item cx-accordion__item' key={`navItem-${index}`}>
                            <h2 className="accordion-header cx-accordion__header" id={`cx-acc-heading${link.label}`}>
                                <button className="accordion-button collapsed cx-accordion__button" type="button" data-bs-toggle="collapse" data-bs-target={`#cx-acc-collapse${link.label}`} aria-expanded="false" aria-controls={`cx-acc-collapse${link.label}`}
                                    onClick={() => {
                                        toggleSelected(link.label?.replace(' ', '_'));
                                    }} >
                                    {link.label}
                                </button>
                            </h2>
                            {link?.childItems()?.nodes?.map((title, index) => {
                                return (
                                    <div id={`cx-acc-collapse${link.label}`} key={`collapse-${index}-${title.label}`} className={`accordion-collapse collapse${navsSelected.includes(link.label?.replace(' ', '_')) ? ' show' : ''}`} aria-labelledby={`cx-acc-heading${link.label}`}>
                                        <ul className="accordion-body cx-nav__accordion-body">
                                            <li className='cx-nav__accordion-section'>
                                                {
                                                    title.label != '[column]' &&
                                                    <h3>{title.label}</h3>
                                                }

                                                <ul className='cx-nav__accordion-list'>
                                                    {title?.childItems()?.nodes?.map((navLink, index) => {
                                                        return (
                                                            <li id={`menu-item-${navLink.databaseId}`} key={`${navLink.id}-${navLink.databaseId}`}>
                                                                <Link href={navLink.uri || ''} passHref className='accordion-item cx-nav__accordion-item-link'
                                                                onClick={() => {
                                                                    props.setNavOpen(false);
                                                                }}>{navLink.label}
                                                                </Link>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            })}
                        </li>
                    );
                }
            })}
        </div >
    );
}

export interface MenuNavigationProps {
    device: string;
    menuItems: Array<MenuItem>;
    menuOpen: boolean;
    setNavOpen;
}

export default function MenuNavigation({ device, menuItems, menuOpen, setNavOpen }: MenuNavigationProps) {
    if (device === 'Mobile') {
        return (
            <MobileHeaderNavigation device={device} menuItems={menuItems} menuOpen={menuOpen} setNavOpen={setNavOpen} />
        );
    }
    return (
        <DesktopHeaderNavigation device={device} menuItems={menuItems} menuOpen={menuOpen} setNavOpen={setNavOpen} />
    );
}
