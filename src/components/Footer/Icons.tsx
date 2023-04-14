import { client } from 'client';
import parseHtml from 'lib/parser';

export default function Icons({ children = <></> }) {
    const { useQuery } = client;
    const generalSettings = useQuery().generalSettings;
    const {footerSocialIcons, footerAppIcons} = useQuery().footerSettings;
    return (
        <div className="cx-footer__icons">
            {parseHtml(footerSocialIcons ?? '')}
            {parseHtml(footerAppIcons ?? '')}
        </div>
    )
};