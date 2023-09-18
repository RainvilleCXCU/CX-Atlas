import { client } from 'client';
import { parseHtml } from 'lib/parser';

export default function Icons({ children = <></> }) {
    const { useQuery } = client;
    const {footerSocialIcons, footerAppIcons} = useQuery().footerSettings;
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