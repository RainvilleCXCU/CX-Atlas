import { useContext, useEffect, useRef, useState } from "react";
import ReactDOMServer from 'react-dom/server';
import InfoBox from "./infobox";
import { Store } from "context/store";
import { selectedLocationContext, showDetailsContext } from "components/Locations/locationsContext";

interface MapProps {
	title?: string,
    lat: number,
    lng: number,
    markers?,
    locationSettings
}

function Map({ title = 'Categories', lat, lng, locationSettings = null, markers }: MapProps): JSX.Element {

	const [state, setState] = useContext(Store);

	const { showDetails, setShowDetails } = useContext(showDetailsContext);
	const { selectedLocation, setSelectedLocation } = useContext(selectedLocationContext);
    
    const [ map, setMap ] = useState(null);
    const [ infoWindow, setinfoWindow ] = useState(null);
    const [ openInfoWindow, setOpenInfoWindow ] = useState(null);
    const [ markersArray, setMarkersArray ] = useState({});

    
    let geocoder, directionsDisplay, directionsService,
    statistics = {
        enabled: false,
        addressComponents: ''
    };
    
    let {
        mapType,
        zoomLevel,
        autoZoomLevel,
        urlLabel,
        streetview,
        startLatlng,
        typeControl,
        scrollwheel,
        controlPosition,
        markerIconProps,
        startMarker
    } = locationSettings;

    const mapsLoaded = useRef(null)

    useEffect(() => {
        mapsLoaded.current = setInterval( function() {
            if ( typeof google === 'object' && typeof google.maps === 'object' && Object.keys(locationSettings).length > 0) {
                console.log('Load Maps')
                clearInterval( mapsLoaded.current );
    
                initMap( 'wpsl-gmap', 1);
            }
        }, 500 );
    }, []);

    useEffect(() => {
        let mapMarkers = {};
        if(markers?.length > 0) {
            for ( let marker in markersArray ) {
                markersArray[marker].setMap(null);
            }
            markers?.forEach(marker => {
                const latLng = new google.maps.LatLng(marker.lat, marker.lng);
                mapMarkers[marker.id] = addMarker(latLng, marker.id, marker, false, infoWindow);
            });
            setMarkersArray({
                ...mapMarkers
            })
        }
    }, [map, markers, markerIconProps]);

    useEffect(() => {
        if(map && markersArray) {
            fitBounds();
        }
    }, [map, markersArray]);

    useEffect(() => {
        const selectedMarker = markersArray[parseInt(selectedLocation?.id)];
		if(selectedMarker) {
            google.maps.event.trigger( selectedMarker, "click" );
            console.log('DETAILS VIEW');
            console.log({lng:selectedMarker?.position?.lng(), lat:selectedMarker?.position?.lat()});
            map?.setCenter( {lng:selectedMarker?.position?.lng(), lat:selectedMarker?.position?.lat()} );
            map?.setZoom( Number( locationSettings?.autoZoomLevel ) );
        }
        // fitBounds();
    }, [selectedLocation]);

    useEffect(() => {
        if(!showDetails) {
            openInfoWindow?.close();
            fitBounds();
        }
    }, [showDetails]);

    markerIconProps = JSON.parse(markerIconProps);
    startLatlng = new google.maps.LatLng(startLatlng.split(',')[0], startLatlng.split(',')[1])

    const initMap = ( mapId, mapIndex ) => {
		// defaultZoomLevel = Number( wpslSettings.zoomLevel ),
        // maxZoom = Number( wpslSettings.autoZoomLevel );

        // Get the settings that belongs to the current map.

        /*
        * This is the value from either the settings page,
        * or the zoom level set through the shortcode.
        */
        // zoomLevel = Number( zoomLevel );

        /*
        * If they are not equal, then the zoom value is set through the shortcode.
        * If this is the case, then we use that as the max zoom level.
        */
        // if ( zoomLevel !== defaultZoomLevel ) {
        //     maxZoom = zoomLevel;
        // }

        // Create a new infoWindow, either with the infobox libray or use the default one.
        // infoWindow = newInfoWindow();

        geocoder	      = new google.maps.Geocoder();
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsService = new google.maps.DirectionsService();

        // Set the map options.
        const mapOptions = {
            zoom: zoomLevel,
            center:  startLatlng,
            mapTypeId: google.maps.MapTypeId[ mapType.toUpperCase() ],
            mapTypeControl: Number( typeControl ) ? true : false,
            streetViewControl: Number( streetview ) ? true : false,
            scrollwheel: locationSettings.scrollwheel === 1 ? true : false,
            maxZoom: Number( locationSettings.autoZoomLevel ),
            zoomControlOptions: {
                position: google.maps.ControlPosition[ controlPosition.toUpperCase() + '_TOP' ]
            }
        };
        
        /**
         * When the gestureHandling is set to cooperative and the scrollWheel
         * options is also set, then the gestureHandling value is ingored.
         *
         * To fix this we only include the scrollWheel options when 'cooperative' isn't used.
         */
        // if ( locationSettings.gestureHandling !== 'cooperative' ) {
        //     mapOptions.scrollwheel = Number( locationSettings.scrollWheel ) ? true : false;
        // }

        // Get the correct marker path & properties.
        newInfoWindow();
        setMap(new google.maps.Map( document.getElementById( mapId ), mapOptions ));
        // Create a new infoWindow, either with the infobox libray or use the default one.
        addMarker(startLatlng, 0, {}, false, infoWindow);   
    }
	const fitBounds = () => {
		var i, markerLen, 
			maxZoom = Number( locationSettings.autoZoomLevel ),
			bounds  = new google.maps.LatLngBounds();
			

		for ( let marker in markersArray ) {
			bounds.extend ( markersArray[marker].position );
		}
        // attachBoundsChangedListener(map, maxZoom);

		map?.fitBounds( bounds );
	}
    const attachBoundsChangedListener = ( map, maxZoom )  => {
        console.log(google)
        google.maps.event.addListenerOnce( map, "bounds_changed", function() {
            google.maps.event.addListenerOnce( map, "idle", function() {
                if ( this.getZoom() > maxZoom ) {
                    this.setZoom( maxZoom );
                }
            });
        });
    }

    const setInfoWindowContent = ( marker, infoWindowContent, infoWindow, currentMap ) => {
		
		infoWindow?.setContent( infoWindowContent );
		infoWindow?.open( currentMap, marker );
		
        setOpenInfoWindow(infoWindow);
        infoWindow?.addListener( "closeclick", function() {	
            setShowDetails(false);
        });

		/* 
		* Store the marker id if both the marker clusters and the infobox are enabled.
		* 
		* With the normal info window script the info window is automatically closed 
		* once a user zooms out, and the marker clusters are enabled, 
		* but this doesn't happen with the infobox library. 
		* 
		* So we need to show/hide it manually when the user zooms out, 
		* and for this to work we need to know which marker to target. 
		*/
		// if ( typeof wpslSettings.infoWindowStyle !== "undefined" && wpslSettings.infoWindowStyle == "infobox" && wpslSettings.markerClusters == 1 ) {
			// activeWindowMarkerId = marker.storeId;
			// infoWindow?.setVisible( true );
		// }
	}

    const newInfoWindow = () => {
        var boxClearance, boxPixelOffset, 
            infoBoxOptions = {};
        
        // Do we need to use the infobox script or use the default info windows?
        // if ( ( typeof locationSettings.infoWindowStyle !== "undefined" ) && ( locationSettings.infoWindowStyle == "infobox" ) ) {
    
        //     // See http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/docs/reference.html.
        //     boxClearance   = locationSettings.infoBoxClearance.split( "," );
        //     boxPixelOffset = locationSettings.infoBoxPixelOffset.split( "," );
        //     infoBoxOptions = {
        //         alignBottom: true,
        //         boxClass: locationSettings.infoBoxClass,
        //         closeBoxMargin: locationSettings.infoBoxCloseMargin,
        //         closeBoxURL: locationSettings.infoBoxCloseUrl,
        //         content: "",
        //         disableAutoPan: ( Number( locationSettings.infoBoxDisableAutoPan ) ) ? true : false,
        //         enableEventPropagation: ( Number( locationSettings.infoBoxEnableEventPropagation ) ) ? true : false,
        //         infoBoxClearance: new google.maps.Size( Number( boxClearance[0] ), Number( boxClearance[1] ) ),
        //         pixelOffset: new google.maps.Size( Number( boxPixelOffset[0] ), Number( boxPixelOffset[1] ) ),
        //         zIndex: Number( locationSettings.infoBoxZindex )
        //     };
    
        //     infoWindow = new InfoBox( infoBoxOptions );	
        // } else {
            setinfoWindow(new google.maps.InfoWindow());
        // }
    
        return infoWindow;
    }

    const addMarker = ( latLng, storeId, infoWindowData, draggable, infoWindow ) => {
        let url;
        if ( storeId === 0 ) {
            infoWindowData = {
                store: locationSettings.startPoint
            };
    
            url = `/wp-content/plugins/wp-store-locator/img/markers/${locationSettings.startMarker}`;
        } else if ( typeof infoWindowData.alternateMarkerUrl !== "undefined" && infoWindowData.alternateMarkerUrl ) {
            url = infoWindowData.alternateMarkerUrl;
        // } else if ( typeof infoWindowData.categoryMarkerUrl !== "undefined" && infoWindowData.categoryMarkerUrl ) {
        //     url = infoWindowData.categoryMarkerUrl;
        } else {
            url = `/wp-content/plugins/wp-store-locator/img/markers/${locationSettings.storeMarker}`;
        }
        const mapIcon = {
            url: url,
            scaledSize: new google.maps.Size( Number( markerIconProps?.scaledSize.split(',')[0] ), Number( markerIconProps?.scaledSize.split(',')[1] ) ), //retina format
            // origin: new google.maps.Point( Number( markerIconProps.anchor.split(',')[0] ), Number( markerIconProps.anchor.split(',')[1] ) ),
            anchor: new google.maps.Point( Number( markerIconProps?.anchor.split(',')[0] ), Number( markerIconProps?.anchor.split(',')[1] ) )
        };
        const marker = new google.maps.Marker({
            position: latLng,
            map: map,
            optimized: true, //fixes markers flashing while bouncing
            title: 'Start',
            icon: mapIcon
        });	
        
        google.maps.event.addListener( marker, "click",( function( currentMap ) {
            return function() {
                
                // The start marker will have a store id of 0, all others won't.
                if ( storeId != 0 ) {

                    // Check if streetview is available at the clicked location.
                    // if ( typeof wpslSettings.markerStreetView !== "undefined" && wpslSettings.markerStreetView == 1 ) {
                    //     checkStreetViewStatus( latLng, function() {
                    //         setInfoWindowContent( marker, createInfoWindowHtml( infoWindowData ), infoWindow, currentMap );
                    //     });
                    // } else {
                    //     setInfoWindowContent( marker, createInfoWindowHtml( infoWindowData ), infoWindow, currentMap );
                    // }
                    const domNode = ReactDOMServer.renderToString(<InfoBox id={storeId} name={infoWindowData.store} address={infoWindowData.address} address2={infoWindowData.address2 !== '' ? infoWindowData.address2 : null} city={infoWindowData.city} state={infoWindowData.state} zip={infoWindowData.zip} phoneLabel={state?.location?.settings?.phoneLabel !== '' ? state?.location?.settings?.phoneLabel : null} phone={infoWindowData.phone !== '' ? infoWindowData.phone : null} />)
                    setInfoWindowContent( marker, domNode, infoWindow, currentMap );

                } else {
                    setInfoWindowContent( marker, 'Start', infoWindow, currentMap );
                }

                google.maps.event.clearListeners( infoWindow, "domready" );
                
                google.maps.event.addListener( infoWindow, "domready", function() {
                    // infoWindowClickActions( marker, currentMap );
                    // checkMaxZoomLevel();
                });
                setShowDetails(true);
                setSelectedLocation({
                    store: infoWindowData.store,
                    address: infoWindowData.address,
                    city: infoWindowData.city,
                    state: infoWindowData.state,
                    zip: infoWindowData.zip,
                    lobby_hours_html: infoWindowData.lobby_hours_html,
                    drive_thru_hours_html: infoWindowData.drive_thru_hours_html,
                    special_hours_html: infoWindowData.special_hours_html,
                    services: infoWindowData.services,
                    phone: infoWindowData.phone,
                    special_message_type: infoWindowData.special_message_type,
                    special_message_title: infoWindowData.special_message_title,
                    special_message: infoWindowData.special_message,
                    categoryMarkerUrl: infoWindowData.categoryMarkerUrl
                });
            };
        }( map ) ) );
        return marker;
    }

	return (
        <div id="wpsl-gmap" className="wpsl-wrap wpsl-store-below wpsl-default-filters"></div>
	);
};

export default Map;
