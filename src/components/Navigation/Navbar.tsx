import Link from 'next/link';
import { MenuItem } from 'client';
import { client, MenuLocationEnum } from 'client';
import React, { useState } from 'react';

interface HeaderNavigationProps {
    device: string;
    menuItems: Array<MenuItem>;
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
                                                                <Link href={navLink.uri || ''} passHref className='dropdown-item cx-nav__dropdown-item'
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
    return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 cx-nav__navbar">
            {props.menuItems?.map((link, index) => (
                <li key={`${link.label}$-mobile-menu${index}`}>
                    <Link href={link.path ?? ''}>{link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export interface MenuNavigationProps {
    device: string;
    menuItems: Array<MenuItem>;
}

export default function MenuNavigation({ device, menuItems }: MenuNavigationProps) {
    if (device === 'Mobile') {
        return (
            <MobileHeaderNavigation device={device} menuItems={menuItems} />
        );
    }
    return (
        <DesktopHeaderNavigation device={device} menuItems={menuItems} />
    );
}
