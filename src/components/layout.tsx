// components/layout.js

import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import GTM from "./ThirdParty/gtm";
import SEO from "./SEO/SEO";
import { client } from "client";
import { parseHtml } from "lib/parser";
import Alert from "./Alerts/Alert";
import HotJar from "./ThirdParty/hotjar";
import Qualtrics from "./ThirdParty/qualtrics";
import Spectrum from "./ThirdParty/spectrum";
import Personyze from "./ThirdParty/personyze";
import Loading from "./common/loading";
import Siteimprove from "./ThirdParty/siteimprove";

export default function Layout({ page, children = <></> }) {
	const { useQuery } = client;
	const generalSettings = useQuery().generalSettings;
	const seo = page?.seo;

	return (
		<>
			<SEO
				title={page?.title()}
				metaDesc={seo?.metaDesc}
				canonicalURL={seo?.canonical ? seo?.canonical : page?.link} //I'm unsure about this. Changing the canonical URL in Yoast doesn't seem to do anything...
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
			<GTM />
			<HotJar />
			<Personyze />
			<Alert id={page?.databaseId} />
			<Loading />
			<Header
				title={generalSettings.title}
				description={generalSettings.description}
				logo={generalSettings.logo}
			/>
			<div id="page" className="container site">
				<main id="main" className="content content-single">
					<article className="entry-content">
						{parseHtml(page?.content() ?? "")}
					</article>
				</main>
			</div>

			<Footer copyrightHolder={generalSettings.footerText} />
			<Qualtrics />
			<Spectrum />
			<Siteimprove />
		</>
	);
}
