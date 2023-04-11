import Logo from 'components/Logo';
import React from 'react';
import styles from 'scss/components/Footer.module.scss';
import FooterMenu from './Nav';
import Icons from './Icons';
import UtilityNav from './UtilityNav';

interface Props {
  copyrightHolder?: string;
}

function Footer({ copyrightHolder = '' }: Props): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="cx-footer">
      <section className="cx-footer__header">
        <div className="cx-footer__wrapper">
            <Logo />
        </div>
      </section>
      <section className="cx-footer__main-nav">
        <div className="cx-footer__wrapper">
          <FooterMenu device="desktop" />
          <FooterMenu device="mobile" />
          <UtilityNav />
        </div>
      </section>
      <section className="cx-footer__info">
        <div className="cx-footer__wrapper">
          <ul className="cx-footer__identifiers">
            <li>
              <div id="ncua_eho_logos">
                
                <img src="/wp-content/themes/CXCU/images/ncua.svg" width="95" height="53" alt="NCUA" />
                
                
                <img src="/wp-content/themes/CXCU/images/equal-housing.svg" width="50" height="53" alt="NCUA" />
                
              </div>
            </li>
            <li>
              <div className="cx-footer__routing">
                <div>Routing #: 275982296</div>
                <div>NMLS ID 649316</div>
              </div>
            </li>
          </ul>
          <Icons />
        </div>
      </section>
      <section className="cx-footer__copyright">
        <div className="cx-footer__wrapper">
          &copy; {year}
        </div>
      </section>
    </footer>
  );
}

export default Footer;
