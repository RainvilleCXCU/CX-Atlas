import { Store } from "context/store";
import { distance, getLocationByLatLng } from "lib/location/geocode";
import { getGeoLocation } from "lib/location/geolocation";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";

const AddressBar = () => {
	const { query = {}, push } = useRouter();

    const [autoCompleteLoaded, setAutoCompleteLoaded] = useState(false);
    const [state, setState] = useContext(Store);
    const router = useRouter();
    const addressRef = useRef(null);

    let autoComplete;

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

    function setAddress(address) {
        addressRef.current.value = address || '';
    }

    // console.log('Google Maps');
    // console.log(window.google.maps.places.Autocomplete)
    useEffect(() => {
        if(!autoCompleteLoaded) {
            autoComplete = new google.maps.places.Autocomplete(
                addressRef.current,
            )
    
            google.maps.event.addListener( autoComplete, "place_changed", function() {
                const {formatted_address, geometry, name} = autoComplete.getPlace();
                const places = autoComplete.getPlace();
                let searchAddress = name;
                let searchRadius = null;
                console.log('PLACE CHANGED');
                console.log(places);
                if(formatted_address) {
                    setAddress(formatted_address);           
		            searchRadius = distance(geometry.viewport.getNorthEast().lng(), geometry.viewport.getNorthEast().lat(), geometry.viewport.getSouthWest().lng(), geometry.viewport.getSouthWest().lat()) / 2;
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
    })
    
    useEffect(() => {
        console.log('SET SEARCHBAR');
        setAddress(reformatSearch(query?.location?.toString()));
    }, [query?.location])

    const handleInput = e => {
        // Update the keyword of the input element
        console.log('Key INput')
        if(e.keyCode === 13) {
            console.log('Handle Input');
        }
        setAddress(e.target.value);
    };

    const submitSearch = e => {
        const address = formatSearch(addressRef.current.value);
        setState({
            ...state,
            location: {
                ...state.location,
                searchRadius: 25,
                search: address
            }
        })
    }

    const formSubmit = e => {
        e.preventDefault();
    }

    const clearInput = e => {
        setAddress('');
        const newLocation = state?.location;
        delete newLocation.search;
        router.push(`/about/branch-and-atm-locations/`, undefined, { shallow: false });
        // .then(() => {
        //     setState({
        //         ...state,
        //         location: {
        //             ...state.location,
        //             search: null
        //         }
        //     })
        // });
        setState({
            ...state,
            location: {
                ...newLocation
            }
        })
    }

    const formatSearch = (address) => {
        return address?.replaceAll(' ', '+');
    }
    const reformatSearch = (address) => {
        return address?.replaceAll('+', ' ');
    }

    return (
        <div id="wpsl-search-wrap">
            <form autoComplete="on" onSubmit={formSubmit}>
                <div className="wpsl-input">
                    <label className="wpsl-icon-direction" onClick={getLocation}>Near Me</label>
                    <button className="cx-modal__close cx-modal__close--back" data-modal-target="#wpsl-branch-details">Back</button>
                    <div className="cx-location-listing__search--input">
                        <input id="wpsl-search-input" type="text" placeholder="City, State or ZIP" aria-required="true" className="p--small pac-target-input" autoComplete="off" ref={addressRef} onChange={handleInput} />
                        <button type="button" className="cx-search__close cx-search__close--locations" onClick={clearInput}>
                            <span className="visually-hidden">close search</span>
                        </button>
                    </div>
                    <div className="wpsl-search-btn-wrap">
                        <input id="wpsl-search-btn" className="cx-button cx-button--compact cx-button--color-positive" type="button" value="" onClick={submitSearch} onChange={handleInput} />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddressBar;