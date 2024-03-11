import { gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import { ThirdPartySettingsFragment, GTM, HotJar, Personyze, Qualtrics, Spectrum, Siteimprove } from '../components/ThirdParty';
import {
  Header,
  Footer,
  MenuNavigation,
  SEO,
} from '../components';
import { parseHtml } from 'lib/parser';
import Alert from 'components/Alerts/Alert';
import Loading from 'components/common/loading';
import { getNextStaticProps } from '@faustwp/core';
import { GetStaticPropsContext } from 'next';
import Container from 'components/Blocks/Container';
import Columns from 'components/Blocks/Columns';
import Column from 'components/Blocks/Column';
import SearchBar from 'components/Search/SearchBar';

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title: siteTitle, description: siteDescription, logo: siteLogo, footerText: footerText, databaseId: databaseId } =
    props?.data?.generalSettings;
  const { gtmId, gtmEnabled, hotjarEnabled, hotjarId, personyzeDomains, personyzeEnabled, personyzeId, spectrumId, spectrumEnabled, qualtricsId, qualtricsEnabled, siteimproveId, siteimproveEnabled } = props?.data?.thirdPartySettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { title, content, seo, link, featuredImage } = props?.data?.page ?? { title: '' };
  const headerSettings = props?.data?.headerSettings; 
  const { footerUtilities, footerAppIcons, footerSocialIcons } = props?.data?.footerSettings;

  return (
    <>
      <SEO
				title={title}
				metaDesc={seo?.metaDesc}
				canonicalURL={seo?.canonical ? seo?.canonical : link} //I'm unsure about this. Changing the canonical URL in Yoast doesn't seem to do anything...
				ogLocale={seo?.locale} // Not sure where this is in the page object
				ogType={seo?.opengraphType}
				ogTitle={seo?.title}
				ogDescription={seo?.opengraphDescription}
				ogURL={seo?.opengraphUrl}
				breadcrumbs={seo?.breadcrumbs}
				ogSite_Name={seo?.opengraphSiteName}
				published_time={seo?.opengraphPublishedTime}
				modified_time={seo?.opengraphModifiedTime}
				ogImage={seo?.opengraphImage?.mediaItemUrl}
				ogImageWidth={seo?.opengraphImage?.mediaDetails.width}
				ogImageHeight={seo?.opengraphImage?.mediaDetails.height}
				ogImageType={seo?.opengraphImage?.mimeType}
				twitter_card={"summary_large_image"} // Not sure where this is in the page object
				twitter_label1={"Est. reading time"} // Not sure where this is in the page object
				twitter_data1={seo?.readingTime + " minutes"}
  />
			<GTM
        id={gtmId}
        enabled={gtmEnabled} />
      <HotJar
        id={hotjarId}
        enabled={hotjarEnabled} />
			<Personyze
        id={personyzeId}
        enabled={personyzeEnabled}
        domains={personyzeDomains} />
			<Alert id={databaseId} />
			<Loading /> 
			<Header
				title={title}
				description={siteDescription}
				logo={siteLogo}
        menuItems={primaryMenu}
        headerSettings={headerSettings}
			/>
			<Container>
				<Columns>
					<div id="page" className="hfeed site container error404">
						<div id="content" className="site-content">
							<div id="primary" className="content-area">
								<main id="main" className="site-main site-width">
									<div className="wrap">
										<div className="entry-content">
											<div className="oops-title">
												<h2> Oops, This Page Could Not Be Found!</h2>{" "}
												<span className="awb-title-spacer"></span>
												<div className="title-sep-container">
													<div className="title-sep sep-double sep-solid"></div>
												</div>
											</div>
											<div className="is-layout-flex wp-block-columns">
												<Column classNames="is-layout-flow wp-block-column">
													<div className="error-message">404</div>
												</Column>
												<Column classNames="is-layout-flow wp-block-column">
													<h3>Helpful Links</h3>
													<ul id="menu-404-menu" className="menu">
														<li>
															<a href="/">Home</a>
														</li>
														<li>
															<a href="/about/contact-us/">Contact Us</a>
														</li>
														<li>
															<a href="https://onlinebanking.connexuscu.org/">
																Online Banking Login
															</a>
														</li>
													</ul>
												</Column>
												<Column classNames="is-layout-flow wp-block-column">
													<h3>Search Our Website</h3>
													<p>
														Can&apos;t find what you need? Take a moment and search
														below!
													</p>
													<SearchBar showBtn={false} />
												</Column>
											</div>
										</div>
									</div>
								</main>
							</div>
						</div>
					</div>
				</Columns>
			</Container>

			<Footer copyrightHolder={footerText} menuItems={footerMenu} logo={siteLogo} footerUtilities={footerUtilities} footerAppIcons={footerAppIcons} footerSocialIcons={footerSocialIcons} />
			<Qualtrics
        id={qualtricsId}
        enabled={qualtricsEnabled} />
			<Spectrum
        id={spectrumId}
        enabled={spectrumEnabled} />
			<Siteimprove
        id={siteimproveId}
        enabled={siteimproveEnabled} />
    </>
  );
}

Component.query = gql`
  ${BlogInfoFragment}
  ${MenuNavigation.fragments.entry}
  ${ThirdPartySettingsFragment}
  ${Alert.fragments.entry}
  query Get404(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    generalSettings {
      ...BlogInfoFragment
    }
    headerSettings {
      headerUtilities
    }
    footerSettings {
      footerUtilities
      footerAppIcons
      footerSocialIcons
    }
    thirdPartySettings {
      ...ThirdPartySettingsFragment
    }

    cxAlerts: cXAlerts {
        edges {
          node{
            ...AlertsFragment
          }
        }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }, first: 255) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }, first: 255) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

Component.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};


export async function getStaticProps(context: GetStaticPropsContext) {
	return getNextStaticProps(context, {
		Page: Component,
	});
  }