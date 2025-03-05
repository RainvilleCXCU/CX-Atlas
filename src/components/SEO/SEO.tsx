import Head from "next/head";

interface SEOProps {
	title: string;
	metaDesc: string;
	canonicalURL: string;
	ogLocale?: string;
	ogType: string;
	ogTitle: string;
	ogDescription: string;
	metaRobotsNoindex: string;
	metaRobotsNofollow: string;
	ogURL: string;
	breadcrumbs?: any;
	ogSite_Name: string;
	published_time: string;
	modified_time: string;
	ogImage: string;
	ogImageWidth: string;
	ogImageHeight: string;
	ogImageType: string;
	twitter_card: string;
	twitter_label1: string;
	twitter_data1: string;
	locationDetails?: any;
	pageType?: string;
}

const SEO = ({
	// These are some default values of everything that's being shown in the Head by Yoast for our current site
	title = "Connexus Credit Union - High Yields, Low Rates, Online Services",
	metaDesc = "Connexus Credit Union helps members reach their financial goals with higher yields, lower rates, and innovative online services.",
	canonicalURL = "https://www.connexuscu.org/",
	ogLocale = "en_US",
	ogType = "article",
	ogTitle = "Connexus Credit Union",
	ogDescription = "Connexus Credit Union helps members reach their financial goals with higher yields, lower rates, and innovative online services.",
	ogURL = "https://www.connexuscu.org/",
	breadcrumbs = [],
	ogSite_Name = "Connexus Credit Union",
	published_time = "",
	modified_time = "",
	ogImage = "https://www.connexuscu.org/wp-content/uploads/CCULogo.svg",
	ogImageWidth = "801",
	ogImageHeight = "486",
	ogImageType = "Image",
	metaRobotsNoindex = "",
	metaRobotsNofollow = "",
	twitter_card = "summary_large_image",
	twitter_label1 = "Est. reading time",
	twitter_data1 = "",
	locationDetails = null
}:SEOProps) => {

	//logic for the URL breadcrumbs in the Yoast <script> tag
	let i;
	let itemListElementArray = [];
	let logo = ogImage;
	for (i = 0; i < breadcrumbs.length; i++) {
		let object = `{"@type": "ListItem","position": ${i + 1},"name": "${
			breadcrumbs[i].text
		}","item": "${breadcrumbs[i].url}"}`;
		itemListElementArray.push(object);
	}

	canonicalURL = process.env.NEXT_PUBLIC_FRONTEND_URL ? canonicalURL.replace(process.env.NEXT_PUBLIC_WORDPRESS_URL, process.env.NEXT_PUBLIC_FRONTEND_URL) : canonicalURL;

	return (
		<Head>
			<title>{`${title} - ${ogSite_Name}`}</title>
			<meta name="description" content={metaDesc} />
			<meta name="robots" content={`${metaRobotsNoindex}, ${metaRobotsNofollow}`} />			
			<link
				rel="canonical"
				href={canonicalURL}
				className="yoast-seo-meta-tag"
			></link>
			<meta
				property="og:locale"
				content={ogLocale}
				className="yoast-seo-meta-tag"
			></meta>
			<meta
				property="og:type"
				content={ogType}
				className="yoast-seo-meta-tag"
			></meta>
			<meta
				property="og:title"
				content={ogTitle}
				className="yoast-seo-meta-tag"
			></meta>
			<meta
				property="og:description"
				content={ogDescription}
				className="yoast-seo-meta-tag"
			></meta>
			<meta
				property="og:url"
				content={ogURL}
				className="yoast-seo-meta-tag"
			></meta>
			<meta
				property="og:site_name"
				content={ogSite_Name}
				className="yoast-seo-meta-tag"
			></meta>
			<meta
				property="article:modified_time"
				content={modified_time}
				className="yoast-seo-meta-tag"
			></meta>
			<meta
				property="og:image"
				content={ogImage}
				className="yoast-seo-meta-tag"
			></meta>
			<meta
				property="og:image:width"
				content={ogImageWidth}
				className="yoast-seo-meta-tag"
			></meta>
			<meta
				property="og:image:height"
				content={ogImageHeight}
				className="yoast-seo-meta-tag"
			></meta>
			<meta
				property="og:image:type"
				content={ogImageType}
				className="yoast-seo-meta-tag"
			></meta>
			<meta
				name="twitter:card"
				content={twitter_card}
				className="yoast-seo-meta-tag"
			></meta>
			<meta
				name="twitter:label1"
				content={twitter_label1}
				className="yoast-seo-meta-tag"
			></meta>
			<meta
				name="twitter:data1"
				content={twitter_data1}
				className="yoast-seo-meta-tag"
			></meta>
			<script type="application/ld+json" className="yoast-schema-graph"
				dangerouslySetInnerHTML={{
					__html: `{"@context":"https://schema.org","@graph":[{"@type":"WebPage","@id":"${canonicalURL}","url":"${canonicalURL}","name":"${title} - ${title}","isPartOf":{"@id":"https://www.connexuscu.org/#website"},"primaryImageOfPage":{"@id":"${canonicalURL}#primaryimage"},"image":{"@id":"${canonicalURL}#primaryimage"},"thumbnailUrl":"${ogImage}","datePublished":"${published_time}","dateModified":"${modified_time}","description":"${metaDesc}","breadcrumb":{"@id":"${canonicalURL}#breadcrumb"},"inLanguage":"${ogLocale}","potentialAction":[{"@type":"ReadAction","target":["${canonicalURL}"]}]},{"@type":"ImageObject","inLanguage":"${ogLocale}","@id":"${canonicalURL}#primaryimage","url":"${ogImage}","contentUrl":"${ogImage}","width":${ogImageWidth},"height":${ogImageHeight}},{"@type":"BreadcrumbList","@id":"${ogURL}#breadcrumb","itemListElement":[${itemListElementArray}]},{"@type":"WebSite","@id":"https://www.connexuscu.org/#website","url":"https://www.connexuscu.org/","name":"Connexus Credit Union","description":"High Yields, Low Rates, Online Services","publisher":{"@id":"https://www.connexuscu.org/#organization"},"potentialAction":[{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://www.connexuscu.org/?s={search_term_string}"},"query-input":"required name=search_term_string"}],"inLanguage":"${ogLocale}"},{"@type":"Organization","@id":"https://www.connexuscu.org/#organization","name":"Connexus Credit Union","url":"https://www.connexuscu.org/","logo":{"@type":"ImageObject","inLanguage":"${ogLocale}","@id":"https://www.connexuscu.org/#/schema/logo/image/","url":"${logo}","contentUrl":"${logo}","width":145,"height":54,"caption":"Connexus Credit Union"},"image":{"@id":"https://www.connexuscu.org/#/schema/logo/image/"}},
					${
						locationDetails && `{
						"@context": "https://schema.org",
						"@type": "BankOrCreditUnion",
						"name": "${ogSite_Name}",
						"address": {
							"@type": "PostalAddress",
							"streetAddress": "${locationDetails.address}",
							"addressLocality": "${locationDetails.city}",
							"addressRegion": "${locationDetails.state}",
							"postalCode": "${locationDetails.zip}",
							"addressCountry": "US"
						},
						"openingHours": [],
						"description": {},
						"telephone": "${locationDetails.contact}",
						"geo": { "latitude": ${locationDetails.lat}, "longitude": ${locationDetails.lng} }
					}`}]}`
				}} 
			/>
		</Head>
		
	);
};

export default SEO;
