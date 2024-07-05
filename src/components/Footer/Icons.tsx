import { parseHtml } from 'lib/parser';

export default function Icons({ children = <></>, footerSocialIcons, footerAppIcons }) {
    return (
        <div className="cx-footer__icons">
            <span key="footerSocialIcons" aria-label='Connexus Social Media'>
                {parseHtml(footerSocialIcons ?? '')}
            </span>
            <span key="footerAppIcons" aria-label='Download Connexus App'>
                {parseHtml(footerAppIcons ?? '')}
            </span>
        </div>
    )
};