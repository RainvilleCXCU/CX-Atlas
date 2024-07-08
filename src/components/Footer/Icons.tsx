import { parseHtml } from 'lib/parser';

export default function Icons({ children = <></>, footerSocialIcons, footerAppIcons }) {
    return (
        <div className="cx-footer__icons">
            <ul className="cx-footer__social" key="footerSocialIcons" aria-label="Connexus Social Media">
                {parseHtml(footerSocialIcons ?? '')}
            </ul>
            <ul className="cx-footer__apps" key="footerAppIcons" aria-label="Download Connexus App">
                {parseHtml(footerAppIcons ?? '')}
            </ul>
        </div>
    )
};