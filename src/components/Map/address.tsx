import { Wrapper } from "@googlemaps/react-wrapper";
import Map from "./map";
import { use, useContext, useEffect } from "react";
import { locationSettingsContext } from "components/Locations/locationsContext";

export interface Props {
    title: string;
    address: string;
    locationData?;
    showDirectionsButton?: boolean
    getDirectionsText?: string
}

const Address = ({ 
    locationData,
    showDirectionsButton = true,
    getDirectionsText = 'Get Directions'
}: Props): JSX.Element   => {
    const { locationSettings } = useContext(locationSettingsContext);
    const branch = JSON.parse(atob(locationData));
    return (
        <Wrapper
            apiKey={locationSettings?.apiBrowserKey}
            libraries={["places"]}
            >
            <div className="cx-map-address">
                <Map
                    // id="address-map"
                    lat={branch.lat} 
                    lng={branch.lng} 
                    locationSettings={locationSettings}
                    markers={[branch]} />
                {
                    showDirectionsButton &&
                    <div className="cx-map-address__button">
                        <a
							href={`https://maps.google.com/maps?saddr=&daddr=${branch?.address},${branch?.city} ${branch?.state} ${branch?.zip}`}
							target="_blank"
							className="cx-button"
						>
							{getDirectionsText}
						</a>
                    </div>
                }
            </div>
        </Wrapper>
    );
}

export default Address;
