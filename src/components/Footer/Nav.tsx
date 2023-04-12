import { MenuItem, MenuLocationEnum, client } from 'client';
import Link from 'next/link';
import { useState } from 'react';

interface FooterMenuProps {
    device?: string;
    links: Array<MenuItem>
}

function DesktopMenu(props: FooterMenuProps) {
    return (
        <nav className="cx-nav cx-nav__width-auto cx-footer__desktop">
            <ul className="cx-nav__dropdown-menu">
                {props.links?.map((link, index) => {
                    if (link.parentDatabaseId !== 0) {
                        return;
                    } else {
                        return (
                            <li className={`cx-nav__dropdown-menu-section`} key={`${link.label}$-menu${index}`}>
                                <h2 className="accordion-header cx-accordion__header" id={`cx-acc-heading${link.label?.replace(' ', '_')}`}>
                                        {link.label}
                                </h2>
                                {link.childItems()?.nodes?.map((title, index) => {
                                    return(
                                        <ul className="cx-nav__dropdown-menu-list">
                                        {title.childItems()?.nodes?.map((title, index) => {
                                            return(
                                                <li key={`link-${title.label}-${index}`}>
                                                    <Link href={title.uri || ''} className="dropdown-item cx-nav__dropdown-item">
                                                        {title.label}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                        </ul>
                                    )})}
                            </li>
                        );
                    }
                })}
            </ul>
        </nav>
    );
}

function MobileMenu(props: FooterMenuProps) {
    
    const [navsSelected, setNavsSelected] = useState([]);
    const toggleSelected = (menuItem) => {
        if(navsSelected.includes(menuItem)) {
            setNavsSelected(navsSelected.filter(item => item !== menuItem));
        } else {
            setNavsSelected([
                ...navsSelected,
                menuItem
            ]);
        }
    }
    return (
        <nav className="cx-nav cx-footer__mobile">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 cx-nav__navbar">
                <div className="accordion accordion-flush" id="cxFooterNavAccordion">
                    {props.links?.map((link, index) => {
                        if (link.parentDatabaseId !== 0) {
                            return;
                        } else {
                            return (
                                <li className={`accordion-item cx-nav__item cx-accordion__item`} key={`${link.label}$-menu${index}`}>
                                    <h2 className="accordion-header cx-accordion__header" id={`cx-acc-heading${link.label?.replace(' ', '_')}`}>
                                        <button className={`accordion-button cx-accordion__button${navsSelected.includes(link.label?.replace(' ', '_')) ? '' : ' collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#cx-acc-collapse${link.label?.replace(' ', '_')}`} aria-expanded="false" aria-controls={`cx-acc-collapse${link.label?.replace(' ', '_')}`}
                                            onClick={() => {
                                                toggleSelected(link.label?.replace(' ', '_'));
                                            }}>
                                            {link.label}
                                        </button>
                                    </h2>
                                    <div id={`cx-acc-collapse${link.label?.replace(' ', '_')}`} className={`accordion-collapse collapse${navsSelected.includes(link.label?.replace(' ', '_')) ? ' show' : ''}`} aria-labelledby={`cx-acc-heading${link.label?.replace(' ', '_')}`}>
                                        {link.childItems()?.nodes?.map((title, index) => {
                                            return(
                                                <ul className="accordion-body cx-nav__accordion-body">
                                                    <li className="cx-nav__accordion-section-no-heading">
                                                        <ul className="cx-nav__accordion-list">
                                                            {title.childItems()?.nodes?.map((title, index) => {
                                                                return(
                                                                    <li key={`link-${title.label}-${index}`}>
                                                                        <Link href={title.uri || ''} className="accordion-item cx-nav__accordion-item-link"
                                                                        onClick={() => {
                                                                            setNavsSelected([]);
                                                                        }}>
                                                                            {title.label}
                                                                        </Link>
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </li>
                                                </ul>
                                            )})}
                                    </div>
                                </li>
                            );
                        }
                    })}
                </div>
            </ul>
        </nav>
    )
};


export default function FooterMenu({ device, children = <></> }) {


    const { menuItems } = client.useQuery()
    const links = menuItems({
      first: 255,
      where: { location: MenuLocationEnum.FOOTER },
    }).nodes;

    if (device.toLowerCase() === 'mobile') {
        return (
            <MobileMenu links={links} />
        );
    }
    return (
        <DesktopMenu links={links} />
    );
};
