import React from "react";
import { client } from "client";
import { Header, Footer } from "../components";
import GTM from "components/ThirdParty/gtm";
import Head from "next/head";
import { GetStaticPropsContext } from "next";
import { getNextStaticProps } from "@faustjs/next";
import HotJar from "components/ThirdParty/hotjar";
import Qualtrics from "components/ThirdParty/qualtrics";
import Spectrum from "components/ThirdParty/spectrum";
import Personyze from "components/ThirdParty/personyze";
import Container from "components/Blocks/Container";
import Columns from "components/Blocks/Columns";
import Column from "components/Blocks/Column";
import SearchBar from "components/Search/SearchBar";
import NotFound from "components/404";

export default function Page(): JSX.Element {
	const { useQuery } = client;
	const generalSettings = useQuery().generalSettings;

	return (
		<>
			<Head>
				<title>{`Page not found - ${generalSettings.description}`}</title>
			</Head>
			<GTM />
			<HotJar />
			<Personyze />
			<Header
				title={generalSettings?.title}
				description={generalSettings?.description}
			/>
			<NotFound />
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
														Can't find what you need? Take a moment and search
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
			<Footer copyrightHolder={generalSettings?.title} />
			<Qualtrics />
			<Spectrum />
		</>
	);
}

export async function getStaticProps(context: GetStaticPropsContext) {
	console.log('PATH');
	console.log(context.params);
	return getNextStaticProps(context, {
		Page,
		client,
		revalidate: parseInt(process.env.PAGE_REVALIDATION)
			? parseInt(process.env.PAGE_REVALIDATION)
			: null,
	});
}
