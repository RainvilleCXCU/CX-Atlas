import { parseHtml } from 'lib/parser';

export default function Icons({ children = <></>, footerSocialIcons, footerAppIcons }) {
    return (
        <div className="cx-footer__icons">
            <span key="footerSocialIcons">
                {parseHtml(footerSocialIcons ?? '')}
            </span>
            <span key="footerAppIcons">
                {parseHtml(footerAppIcons ?? '')}
            </span>
        </div>
    )
};