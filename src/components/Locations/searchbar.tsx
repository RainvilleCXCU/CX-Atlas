import { Store } from "context/store";
import { distance, getLocationByLatLng } from "lib/location/geocode";
import { getGeoLocation } from "lib/location/geolocation";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";

const AddressBar = () => {
	const { query = {}, push } = useRouter();

    const [address, setAddress] = useState('');
    const [autoCompleteLoaded, setAutoCompleteLoaded] = useState(false);
    const [data, setData] = useState(null);
    const [state, setState] = useContext(Store);
    const router = useRouter();
    const addressRef = useRef(null);

    const autoComplete = useRef(null);

    const getLocation = () => {
        getGeoLocation()
            .then(location => {
                getLocationByLatLng({ lat: location.coords.latitude, lng: location.coords.longitude })
                    .then(data => {
                        setState({
                            ...state,
                            location: {
                                ...state.location,
                                searchRadius: null,
                                search: formatSearch(data)
                            }
                        })
                    });

            })
            .catch(err => {
                router.push(`/about/branch-and-atm-locations/`, undefined, { shallow: true });
            })
    }

    // console.log('Google Maps');
    // console.log(window.google.maps.places.Autocomplete)
    useEffect(() => {
        if(!autoCompleteLoaded) {
            autoComplete.current = new google.maps.places.Autocomplete(
                addressRef.current,
            )
    
            google.maps.event.addListener( autoComplete, "place_changed", function() {
                const {formatted_address, geometry, name} = autoComplete.current.getPlace();
                const places = autoComplete.current.getPlace();
                let searchAddress = name;
                let searchRadius = null;
                console.log('PLACE CHANGED');
                console.log(places);
                if(formatted_address) {
                    setAddress(formatted_address);           
		            searchRadius = distance(geometry.viewport.getNorthEast().lng(), geometry.viewport.getNorthEast().lat(), geometry.viewport.getSouthWest().lng(), geometry.viewport.getSouthWest().lat()) / 2;
                    
                    console.log('RADIUS');
                    console.log(searchRadius);
                    searchAddress = formatted_address;
                }
                setState({
                    ...state,
                    location: {
                        ...state.location,
                        searchRadius: searchRadius,
                        search: formatSearch(searchAddress)
                    }
                })
                // router.push(`/about/branch-and-atm-locations/find-location/${formatSearch(formatted_address)}/`, undefined, { shallow: true });
            });
            setAutoCompleteLoaded(true);
        }    
    }, [autoCompleteLoaded, setState, state])
    
    useEffect(() => {
        console.log('SET SEARCHBAR');
        setAddress(reformatSearch(query?.location?.toString()));
    }, [query?.location])

    const handleInput = e => {
        // Update the keyword of the input element
        if(e.keyCode === 13) {
            console.log('Handle Input');
        }
        setAddress(e.target.value);
    };

    const submitSearch = e => {
        e.preventDefault();
        setState({
            ...state,
            location: {
                ...state.location,
                searchRadius: null,
                search: formatSearch(address)
            }
        })
        console.log('SUBMIT SEARCH');
    }

    const formSubmit = e => {
        e.preventDefault();
    }

    const clearInput = () => {
        setAddress('');
    }

    const formatSearch = (address) => {
        console.log('Format Search');
        console.log(address);
        return address?.replaceAll(' ', '+');
    }
    const reformatSearch = (address) => {
        console.log('Format Search');
        console.log(address);
        return address?.replaceAll('+', ' ');
    }

    return (
        <div id="wpsl-search-wrap">
            <form autoComplete="on" onSubmit={formSubmit}>
                <div className="wpsl-input">
                    <label className="wpsl-icon-direction" onClick={getLocation}>Near Me</label>
                    <button className="cx-modal__close cx-modal__close--back" data-modal-target="#wpsl-branch-details">Back</button>
                    <div className="cx-location-listing__search--input">
                        <input id="wpsl-search-input" type="text" value={address} name="wpsl-search-input" placeholder="City, State or ZIP" aria-required="true" className="p--small pac-target-input" ref={addressRef} autoComplete="off" onChange={handleInput} />
                        <button type="button" className="cx-search__close cx-search__close--locations" onClick={clearInput}>
                            <span className="visually-hidden">close search</span>
                        </button>
                    </div>
                    <div className="wpsl-search-btn-wrap">
                        <input id="wpsl-search-btn" className="cx-button cx-button--compact cx-button--color-positive" type="button" value="" onClick={submitSearch} />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddressBar;