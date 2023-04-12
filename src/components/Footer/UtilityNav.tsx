import { client } from 'client';
import Link from 'next/link';

export default function UtilityNav({ children = <></> }) {
    const { useQuery } = client;
    const generalSettings = useQuery().generalSettings;
    return (
        <div className="cx-footer__utils">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 cx-nav__navbar">
                <li className="nav-item cx-nav__item cx-nav__item--no-border">
                    <Link className="cx-nav__link cx-nav__link--secondary" href="tel:+1-800-845-5025">
                        <svg aria-hidden="true" focusable="false" className="cx-icon" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <title>Iconly/Bold/Call</title>
                            <g id="Iconly/Bold/Call" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="Call" transform="translate(2.500000, 2.500000)" fill="#000000">
                                    <path d="M9.03174073,9.97238745 C13.0208243,13.9603606 13.9257751,9.34671782 16.4656491,11.8848116 C18.9142765,14.3327574 20.32162,14.8232052 17.2192381,17.9247236 C16.8306352,18.2370218 14.3616115,21.9942591 5.68460336,13.3196663 C-2.99347825,4.64400029 0.761584769,2.17244427 1.07396994,1.78394958 C4.18386634,-1.32615434 4.6658627,0.0893829491 7.11449014,2.53732879 C9.6543641,5.07649576 5.04265719,5.9844143 9.03174073,9.97238745 Z" id="Stroke-1"></path>
                                </g>
                            </g>
                        </svg> 800.845.5025
                    </Link>
                </li>
                <li className="nav-item cx-nav__item cx-nav__item--no-border">
                    <Link className="cx-nav__link cx-nav__link--secondary" href="/about/branch-and-atm-locations/">
                        <svg aria-hidden="true" focusable="false" className="cx-icon" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g id="Iconly/Bold/Location" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="Location" transform="translate(3.500000, 2.000000)" fill="#000000" fill-rule="nonzero">
                                    <path d="M8.49344564,0 C13.1561184,0 17,3.71789185 17,8.31775805 C17,10.6356906 16.1570081,12.787628 14.7695,14.611575 C13.2388042,16.6235165 11.3521561,18.3764655 9.22854262,19.7524254 C8.74251142,20.0704162 8.3038733,20.0944155 7.77044902,19.7524254 C5.63473516,18.3764655 3.74808708,16.6235165 2.23050003,14.611575 C0.84198351,12.787628 0,10.6356906 0,8.31775805 C0,3.71789185 3.84388161,0 8.49344564,0 Z M8.49344564,5.77683196 C6.95165787,5.77683196 5.6942286,7.04779499 5.6942286,8.57675052 C5.6942286,10.1177057 6.95165787,11.3296704 8.49344564,11.3296704 C10.0362418,11.3296704 11.3057714,10.1177057 11.3057714,8.57675052 C11.3057714,7.04779499 10.0362418,5.77683196 8.49344564,5.77683196 Z"></path>
                                </g>
                            </g>
                        </svg> Locations &amp; ATMs
                    </Link>
                </li>
                <li className="nav-item cx-nav__item cx-nav__item--no-border">
                    <Link className="cx-nav__link cx-nav__link--secondary" href="/about/contact-us/">
                        <svg aria-hidden="true" focusable="false" className="cx-icon" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <title>Iconly/Bold/Message</title>
                            <g id="Iconly/Bold/Message" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="Message" transform="translate(2.000400, 3.000000)" fill="#000000" fill-rule="nonzero">
                                    <path d="M14.939,0 C16.28,0 17.57,0.53 18.519,1.481 C19.469,2.43 20,3.71 20,5.05 L20,5.05 L20,12.95 C20,15.74 17.73,18 14.939,18 L14.939,18 L5.06,18 C2.269,18 0,15.74 0,12.95 L0,12.95 L0,5.05 C0,2.26 2.259,0 5.06,0 L5.06,0 Z M16.07,5.2 C15.86,5.189 15.66,5.26 15.509,5.4 L15.509,5.4 L11,9 C10.42,9.481 9.589,9.481 9,9 L9,9 L4.5,5.4 C4.189,5.17 3.759,5.2 3.5,5.47 C3.23,5.74 3.2,6.17 3.429,6.47 L3.429,6.47 L3.56,6.6 L8.11,10.15 C8.67,10.59 9.349,10.83 10.06,10.83 C10.769,10.83 11.46,10.59 12.019,10.15 L12.019,10.15 L16.53,6.54 L16.61,6.46 C16.849,6.17 16.849,5.75 16.599,5.46 C16.46,5.311 16.269,5.22 16.07,5.2 Z"></path>
                                </g>
                            </g>
                        </svg> Contact Us
                    </Link>
                </li>
            </ul>
        </div>
    )
};