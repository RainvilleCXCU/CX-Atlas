import { useState, useEffect, useContext } from "react";
import LocationListings from "components/Locations/listings";
import LocationDetails from "components/Locations/location-details";
import { Wrapper } from "@googlemaps/react-wrapper";
import Map from "components/Map/map";
import AddressBar from "components/Locations/searchbar";
import { Store } from "context/store";
import { getGeoLocation } from "lib/location/geolocation";
import {
  distance,
  getLatLngByLocation,
  getLocationByLatLng,
} from "lib/location/geocode";
import { useRouter } from "next/router";

export interface Props {
    siteLogo?
    location?
    locationSettings?: {
      autoLocate
      startLatlng
      searchRadius
      apiBrowserKey
      mapType
      distanceUnit
      zoomLevel
      urlLabel
      streetview
      typeControl
      scrollwheel
      controlPosition
      markerIconProps
      startMarker
      storeMarker
    }
}

function Locations({ locationSettings, siteLogo, location }: Props): JSX.Element {
    const { query = {}, push, isReady } = useRouter();


    const [state, setState] = useContext(Store);

    const [data, setData] = useState(null);
    const [length, setLength] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    useEffect(() => {
        setLoading(true);
        if (state?.location?.search) {
          getLatLngByLocation({ address: state?.location?.search })
            .then((response) => {
              const { location, bounds } = response[0].geometry;
              const { types } = response[0];
              console.log("Second GetLatLngByLoc");
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
                  { shallow: true }
                );
            })
            .catch((e) => {
              console.log("NO LOCATION");
              setData([]);
              setLength(0);
            });
        } else if (locationSettings.autoLocate !== 0) {
          getGeoLocation()
            .then((location) => {
              getLocationByLatLng({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
              }).then((data) => {
                console.log("GET GEO LOCATION");
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
              console.log(`Err: ${err}`);
              fetchLocations({
                lat: locationSettings.startLatlng?.split[","]
                  ? locationSettings.startLatlng?.split[","][0]
                  : 0,
                lng: locationSettings.startLatlng?.split[","]
                  ? locationSettings.startLatlng?.split[","][1]
                  : 0,
                autoload: 1,
              });
            });
        } else if (!location) {
          console.log("FETCH DEFAULT NO SEARCH");
          fetchLocations({ lat: 45, lng: -89, autoload: 1 });
        }
        return () => {
          console.log("Cleanup location search");
          setLoading(false);
        };
      }, [isReady, state?.location?.search]);
    
      useEffect(() => {
        console.log("Location Chance");
        console.log(location);
        console.log(state?.location?.search);
        if (reformatSearch(location) !== state?.location?.search) {
          setLoading(true);
          setState({
            ...state,
            location: {
              ...state.location,
              search: reformatSearch(location),
            },
          });
        }
      }, [location]);
    
      useEffect(() => {
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
        return locationSettings.searchRadius.match(regex)[1];
      };
    
      const fetchLocations = ({ lat, lng, autoload = 0, bounds = null }) => {
        // resetSearchResults();
    
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
        console.log("FETCH SEARCH");
        console.log(`${lat} - ${lng}`);
        fetch(
          `/wp-admin/admin-ajax.php?action=store_search&lat=${lat}&lng=${lng}&max_results=25&search_radius=${radius}&autoload=${autoload}`
        )
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            setLength(Object.keys(data).length);
            setLoading(false);
            console.log("FETCH FINISHED");
            console.log(JSON.stringify(location));
            // if (location && location[0] !== state?.location?.search) {
            // 	setState({
            // 		...state,
            // 		location: {
            // 			...state.location,
            // 			search: location
            // 		},
            // 	});
            // }
          });
      };
    
      const formatSearch = (address) => {
        return address ? address.toString().replaceAll("+", " ") : "";
      };
      const reformatSearch = (address) => {
        return address?.replaceAll(" ", "+");
      };
	return (
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
                {(data && (
                <LocationListings
                    data={data}
                    distanceUnit={locationSettings.distanceUnit}
                    logo={siteLogo}
                />
                )) || (
                <div className="wpsl-no-results-msg">
                    No results found
                </div>
                )}
            </div>
            </div>
            <LocationDetails />
        </div>
        </Wrapper>
	);
}

export default Locations;
