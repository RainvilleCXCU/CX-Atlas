import { parseHtml } from 'lib/parser';
import SearchBar from './SearchBar';
import UtilityNavLinks from './UtilityNavLinks';

export default function UtilityNav({ navOpen = false, setNavOpen = false, children = <></>, headerUtilities }) {
    return (
        <>
            <ul className="cx-header__util-nav-list">
                <li>
                    <SearchBar device="desktop" navOpen setNavOpen />
                </li>
                <li>
                    {parseHtml(headerUtilities.toString() ?? '' )}
                </li>
            </ul>
        </>
    )
};