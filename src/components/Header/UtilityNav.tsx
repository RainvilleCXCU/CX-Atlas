import { parseHtml } from 'lib/parser';
import SearchBar from './SearchBar';

export default function UtilityNav({ logo, desktopLogo, mobileLogo, desktopLogoWidth, mobileLogoWidth, logoText, navOpen = false, setNavOpen = false, children = <></>, headerUtilities }) {
    return (
        <ul className="cx-header__util-nav-list">
            <li>
                <SearchBar logo={logo} desktopLogo={desktopLogo} mobileLogo={mobileLogo} desktopLogoWidth={desktopLogoWidth} mobileLogoWidth={mobileLogoWidth} logoText={logoText} device="desktop" navOpen setNavOpen showSearch={true} />
            </li>
            <li>
                {parseHtml(headerUtilities.toString() ?? '' )}
            </li>
        </ul>
    )
};