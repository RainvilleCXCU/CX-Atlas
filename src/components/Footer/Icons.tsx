import { client } from 'client';

export default function Icons({ children = <></> }) {
    const { useQuery } = client;
    const generalSettings = useQuery().generalSettings;
    return (
        <div className="cx-footer__icons">
            <ul className="cx-footer__social">
                <li><a href="https://www.facebook.com/connexuscu" target="_blank"><img src="/wp-content/themes/CXCU/images/facebook.svg" className="cx-logo" height="36" width="36" alt="facebook" /></a></li>
                <li><a href="https://www.linkedin.com/company/connexus-credit-union" target="_blank"><img src="/wp-content/uploads/LI-In-Bug.svg" className="cx-logo" alt="linkedin" /></a></li>
                <li><a href="https://www.youtube.com/user/ConnexusCU" target="_blank"><img src="/wp-content/themes/CXCU/images/youtube.svg" className="cx-logo" height="36" width="36" alt="youtube" /></a></li>
            </ul>
            <ul className="cx-footer__apps">
                <li><a href="https://apple.co/3qSq3u6" target="_blank"><img src="/wp-content/themes/CXCU/images/applestore.svg" height="40" width="135" alt="Apple App Store" /></a></li>
                <li><a href="https://play.google.com/store/apps/details?id=com.alkamitech.connexus" target="_blank"><img src="/wp-content/themes/CXCU/images/playstore.svg" height="40" width="135" alt="Google Play Store" /></a></li>
            </ul>
        </div>
    )
};