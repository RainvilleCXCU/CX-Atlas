import Link from 'next/link';
import { Fragment, useState } from 'react';
import { parseHtml } from 'lib/parser';
import { gql } from '@apollo/client';
interface HeaderNavigationProps {
    device: string;
    menuItems?;
    menuOpen: boolean;
    setNavOpen;
}

function DesktopHeaderNavigation(props: HeaderNavigationProps) {
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const [navSelected, setNavSelected] = useState('');
    const resourcesRegEx = new RegExp(/resources/, 'i');
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
                                    setNavSelected(link.label);
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
                                    <div className='cx-nav__dropdown-menu-container__menu-items'>
                                        {link?.childItems?.nodes?.map((title, index) => {
                                            return (
                                                <Fragment key={`${title.id}-${title.databaseId}`}>
                                                { !resourcesRegEx.test(title.uri) &&
                                                    <li className="cx-nav__dropdown-menu-section">
                                                        {
                                                            title.label != '[column]' &&
                                                            <h2 className='cx-h5 no-margin--top'>{title.label}</h2>
                                                        }
                                                        <ul className="cx-nav__dropdown-menu-list" key={`list-${index}-${title.databaseId}`}>
                                                            {title?.childItems?.nodes?.map((navLink, index) => {
                                                                return (
                                                                    <li key={`${index}-${navLink.databaseId}`}>
                                                                        <Link href={navLink.uri || ''} prefetch={false} passHref className='dropdown-item cx-nav__dropdown-item'
                                                                            onClick={() => {
                                                                                setIsNavExpanded(!isNavExpanded);
                                                                                setNavSelected('');
                                                                            }}>{parseHtml(navLink.label ?? "")}
                                                                        </Link>
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </li>
                                                }
                                                </Fragment>
                                            );
                                        })}
                                    </div>
                                    {link?.childItems?.nodes?.map((title, index) => {
                                        return (
                                            <Fragment key={`${index}-${title.databaseId}`}>
                                            { resourcesRegEx.test(title.uri) &&
                                                <div className='cx-nav__resources'>
                                                    {
                                                        title.label != '[column]' &&
                                                        <h2 className='cx-h5 no-margin--top'>{title.label}</h2>
                                                    }
                                                    <ul className="cx-nav__dropdown-menu-list" key={`list-${index}-${title.databaseId}`}>
                                                        {title?.childItems?.nodes?.map((navLink, index) => {
                                                            return (
                                                                <li key={`item-${index}-${navLink.databaseId}`}>
                                                                    <Link href={navLink.uri || ''} passHref prefetch={false} className='dropdown-item cx-nav__dropdown-item'
                                                                        onClick={() => {
                                                                            setIsNavExpanded(!isNavExpanded);
                                                                            setNavSelected('');
                                                                        }}>{parseHtml(navLink.label ?? "")}
                                                                    </Link>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            }
                                            </Fragment>
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
                            {link.childItems.nodes &&
                                <div id={`cx-acc-collapse${link.label}-${index}`} className={`accordion-collapse collapse${navsSelected.includes(link.label?.replace(' ', '_')) ? ' show' : ''}`} aria-labelledby={`cx-acc-heading${link.label}`}>
                                    <ul className="accordion-body cx-nav__accordion-body">
                                        {link.childItems.nodes?.map((title, index) => {
                                            return (
                                                        <li key={`collapse-${index}-${title.label}`}  className={ title.label != '[column]' ? 'cx-nav__accordion-section' : 'cx-nav__accordion-section-no-heading' }>
                                                            {
                                                                title.label != '[column]' &&
                                                                <h3 className='cx-h5 no-margin--top'>{title.label}</h3>
                                                            }

                                                            <ul className='cx-nav__accordion-list'>
                                                                {title.childItems.nodes && title.childItems.nodes ?.map((navLink, index) => {
                                                                    return (
                                                                        <li id={`menu-item-${navLink.databaseId}`} key={`${index}-${navLink.databaseId}`}>
                                                                            <Link href={navLink.uri || ''} passHref className='accordion-item cx-nav__accordion-item-link'
                                                                            onClick={() => {
                                                                                props.setNavOpen(false);
                                                                            }}>{parseHtml(navLink.label ?? "")}
                                                                            </Link>
                                                                        </li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            }
                        </li>
                    );
                }
            })}
        </div >
    );
}

export interface MenuNavigationProps {
    device: string;
    menuItems?;
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