import { parseHtml } from 'lib/parser';
import SearchBar from './SearchBar';

export default function UtilityNav({ logo, navOpen = false, setNavOpen = false, children = <></>, headerUtilities }) {
    return (
        <>
            <ul className="cx-header__util-nav-list">
                <li>
                    <SearchBar logo={logo} device="desktop" navOpen setNavOpen />
                </li>
                <li>
                    {parseHtml(headerUtilities.toString() ?? '' )}
                </li>
            </ul>
        </>
    )
};