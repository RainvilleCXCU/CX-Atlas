import { client } from "client";
import Head from "next/head";

interface SEOProps {
	title: string;
	metaDesc: string;
	canonicalURL: string;
	ogLocale: string;
	ogType: string;
	ogTitle: string;
	ogDescription: string;
	ogURL: string;
	ogSite_Name: string;
	modified_time: string;
	ogImage: string;
	ogImageWidth: string;
	ogImageHeight: string;
	ogImageType: string;
	twitter_card: string;
	twitter_label1: string;
	twitter_data1: string;
}

const SEO: React.FC<SEOProps> = ({
	// These are some default values of everything that's being shown in the Head by Yoast for our current site
	title = "Connexus Credit Union - High Yields, Low Rates, Online Services",
	metaDesc = "Connexus Credit Union helps members reach their financial goals with higher yields, lower rates, and innovative online services.",
	canonicalURL = "https://www.connexuscu.org/",
	ogLocale = "en_US",
	ogType = "article",
	ogTitle = "Connexus Credit Union",
	ogDescription = "Connexus Credit Union helps members reach their financial goals with higher yields, lower rates, and innovative online services.",
	ogURL = "https://www.connexuscu.org/",
	ogSite_Name = "Connexus Credit Union",
	modified_time = "",
	ogImage = "http://localhost:10026/wp-content/uploads/2022/02/LogoConnexus.svg",
	ogImageWidth = "801",
	ogImageHeight = "486",
	ogImageType = "Image",
	twitter_card = "summary_large_image",
	twitter_label1 = "Est. reading time",
	twitter_data1 = "",
}) => {
	const { useQuery } = client;
	const generalSettings = useQuery().generalSettings;

	return (
		<Head>
			<title>{`${title} - ${generalSettings.title}`}</title>
			<meta name="description" content={metaDesc} />
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
			<script
				type="application/ld+json"
				className="yoast-schema-graph"
			>{`{"@context":"https://schema.org","@graph":[{"@type":"WebPage","@id":"https://www.connexuscu.org/loans/recreational/","url":"https://www.connexuscu.org/loans/recreational/","name":"Recreational Loans - Connexus Credit Union","isPartOf":{"@id":"https://www.connexuscu.org/#website"},"primaryImageOfPage":{"@id":"https://www.connexuscu.org/loans/recreational/#primaryimage"},"image":{"@id":"https://www.connexuscu.org/loans/recreational/#primaryimage"},"thumbnailUrl":"https://www.connexuscu.org/wp-content/uploads/2018_AL001_322_CUNAMutual_680x680.webp","datePublished":"2023-03-27T12:30:15+00:00","dateModified":"2023-06-01T16:14:22+00:00","description":"Apply for a Recreational Loan. Loan rates and terms for boats, campers, RVs, ATVs, UTVs, personal watercraft, and snowmobiles.","breadcrumb":{"@id":"https://www.connexuscu.org/loans/recreational/#breadcrumb"},"inLanguage":"en-US","potentialAction":[{"@type":"ReadAction","target":["https://www.connexuscu.org/loans/recreational/"]}]},{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.connexuscu.org/loans/recreational/#primaryimage","url":"https://www.connexuscu.org/wp-content/uploads/2018_AL001_322_CUNAMutual_680x680.webp","contentUrl":"https://www.connexuscu.org/wp-content/uploads/2018_AL001_322_CUNAMutual_680x680.webp","width":680,"height":680},{"@type":"BreadcrumbList","@id":"https://www.connexuscu.org/loans/recreational/#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.connexuscu.org/"},{"@type":"ListItem","position":2,"name":"Loans","item":"https://www.connexuscu.org/loans/"},{"@type":"ListItem","position":3,"name":"Recreational Loans"}]},{"@type":"WebSite","@id":"https://www.connexuscu.org/#website","url":"https://www.connexuscu.org/","name":"Connexus Credit Union","description":"High Yields, Low Rates, Online Services","publisher":{"@id":"https://www.connexuscu.org/#organization"},"potentialAction":[{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://www.connexuscu.org/?s={search_term_string}"},"query-input":"required name=search_term_string"}],"inLanguage":"en-US"},{"@type":"Organization","@id":"https://www.connexuscu.org/#organization","name":"Connexus Credit Union","url":"https://www.connexuscu.org/","logo":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.connexuscu.org/#/schema/logo/image/","url":"https://www.connexuscu.org/wp-content/uploads/2022/02/LogoConnexus.svg","contentUrl":"https://www.connexuscu.org/wp-content/uploads/2022/02/LogoConnexus.svg","width":145,"height":54,"caption":"Connexus Credit Union"},"image":{"@id":"https://www.connexuscu.org/#/schema/logo/image/"}}]}`}</script>
		</Head>
	);
};

export default SEO;
