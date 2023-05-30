import { getNextStaticProps } from "@faustjs/next";
import { client } from "client";
import { Footer, Header } from "components";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import LocationListings from "components/Locations/listings";
import LocationDetails from "components/Locations/location-details";
import GTM from "components/ThirdParty/gtm";

export default function Page() {
	const { useQuery } = client;
	const generalSettings = useQuery().generalSettings;

	const [data, setData] = useState(null);
	const [length, setLength] = useState(null);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch(
			"/wp-admin/admin-ajax.php?action=store_search&lat=44.9810012&lng=-89.7192132&max_results=25&search_radius=25&autoload=1"
		)
			.then((res) => res.json())
			.then((data) => {
				setData(data);
        setLength(Object.keys(data).length);
				setLoading(false);
			});
	}, []);

	return (
		<>
			<Header
				title={generalSettings.title}
				description={generalSettings.description}
				logo={generalSettings.logo}
			/>

			<Head>
				<title>Locations - {generalSettings.title}</title>
			</Head>
			<GTM />

			<main className="content content-single">
				<div className="wrap">
					<div id="wpsl-wrap" className="wpsl-wrap wpsl-store-below wpsl-default-filters">
						<div className="wpsl-search wpsl-clearfix wpsl-checkboxes-enabled wpsl-geolocation-run"></div>
						<div id="wpsl-gmap" className="wpsl-gmap-canvas" style={{ position: "relative", overflow: "hidden" }}></div>
						<div id="wpsl-result-list">
							<div id="wpsl-stores">
								<div className="cx-location-listing__title wpsl-location--section">
									<em>
										<small>
											<span id="store-count">{length}</span>&nbsp;results
										</small>
									</em>
								</div>
								<LocationListings data={data} />
							</div>
						</div>
						<LocationDetails data={data} />
					</div>
				</div>
			</main>

			<Footer copyrightHolder={generalSettings.title} />
		</>
	);
}

export async function getStaticProps(context: GetStaticPropsContext) {
	return getNextStaticProps(context, {
		Page,
		client,
	});
}
