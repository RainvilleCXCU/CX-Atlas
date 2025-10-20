import Logo from "components/Logo";
import FooterMenu from "./Nav";
import Icons from "./Icons";
import UtilityNav from "./UtilityNav";
import Image from "next/image";
import { gql } from "@apollo/client";
import dynamic from "next/dynamic";
import { memo } from 'react';

interface Props {
	copyrightHolder?: string;
	title?: string;
	logo?: string;
	desktopLogo?: string;
	desktopLogoWidth?: string;
	mobileLogo?: string;
	mobileLogoWidth?: string;
	logoText?: string;
	menuItems?;
	footerUtilities?;
	footerAppIcons?;
	footerSocialIcons?;
}

const Footer = ({ copyrightHolder = "", title, logo, desktopLogo, mobileLogo, desktopLogoWidth, mobileLogoWidth, logoText, menuItems, footerUtilities, footerAppIcons, footerSocialIcons }: Props): JSX.Element => {
	const year = new Date().getFullYear();

	// copies the routing number to the clipboard
	const copyRoutingNumber = () => {
		navigator.clipboard.writeText("275982296");
		let copyBtn = document.getElementById(
			"copy-routing-number-button"
		) as HTMLInputElement | null;

		// Display a message that the routing number has been copied
		let copiedMessage = document.createElement("span");
		copiedMessage.textContent = " Copied";
		copiedMessage.classList.add("copied-message");
		copyBtn.appendChild(copiedMessage);

		// disable clicks
		copyBtn.disabled = true;

		// Remove the "copied" message after 2 seconds and re-enable clicks
		setTimeout(() => {
			copyBtn.removeChild(copiedMessage);
			// re-enable clicks
			copyBtn.disabled = false;
		}, 2000);
	};

	return (
		<footer className="cx-footer">
			<section className="cx-footer__header">
				<div className="cx-footer__wrapper">
					<Logo title={logoText} logo={logo} desktopLogo={desktopLogo} mobileLogo={mobileLogo} desktopLogoWidth={desktopLogoWidth} mobileLogoWidth={mobileLogoWidth} width={240} />
				</div>
			</section>
			<section className="cx-footer__main-nav">
				<div className="cx-footer__wrapper">
					<FooterMenu menuItems={menuItems} device="desktop" />
					<FooterMenu menuItems={menuItems}  device="mobile" />
					<UtilityNav footerUtilities={footerUtilities} />
				</div>
			</section>
			<section className="cx-footer__info">
				<div className="cx-footer__wrapper">
					<ul className="cx-footer__identifiers">
						<li>
							<div id="ncua_eho_logos">
								<Image
									src="/wp-content/themes/CXCU/images/ncua.svg"
									width="95"
									height="53"
									alt="NCUA"
								/>

								<Image
									src="/wp-content/themes/CXCU/images/equal-housing.svg"
									className="slim-margin--horizontal-left"
									width="50"
									height="53"
									alt="equal housing opportunity"
								/>
							</div>
						</li>
						<li>
							<div className="cx-footer__routing">
								<div>
									Routing #: 275982296
									<button
										id="copy-routing-number-button"
										title="Copy to clipboard"
										aria-label="Copy Routing Number to Clipboard"
										onClick={copyRoutingNumber}
									>
										<Image
											src="/wp-content/themes/CXCU/images/copy-icon.svg"
											width="15"
											height="15"
											alt="copy to clipboard"
										/>
									</button>
									{}
								</div>
							</div>
						</li>
					</ul>
					<Icons footerAppIcons={footerAppIcons} footerSocialIcons={footerSocialIcons} />
				</div>
			</section>
			<section className="cx-footer__copyright">
				<div className="cx-footer__wrapper">
					&copy; {year} {copyrightHolder}
				</div>
			</section>
		</footer>
	);
}

Footer.fragments = {
    entry: gql`
      fragment FooterFragment on FooterSettings {
		footerAppIcons
		footerSocialIcons
	  }
    `,
  };

// export { Footer };

const MemoizedFooter = memo(Footer);
export default MemoizedFooter;
