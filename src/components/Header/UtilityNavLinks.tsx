import { client } from 'client';
import Link from 'next/link';

interface UtilityNavLinksProps {
    device?: string;
    setNavOpen
}
function DesktopUtilityNavLinks(props: UtilityNavLinksProps) {
    return (
        <>
            <li>
                <Link href="/open-an-account/" passHref className="cx-nav__link cx-nav__link--secondary">
                    <svg
                        aria-hidden="true" focusable="false" className="cx-icon" width="20px"
                        height="20px" viewBox="0 0 11 11" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M2.97058 0.0834961H8.02433C9.866 0.0834961 10.9168 1.1235 10.9168 2.97058V8.02975C10.9168 9.866 9.87141 10.9168 8.02975 10.9168H2.97058C1.1235 10.9168 0.0834961 9.866 0.0834961 8.02975V2.97058C0.0834961 1.1235 1.1235 0.0834961 2.97058 0.0834961ZM5.94433 5.94975H7.48266C7.73183 5.94433 7.93225 5.74391 7.93225 5.49475C7.93225 5.24558 7.73183 5.04516 7.48266 5.04516H5.94433V3.51766C5.94433 3.2685 5.74391 3.06808 5.49475 3.06808C5.24558 3.06808 5.04516 3.2685 5.04516 3.51766V5.04516H3.51225C3.39308 5.04516 3.27933 5.09391 3.19266 5.17516C3.11141 5.26183 3.06266 5.37504 3.06266 5.49475C3.06266 5.74391 3.26308 5.94433 3.51225 5.94975H5.04516V7.48266C5.04516 7.73183 5.24558 7.93225 5.49475 7.93225C5.74391 7.93225 5.94433 7.73183 5.94433 7.48266V5.94975Z"
                            fill="#000000" />
                    </svg> Open an Account
                </Link>
            </li>
            <li>
                <Link href="/about/branch-and-atm-locations/" passHref className="cx-nav__link cx-nav__link--secondary">
                    <svg aria-hidden="true" focusable="false" className="cx-icon" width="24px" height="24px"
                        viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="Iconly/Bold/Location" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Location" transform="translate(3.500000, 2.000000)" fill="#000000"
                                fillRule="nonzero">
                                <path
                                    d="M8.49344564,0 C13.1561184,0 17,3.71789185 17,8.31775805 C17,10.6356906 16.1570081,12.787628 14.7695,14.611575 C13.2388042,16.6235165 11.3521561,18.3764655 9.22854262,19.7524254 C8.74251142,20.0704162 8.3038733,20.0944155 7.77044902,19.7524254 C5.63473516,18.3764655 3.74808708,16.6235165 2.23050003,14.611575 C0.84198351,12.787628 0,10.6356906 0,8.31775805 C0,3.71789185 3.84388161,0 8.49344564,0 Z M8.49344564,5.77683196 C6.95165787,5.77683196 5.6942286,7.04779499 5.6942286,8.57675052 C5.6942286,10.1177057 6.95165787,11.3296704 8.49344564,11.3296704 C10.0362418,11.3296704 11.3057714,10.1177057 11.3057714,8.57675052 C11.3057714,7.04779499 10.0362418,5.77683196 8.49344564,5.77683196 Z">
                                </path>
                            </g>
                        </g>
                    </svg> ATMs &amp; Locations
                </Link>
            </li>
            <li>
                <Link href="/about/contact-us/" className="cx-nav__link cx-nav__link--secondary" passHref>
                    <svg aria-hidden="true" focusable="false" className="cx-icon" width="24px" height="24px"
                        viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g id="Iconly/Bold/Message" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Message" transform="translate(2.000400, 3.000000)" fill="#000000"
                                fillRule="nonzero">
                                <path
                                    d="M14.939,0 C16.28,0 17.57,0.53 18.519,1.481 C19.469,2.43 20,3.71 20,5.05 L20,5.05 L20,12.95 C20,15.74 17.73,18 14.939,18 L14.939,18 L5.06,18 C2.269,18 0,15.74 0,12.95 L0,12.95 L0,5.05 C0,2.26 2.259,0 5.06,0 L5.06,0 Z M16.07,5.2 C15.86,5.189 15.66,5.26 15.509,5.4 L15.509,5.4 L11,9 C10.42,9.481 9.589,9.481 9,9 L9,9 L4.5,5.4 C4.189,5.17 3.759,5.2 3.5,5.47 C3.23,5.74 3.2,6.17 3.429,6.47 L3.429,6.47 L3.56,6.6 L8.11,10.15 C8.67,10.59 9.349,10.83 10.06,10.83 C10.769,10.83 11.46,10.59 12.019,10.15 L12.019,10.15 L16.53,6.54 L16.61,6.46 C16.849,6.17 16.849,5.75 16.599,5.46 C16.46,5.311 16.269,5.22 16.07,5.2 Z">
                                </path>
                            </g>
                        </g>
                    </svg> Contact Us
                </Link>
            </li>
        </>
    );
}

function MobileUtilityNavLinks(props: UtilityNavLinksProps) {
    return (
        <>
            <li className="nav-item cx-nav__item cx-nav__item--no-border cx-nav__item--space-above">
                <Link href="/open-an-account/" passHref className="nav-link cx-nav__link cx-nav__link--secondary" data-ga-target="open_an_account_header"
                onClick={() => {
                    props.setNavOpen(false);
                }}>
                    <svg
                        aria-hidden="true" focusable="false" className="cx-icon" width="20px"
                        height="20px" viewBox="0 0 11 11" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M2.97058 0.0834961H8.02433C9.866 0.0834961 10.9168 1.1235 10.9168 2.97058V8.02975C10.9168 9.866 9.87141 10.9168 8.02975 10.9168H2.97058C1.1235 10.9168 0.0834961 9.866 0.0834961 8.02975V2.97058C0.0834961 1.1235 1.1235 0.0834961 2.97058 0.0834961ZM5.94433 5.94975H7.48266C7.73183 5.94433 7.93225 5.74391 7.93225 5.49475C7.93225 5.24558 7.73183 5.04516 7.48266 5.04516H5.94433V3.51766C5.94433 3.2685 5.74391 3.06808 5.49475 3.06808C5.24558 3.06808 5.04516 3.2685 5.04516 3.51766V5.04516H3.51225C3.39308 5.04516 3.27933 5.09391 3.19266 5.17516C3.11141 5.26183 3.06266 5.37504 3.06266 5.49475C3.06266 5.74391 3.26308 5.94433 3.51225 5.94975H5.04516V7.48266C5.04516 7.73183 5.24558 7.93225 5.49475 7.93225C5.74391 7.93225 5.94433 7.73183 5.94433 7.48266V5.94975Z"
                            fill="#5B5C5C" />
                    </svg> Open an Account
                </Link>
            </li>
            <li className="nav-item cx-nav__item cx-nav__item--no-border">
                <Link href="/about/branch-and-atm-locations/" passHref className="nav-link cx-nav__link cx-nav__link--secondary"
                onClick={() => {
                    props.setNavOpen(false);
                }}>
                    <svg aria-hidden="true" focusable="false" className="cx-icon" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g id="Iconly/Bold/Location" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Location" transform="translate(3.500000, 2.000000)" fill="#5B5C5C" fillRule="nonzero">
                                <path d="M8.49344564,0 C13.1561184,0 17,3.71789185 17,8.31775805 C17,10.6356906 16.1570081,12.787628 14.7695,14.611575 C13.2388042,16.6235165 11.3521561,18.3764655 9.22854262,19.7524254 C8.74251142,20.0704162 8.3038733,20.0944155 7.77044902,19.7524254 C5.63473516,18.3764655 3.74808708,16.6235165 2.23050003,14.611575 C0.84198351,12.787628 0,10.6356906 0,8.31775805 C0,3.71789185 3.84388161,0 8.49344564,0 Z M8.49344564,5.77683196 C6.95165787,5.77683196 5.6942286,7.04779499 5.6942286,8.57675052 C5.6942286,10.1177057 6.95165787,11.3296704 8.49344564,11.3296704 C10.0362418,11.3296704 11.3057714,10.1177057 11.3057714,8.57675052 C11.3057714,7.04779499 10.0362418,5.77683196 8.49344564,5.77683196 Z"></path>
                            </g>
                        </g>
                    </svg> Find ATMs &amp; Locations
                </Link>
            </li>
            <li className="nav-item cx-nav__item cx-nav__item--no-border">
                <Link href="/services/contact-us/" passHref className="nav-link cx-nav__link cx-nav__link--secondary"
                onClick={() => {
                    props.setNavOpen(false);
                }}>
                    <svg aria-hidden="true" focusable="false" className="cx-icon" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g id="Iconly/Bold/Message" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Message" transform="translate(2.000400, 3.000000)" fill="#5B5C5C" fillRule="nonzero">
                                <path d="M14.939,0 C16.28,0 17.57,0.53 18.519,1.481 C19.469,2.43 20,3.71 20,5.05 L20,5.05 L20,12.95 C20,15.74 17.73,18 14.939,18 L14.939,18 L5.06,18 C2.269,18 0,15.74 0,12.95 L0,12.95 L0,5.05 C0,2.26 2.259,0 5.06,0 L5.06,0 Z M16.07,5.2 C15.86,5.189 15.66,5.26 15.509,5.4 L15.509,5.4 L11,9 C10.42,9.481 9.589,9.481 9,9 L9,9 L4.5,5.4 C4.189,5.17 3.759,5.2 3.5,5.47 C3.23,5.74 3.2,6.17 3.429,6.47 L3.429,6.47 L3.56,6.6 L8.11,10.15 C8.67,10.59 9.349,10.83 10.06,10.83 C10.769,10.83 11.46,10.59 12.019,10.15 L12.019,10.15 L16.53,6.54 L16.61,6.46 C16.849,6.17 16.849,5.75 16.599,5.46 C16.46,5.311 16.269,5.22 16.07,5.2 Z"></path>
                            </g>
                        </g>
                    </svg> Contact Us
                </Link>
            </li>
        </>
    )
};


export default function UtilityNavLinks({ device, setNavOpen, children = <></> }) {
    if (device.toLowerCase() === 'mobile') {
      return (
        <MobileUtilityNavLinks setNavOpen={setNavOpen} />
      );
    }
    return (
      <DesktopUtilityNavLinks setNavOpen={setNavOpen} />
    );
  };
  