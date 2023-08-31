import { getNextServerSideProps, getNextStaticProps } from "@faustjs/next";
import { client } from "client";
import { Footer, Header } from "components";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import {
	showDetailsContext,
	selectedLocationContext,
} from "components/Locations/locationsContext";
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
import HotJar from "components/ThirdParty/hotjar";
import Qualtrics from "components/ThirdParty/qualtrics";
import Spectrum from "components/ThirdParty/spectrum";
import AddressBar from "components/Locations/searchbar";
import { Store } from 'context/store';
import { getGeoLocation } from "lib/location/geolocation";
import { getLatLngByLocation, getLocationByLatLng } from "lib/location/geocode";
import { useRouter } from "next/router";

export default function Page({ locationSettings, location }) {
	const { useQuery } = client;
	const { query = {}, push } = useRouter();


	const [state, setState] = useContext(Store);

	const { generalSettings } = useQuery();

	const [data, setData] = useState(null);
	const [length, setLength] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [showDetails, setShowDetails] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState(null);

	useEffect(() => {
		setLoading(true);
		console.log(`Search: ${state?.location?.search} - ${location}`);
		if (location && location[0] && !state?.location?.search) {
			getLatLngByLocation({ address: formatSearch(location) }).then(response => {
				fetchLocations({ lat: response.lat(), lng: response.lng() });
			});
		}
		else if (state?.location?.search) {
			getLatLngByLocation({ address: state?.location?.search }).then(response => {
				fetchLocations({ lat: response.lat(), lng: response.lng() });
			});
		} else {
			getGeoLocation()
			.then(location => {
				getLocationByLatLng({ lat: location.coords.latitude, lng: location.coords.longitude })
				.then(data => {
					console.log(`User Location: ${data}`);
					data && push(`/about/branch-and-atm-locations/find-location/${formatSearch(data)}/`, undefined, { shallow: true });
				});
			})
			.catch(err => {
				fetchLocations({ lat: locationSettings.startLatLng?.split[','][0], lng: locationSettings.startLatLng?.split[','][1], autoload: 1 });
			})
		}
	}, [state?.location?.search]);

	useEffect(() => {
		setLoading(true);
		setState({
			...state,
			location: {
				...state.location,
				search: formatSearch(location)
			}
		});
	}, [location]);

	useEffect(() => {
		setLoading(true);
		setState({
			...state,
			location: {
				...state.location,
				search: formatSearch(query?.location)
			}
		});
	}, [query?.location]);

	

	useEffect(() => {
		setState({
			...state,
			location: {
				...state.location,
				settings: locationSettings
			}
		});
	}, [locationSettings]);

	const fetchLocations = ({ lat, lng, autoload = 0 }) => {

		fetch(
			`/wp-admin/admin-ajax.php?action=store_search&lat=${lat}&lng=${lng}&max_results=25&search_radius=25&autoload=${autoload}`
		)
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				setLength(Object.keys(data).length);
				setLoading(false);
			});
	}

	const formatSearch = (address) => {
		return address ? address.toString().replaceAll('+', ' ') : '';
	}

	return (
		<>
			<Header
				title={generalSettings.title}
				description={generalSettings.description}
				logo={generalSettings.logo}
			/>

			<Head>
				<title>{`Locations - ${generalSettings.title}`}</title>
			</Head>
			<GTM />
			<HotJar />
			<showDetailsContext.Provider value={{ showDetails, setShowDetails }}>
				<selectedLocationContext.Provider
					value={{ selectedLocation, setSelectedLocation }}
				>
					<main className="content content-single">
						<div className="wrap">
							<Container align="full" classNames={`no-margin`}>
								<Columns classNames={`no-margin`}>
									<Column>
										<PageTitle heading="Locations & ATMs" />
									</Column>
								</Columns>
							</Container>
							<Container align="full" classNames={`no-margin`}>
								<Columns classNames={`no-margin`}>
									<Column>
										<Wrapper apiKey={locationSettings.apiBrowserKey}>
											<div
												id="wpsl-wrap"
												className="wpsl-wrap wpsl-store-below wpsl-default-filters"
											>
												<div className="wpsl-search wpsl-clearfix wpsl-checkboxes-enabled wpsl-geolocation-run">

													<AddressBar />
												</div>
												<Map lat={45} lng={-89} locationSettings={locationSettings} markers={data} />
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
														{data &&
															<LocationListings data={data} />
															|| <div>There are locations in this area</div>
														}
													</div>
												</div>
												<LocationDetails />
											</div>
										</Wrapper>
									</Column>
								</Columns>
							</Container>
						</div>
					</main>
				</selectedLocationContext.Provider>
			</showDetailsContext.Provider>

			<Footer copyrightHolder={generalSettings.title} />
			<Qualtrics />
			<Spectrum />
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { req, res, query } = context;

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
	const location = query?.location;
	return getNextServerSideProps(context, {
		Page,
		client,
		props: {
			locationSettings: data.locationSettings,
			location: location ? location : null
		}
	});
}
