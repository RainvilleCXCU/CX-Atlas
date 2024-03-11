
import * as MENUS from 'constants/menus';
import { BlogInfoFragment } from '../../../fragments/GeneralSettings';
import { ThirdPartySettingsFragment, GTM, HotJar, Personyze, Qualtrics, Spectrum, Siteimprove } from 'components/ThirdParty';
import {
  Header,
  Footer,
  MenuNavigation,
  SEO,
} from 'components';
import { parseHtml } from 'lib/parser';
import Alert from 'components/Alerts/Alert';
import Loading from 'components/common/loading';
import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import {
	showDetailsContext,
	selectedLocationContext,
} from "components/Locations/locationsContext";
import LocationListings from "components/Locations/listings";
import LocationDetails from "components/Locations/location-details";
import { Wrapper } from "@googlemaps/react-wrapper";
import Map from "components/Map/map";
import { gql, useQuery } from "@apollo/client";
import PageTitle from "components/Blocks/PageTitle";
import Container from "components/Blocks/Container";
import Columns from "components/Blocks/Columns";
import Column from "components/Blocks/Column";
import AddressBar from "components/Locations/searchbar";
import { Store } from "context/store";
import { getGeoLocation } from "lib/location/geolocation";
import {
	distance,
	getLatLngByLocation,
	getLocationByLatLng,
} from "lib/location/geocode";
import { useRouter } from "next/router";
import { getNextServerSideProps, getNextStaticProps } from '@faustwp/core';
import { GetServerSidePropsContext } from 'next';
export default function Page() {
	const props = useQuery(Page.query, {
	  variables: Page.variables(),
	});
	const { query = {}, push } = useRouter();

	const location = query.location;

	const [state, setState] = useContext(Store);

	const { title: siteTitle, description: siteDescription, logo: siteLogo, footerText: footerText, databaseId: databaseId } =
	  props?.data?.generalSettings;
	const { gtmId, gtmEnabled, hotjarEnabled, hotjarId, personyzeDomains, personyzeEnabled, personyzeId, spectrumId, spectrumEnabled, qualtricsId, qualtricsEnabled, siteimproveId, siteimproveEnabled } = props?.data?.thirdPartySettings;
	const locationSettings = props?.data?.locationSettings;
	const widgetSettings = props?.data?.widgetSettings; 
	const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
	const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
	// const { title, content, seo, link, featuredImage } = props?.data?.page ?? { title: '' };
	const headerSettings = props?.data?.headerSettings; 
	const { footerUtilities, footerAppIcons, footerSocialIcons } = props?.data?.footerSettings;

	const [data, setData] = useState(null);
	const [length, setLength] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [showDetails, setShowDetails] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState(null);

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
					// data &&
					// 	push(
					// 		`/about/branch-and-atm-locations/find-location/${location}/`,
					// 		undefined,
					// 		{ shallow: false }
					// 	);

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
		} else if(locationSettings.autoLocate !== 0) {
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
		} else {
			fetchLocations({lat: 45, lng: -89, autoload: 1})
		}
		return () => {
			console.log('Cleanup location search');
			setLoading(false);
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
				if (location && location[0] !== state?.location?.search) {
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
				title={siteTitle}
				description={siteDescription}
				logo={siteLogo}
				menuItems={primaryMenu}
				headerSettings={headerSettings}
			/>
			<Head>
				<title>{`Locations - ${siteTitle}`}</title>
			</Head>
			{/* <SEO
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
			/> */}
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
															{(data && <LocationListings data={data} distanceUnit={locationSettings.distanceUnit} logo={siteLogo} />) || (
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

			<Footer copyrightHolder={footerText} menuItems={footerMenu} logo={siteLogo} footerUtilities={footerUtilities} footerAppIcons={footerAppIcons} footerSocialIcons={footerSocialIcons} />
			<Qualtrics
				id={qualtricsId}
				enabled={qualtricsEnabled} />
			<Spectrum
				id={spectrumId}
				enabled={spectrumEnabled} />
					</>
				);
}

Page.variables = () => {
	return {
	  headerLocation: MENUS.PRIMARY_LOCATION,
	  footerLocation: MENUS.FOOTER_LOCATION
	};
  };
  
  Page.query = gql`
	${BlogInfoFragment}
	${MenuNavigation.fragments.entry}
	${ThirdPartySettingsFragment}
	${Alert.fragments.entry}
	query GetLocationPageData(
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

	  locationSettings {
		autoLocate
		startLatlng
		searchRadius
		apiBrowserKey
		mapType
		zoomLevel
		urlLabel
		streetview
		startLatlng
		typeControl
		scrollwheel
		controlPosition
		markerIconProps
		startMarker
		storeMarker
	  }
		widgetSettings {
			locationsSearch
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

// export function getStaticProps(ctx) {
// 	return getNextStaticProps(ctx, {Page, revalidate: parseInt(process.env.PAGE_REVALIDATION) ? parseInt(process.env.PAGE_REVALIDATION) : null});
//   }


// export async function getStaticProps(context: GetStaticPropsContext) {
// 	return getNextStaticProps(context, {
// 		Page,
// 		client,
// 		revalidate: parseInt(process.env.PAGE_REVALIDATION) ? parseInt(process.env.PAGE_REVALIDATION) : null,
// 	});
// }

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { req, res, query } = context;

	const location = query?.location;
	return getNextServerSideProps(context, {
		Page,
	});
}
