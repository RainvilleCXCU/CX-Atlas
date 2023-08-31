import { Store } from "context/store";
import { getLocationByLatLng } from "lib/location/geocode";
import { getGeoLocation } from "lib/location/geolocation";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const AddressBar = () => {

    const [address, setAddress] = useState('');
    const [data, setData] = useState(null);
    const [state, setState] = useContext(Store);
    const router = useRouter();

    const getLocation = () => {
        getGeoLocation()
        .then(location => {
            getLocationByLatLng({ lat: location.coords.latitude, lng: location.coords.longitude })
                .then(data => {
                    console.log(`User Location: ${data}`);
                    router.push(`/about/branch-and-atm-locations/find-location/${formatSearch(data)}/`, undefined, { shallow: true });
                });

        })
        .catch(err => {
            router.push(`/about/branch-and-atm-locations/`, undefined, { shallow: true });
        })
    }

    useEffect(() => {
        state?.location?.search && setAddress(state?.location?.search);
    }, [state?.location?.search])

    const handleInput = (e) => {
        // Update the keyword of the input element
        setAddress(e.target.value);
    };

    const clearInput = () => {
        setAddress('');
    }

    const submitSearch = e => {
        e.preventDefault();
        router.push(`/about/branch-and-atm-locations/find-location/${formatSearch(address)}/`, undefined, { shallow: true });
    }

    const formatSearch = (address) => {
        return address.replaceAll(' ', '+');
    }

    return (
        <div id="wpsl-search-wrap">
            <form autoComplete="on" onSubmit={submitSearch}>
                <div className="wpsl-input">
                    <label className="wpsl-icon-direction" onClick={getLocation}>Near Me</label>
                    <button className="cx-modal__close cx-modal__close--back" data-modal-target="#wpsl-branch-details">Back</button>
                    <div className="cx-location-listing__search--input">
                        <input id="wpsl-search-input" type="text" value={address} name="wpsl-search-input" placeholder="City, State or ZIP" aria-required="true" className="p--small pac-target-input" autoComplete="off" onChange={handleInput} />
                        <button type="button" className="cx-search__close cx-search__close--locations" onClick={clearInput}>
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