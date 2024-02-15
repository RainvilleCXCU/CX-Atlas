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
import { Store } from "context/store";
import { getGeoLocation } from "lib/location/geolocation";
import {
	distance,
	getLatLngByLocation,
	getLocationByLatLng,
} from "lib/location/geocode";
import { useRouter } from "next/router";
import Personyze from "components/ThirdParty/personyze";
import { parseHtml } from "lib/parser";
import Loading from "components/common/loading";

export default function Page() {
	const { useQuery } = client;
	const { query = {}, push } = useRouter();

	const location = query.location;


	const [state, setState] = useContext(Store);

	const { generalSettings, widgetSettings } = useQuery();
	
	const {apiBrowserKey,
		mapType,
		zoomLevel,
		urlLabel,
		emailLabel,
		phoneLabel,
		streetview,
		startLatlng,
		startMarker,
		storeMarker,
		typeControl,
		scrollwheel,
		searchRadius,
		controlPosition,
		autoZoomLevel,
		markerIconProps,
		distanceUnit
	} = useQuery().locationSettings;

	const locationSettings = {
		apiBrowserKey,
		mapType,
		zoomLevel,
		urlLabel,
		emailLabel,
		phoneLabel,
		streetview,
		startLatlng,
		startMarker,
		storeMarker,
		typeControl,
		scrollwheel,
		searchRadius,
		controlPosition,
		autoZoomLevel,
		markerIconProps,
		distanceUnit
	}

	const [data, setData] = useState(null);
	const [length, setLength] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [showDetails, setShowDetails] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState(null);

	console.log('LOAD LOCATIONS INDEX');
	console.log(JSON.stringify(location));
	console.log(JSON.stringify(state?.location?.search))

	useEffect(() => {
		setLoading(true);
		console.log(`Search: ${state?.location?.search} - ${location}`);
		if (location && location !== '' && location == state?.location?.search) {
			return;
		}

		if (location && !state?.location?.search) {
			getLatLngByLocation({ address: formatSearch(location) })
				.then((response) => {
					const { geometry } = response[0];
					const { types } = response[0];
					console.log('First GetLatLngByLoc')
					fetchLocations({
						lat: geometry?.location.lat(),
						lng: geometry?.location.lng(),
						bounds: types.includes("administrative_area_level_1")
							? geometry?.bounds
							: null,
					});
					data &&
						push(
							`/about/branch-and-atm-locations/find-location/${location}/`,
							undefined,
							{ shallow: false }
						);

				})
				.catch((e) => {
					console.log("NO LOCATION");
					setData([]);
					setLength(0);
				});
		} else if (state?.location?.search) {
			getLatLngByLocation({ address: state?.location?.search })
				.then((response) => {
					const { location, bounds } = response[0].geometry;
					const { types } = response[0];
					console.log('Second GetLatLngByLoc')
					fetchLocations({
						lat: location.lat(),
						lng: location.lng(),
						bounds: types.includes("administrative_area_level_1")
							? bounds
							: null,
					});
					data &&
						push(
							`/about/branch-and-atm-locations/find-location/${state?.location?.search}/`,
							undefined,
							{ shallow: false }
						);
				})
				.catch((e) => {
					console.log("NO LOCATION");
					setData([]);
					setLength(0);
				});
		} else {
			getGeoLocation()
				.then((location) => {
					getLocationByLatLng({
						lat: location.coords.latitude,
						lng: location.coords.longitude,
					}).then((data) => {
						console.log('GET GEO LOCATION')
						fetchLocations({
							lat: location.coords.latitude,
							lng: location.coords.longitude,
						});
						data &&
							push(
								`/about/branch-and-atm-locations/find-location/${formatSearch(
									data
								)}/`,
								undefined,
								{ shallow: false }
							);
					});
				})
				.catch((err) => {
					console.log(`Err: ${err}`)
					fetchLocations({
						lat: locationSettings.startLatlng?.split[","] ? locationSettings.startLatlng?.split[","][0] : 0,
						lng: locationSettings.startLatlng?.split[","] ? locationSettings.startLatlng?.split[","][1] : 0,
						autoload: 1,
					});
				});
		}
		return () => {
			console.log('Cleanup location search');
		}
	}, [state?.location?.search]);

	// useEffect(() => {
	// 	console.log('Location Chance');
	// 	console.log(location)
	// 	console.log(state?.location?.search)
	// 	if (reformatSearch(location) !== state?.location?.search) {
	// 		setLoading(true);
	// 		setState({
	// 			...state,
	// 			location: {
	// 				...state.location,
	// 				search: reformatSearch(location),
	// 			},
	// 		});
	// 	}
	// }, [location, state?.location?.search]);

	useEffect(() => {
		console.log('SET LOCATION SETTINGS');
		console.log(locationSettings);
		setState({
			...state,
			location: {
				...state.location,
				settings: locationSettings,
			},
		});
	}, []);

	const resetSearchResults = () => {
		setShowDetails(false);
		setLength(0);
		setData([]);
	};

	const defaultRadius = () => {
		const regex = new RegExp(/\[([0-9]+)\]/, "i");
		console.log(locationSettings.searchRadius);
		return locationSettings.searchRadius.match(regex)[1];
	};

	const fetchLocations = ({ lat, lng, autoload = 0, bounds = null }) => {
		resetSearchResults();

		// autoload = state?.location?.search && state?.location?.search !== '' ? autoload : 1;
		// console.log('AutoLoad');
		// console.log(autoload);
		// console.log(JSON.stringify(state?.location));
		// console.log(location);

		const boundsRad = bounds
			? distance(
				bounds.toJSON().north,
				bounds.toJSON().east,
				bounds.toJSON().south,
				bounds.toJSON().east
			) / 2
			: null;

		let radius = boundsRad
			? boundsRad
			: state?.location?.searchRadius
				? Math.max(state?.location?.searchRadius, parseInt(defaultRadius()))
				: defaultRadius();

		fetch(
			`/wp-admin/admin-ajax.php?action=store_search&lat=${lat}&lng=${lng}&max_results=25&search_radius=${radius}&autoload=${autoload}`
		)
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				setLength(Object.keys(data).length);
				setLoading(false);
				console.log('FETCH FINISHED');
				console.log(JSON.stringify(location))
				if (location && location !== state?.location?.search) {
					setState({
						...state,
						location: {
							...state.location,
							search: location
						},
					});
				}
			});
	};

	const formatSearch = (address) => {
		return address ? address.toString().replaceAll("+", " ") : "";
	};
    const reformatSearch = (address) => {
        console.log('Format Search');
        console.log(address);
        return address?.replaceAll(' ', '+');
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
			<Personyze />
			<HotJar />
			<Loading />
			<showDetailsContext.Provider value={{ showDetails, setShowDetails }}>
				<selectedLocationContext.Provider
					value={{ selectedLocation, setSelectedLocation }}
				>
					<div id="page" className="container site">
						<main className="content content-single">
							<article className="entry-content">
								<Container align="full" classNames={`no-margin`}>
									<Columns classNames={`no-margin`}>
										<Column>
											<PageTitle heading="Locations & ATMs" />
										</Column>
									</Columns>
								</Container>
								<Container align="full">
									<Columns classNames={`no-margin`}>
										<Column>
											<Wrapper
												apiKey={locationSettings.apiBrowserKey}
												libraries={["places"]}
											>
												<div
													id="wpsl-wrap"
													className="wpsl-wrap wpsl-store-below wpsl-default-filters"
												>
													<div className="wpsl-search wpsl-clearfix wpsl-checkboxes-enabled wpsl-geolocation-run">
														<AddressBar />
													</div>
													<Map
														lat={45}
														lng={-89}
														locationSettings={locationSettings}
														markers={data}
													/>
													<div id="wpsl-result-list">
														<div id="wpsl-stores">
															<div className="cx-location-listing__title wpsl-location--section">
																<em>
																	<small>
																		<span id="store-count">{length}</span>
																		&nbsp;results
																	</small>
																</em>
															</div>
															{(data && <LocationListings data={data} />) || (
																<div className="wpsl-no-results-msg">
																	No results found
																</div>
															)}
														</div>
													</div>
													<LocationDetails />
												</div>
											</Wrapper>
										</Column>
									</Columns>
								</Container>
								{parseHtml(widgetSettings?.locationsSearch || "")}
							</article>
						</main>
					</div>
				</selectedLocationContext.Provider>
			</showDetailsContext.Provider>

			<Footer copyrightHolder={generalSettings.title} />
			<Spectrum />
		</>
	);
}


export async function getStaticProps(context: GetStaticPropsContext) {
	return getNextStaticProps(context, {
		Page,
		client,
		revalidate: parseInt(process.env.PAGE_REVALIDATION) ? parseInt(process.env.PAGE_REVALIDATION) : null,
	});
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
// 	const { req, res, query } = context;

// 	const { data } = await apolloClient.query({
// 		query: gql`
// 			${LocationSettingsFragment}
// 			query LocationSettings {
// 				locationSettings {
// 					...LocationSettingsFragment
// 				}
// 			}
// 		`,
// 	});
// 	const location = query?.location;
// 	return getNextServerSideProps(context, {
// 		Page,
// 		client,
// 		props: {
// 			locationSettings: data.locationSettings,
// 			location: location ? location : null,
// 		},
// 	});
// }
