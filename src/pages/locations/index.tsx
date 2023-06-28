import { getNextStaticProps } from "@faustjs/next";
import { client } from "client";
import { Footer, Header } from "components";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import LocationListings from "components/Locations/listings";
import LocationDetails from "components/Locations/location-details";
import GTM from "components/ThirdParty/gtm";
import { Wrapper } from "@googlemaps/react-wrapper";
import Map from "components/Map/map";
import { gql, useQuery } from "@apollo/client";
import apolloClient from "apolloClient";
import { LocationSettingsFragment } from "fragments/LocationSettings";
import PageTitle from "components/Blocks/PageTitle";
import Container from "components/Blocks/Container";
import Columns from "components/Blocks/Columns";
import Column from "components/Blocks/Column";

export default function Page({locationSettings}) {
	const { useQuery } = client;
	const { generalSettings } = useQuery();

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
					<Container align="full" classNames={`no-margin`}>
						<Columns classNames={`no-margin`}>
							<Column>
								<PageTitle heading="Locations & ATMs" />
							</Column>
						</Columns>
					</Container>
					<div id="wpsl-wrap" className="wpsl-wrap wpsl-store-below wpsl-default-filters">
						<div className="wpsl-search wpsl-clearfix wpsl-checkboxes-enabled wpsl-geolocation-run"></div>
						<Wrapper apiKey={"AIzaSyBkwlFDeIrWrP3N6CVboRjeT1v9iUPPnb0"}>
							<Map lat={45} lng={-89} locationSettings={locationSettings} />
						</Wrapper>
						{/* <div id="wpsl-gmap" className="wpsl-gmap-canvas" style={{ position: "relative", overflow: "hidden" }}></div> */}
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
						<LocationDetails />
					</div>

					<Container classNames={`no-margin`}>
						<Columns classNames={`no-margin`}>
							<Column>
								First Column
							</Column>
							<Column>
								Second Column
							</Column>
						</Columns>
					</Container>
				</div>
			</main>

			<Footer copyrightHolder={generalSettings.title} />
		</>
	);
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const { data } = await apolloClient.query({
        query: gql`
		${LocationSettingsFragment}
        query LocationSettings {
			locationSettings {
				...LocationSettingsFragment
			}
          }
      `,
    });
	console.log('Get Static');
	console.log(JSON.stringify(data));
	return getNextStaticProps(context, {
		Page,
		client,
        props: {
			locationSettings: data.locationSettings
        }
	});
}
