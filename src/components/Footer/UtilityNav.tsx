import { client } from 'client';
import parseHtml from 'lib/parser';
import Link from 'next/link';

export default function UtilityNav({ children = <></> }) {
    const { useQuery } = client;
    const generalSettings = useQuery().generalSettings;
    const {footerUtilities} = useQuery().footerSettings;
    return (
        <div className="cx-footer__utils">
            <div className="navbar-nav cx-nav__navbar">
                {parseHtml(footerUtilities ?? '' )}
            </div>
        </div>
    )
};