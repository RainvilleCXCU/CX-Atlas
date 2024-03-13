import { parseHtml } from 'lib/parser';

export default function UtilityNav({ children = <></>, footerUtilities = '' }) {
    return (
        <div className="cx-footer__utils">
            <div className="navbar-nav cx-nav__navbar">
                {parseHtml(footerUtilities ?? '' )}
            </div>
        </div>
    )
};