import { Wrapper } from "@googlemaps/react-wrapper";
import { parseHtml } from "lib/parser";
import { useEffect, useRef, useState } from "react";

export interface Props {
    name?
    children?
}

function BusinessDetails({ name, children }: Props) {
    const [placeData, setPlaceData] = useState(null);
    const [ placeMap, setPlaceMap ] = useState(null);

    const placesLoaded = useRef(null)
	useEffect(() => {
        if(!placeMap) {
            placesLoaded.current = setInterval( function() {
                if ( typeof google === 'object' && typeof google.maps === 'object') {
                    console.log('Load Maps')
                    clearInterval( placesLoaded.current );
                    console.log('GET DETAILS')
                    console.log(name)
                    setPlaceMap(new google.maps.Map( document.getElementById('googlemap') ));
                }
            }, 500 );
        }
        if(placeMap) {
            const placeRequest = {
                query: name,
                fields: ["place_id"],
            };
        
            //   const pyrmont = { lat: -33.866, lng: 151.196 };
            
            //   // const infowindow = new google.maps.InfoWindow();
            const placeService = new google.maps.places.PlacesService(placeMap);
            placeService.textSearch(placeRequest, callback);
        }
    },[placeMap]);
        

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            const placeRequest = {
                placeId: results[0].place_id,
                fields: ["name", "formatted_address", "place_id", "website", "photos", "icon", "rating"],
              };
            const placeService = new google.maps.places.PlacesService(placeMap);
            placeService.getDetails(placeRequest, (place, status) => {
                if (
                  status === google.maps.places.PlacesServiceStatus.OK &&
                  place
                ) {
            
                  console.log('TINE AND CELLAR');
                  console.log(place)
                //   setPhoto(place.photos[0].getUrl());
                setPlaceData(place)
                }
              });
        }
      }

	return(
		<Wrapper
        apiKey={'AIzaSyBkwlFDeIrWrP3N6CVboRjeT1v9iUPPnb0'}
        libraries={["places"]}
        >
            <div id="googlemap" className="places_map"></div>
            <h4>{placeData?.name}</h4>
            <h5>Rating: {placeData?.rating}</h5>
            <img src={placeData?.photos[0].getUrl()} />
            {/* {typeof(placeData?.photos[0].html_attributions[0])}
            <caption>{parseHtml(placeData?.photos[0].html_attributions[0])}</caption> */}
            {parseHtml(
                `<span class="cx-button__wrapper cx-button__wrapper--inline">
                    <a href="${placeData?.website}" class="cx-button cx-button--outlined   cx-button cx-button--outlined cx-button--icon cx-button--icon-right-arrow-brand cx-button--icon-right" target="_blank">
                    Visit Website    </a>
                </span>
                `)
            }
            {children}
        </Wrapper>
    );
}

export default BusinessDetails;
