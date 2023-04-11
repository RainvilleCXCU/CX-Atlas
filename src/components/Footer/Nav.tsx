import { client } from 'client';
import Link from 'next/link';

interface FooterMenuProps {
    device?: string;
}
function DesktopMenu(props: FooterMenuProps) {
    return (
        <nav className="cx-nav cx-nav__width-auto cx-footer__desktop">
        </nav>
    );
}

function MobileMenu(props: FooterMenuProps) {
    return (
        <nav className="cx-nav cx-footer__mobile">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 cx-nav__navbar">
            </ul>
        </nav>
    )
};


export default function FooterMenu({ device, children = <></> }) {
    if (device.toLowerCase() === 'mobile') {
        return (
            <MobileMenu />
        );
    }
    return (
        <DesktopMenu />
    );
};
