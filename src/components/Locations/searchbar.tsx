import { Store } from "context/store";
import { getLocationByLatLng } from "lib/location/geocode";
import { getGeoLocation } from "lib/location/geolocation";
import { useContext, useEffect, useState } from "react";

const AddressBar = () => {

    const [address, setAddress] = useState('');
    const [data, setData] = useState(null);
    const [state, setState] = useContext(Store);

    const getLocation = () => {
        getGeoLocation().then(location => {
            getLocationByLatLng({ lat: location.coords.latitude, lng: location.coords.longitude })
                .then(data => {
                    console.log(`User Location: ${data}`);
                    setAddress(data);
                    setState({
                        ...state,
                        location: {
                            ...state.location,
                            userFetched: true
                        }
                    });
                });

        })
    }

    useEffect(() => {
        if(!state?.location?.userFetched) {
            getLocation();
        }
    }, [state?.location?.userFetched])

    const handleInput = (e) => {
        // Update the keyword of the input element
        setAddress(e.target.value);
    };

    const submitSearch = e => {
        console.log('Searching...');
        e.preventDefault();
        setState({
            ...state,
            location: {
                ...state.location,
                search: address
            }
        });
    }


    // const renderSuggestions = () =>
    //     data.map((suggestion) => {
    //         const {
    //             place_id,
    //             structured_formatting: { main_text, secondary_text },
    //         } = suggestion;

    //         return (
    //             <li key={place_id} onClick={handleSelect(suggestion)}>
    //                 <strong>{main_text}</strong> <small>{secondary_text}</small>
    //             </li>
    //         );
    //     });

    return (
        <div id="wpsl-search-wrap">
            <form autoComplete="on" onSubmit={submitSearch}>
                <div className="wpsl-input">
                    <label className="wpsl-icon-direction" onClick={getLocation}>Near Me</label>
                    <button className="cx-modal__close cx-modal__close--back" data-modal-target="#wpsl-branch-details">Back</button>
                    <div className="cx-location-listing__search--input">
                        <input id="wpsl-search-input" type="text" value={address} name="wpsl-search-input" placeholder="City, State or ZIP" aria-required="true" className="p--small pac-target-input" autoComplete="off" onChange={handleInput} />
                        <button type="button" className="cx-search__close cx-search__close--locations">
                            <span className="visually-hidden">close search</span>
                        </button>
                    </div>
                    <div className="wpsl-search-btn-wrap">
                        <input id="wpsl-search-btn" className="cx-button cx-button--compact cx-button--color-positive" type="submit" value="" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddressBar;