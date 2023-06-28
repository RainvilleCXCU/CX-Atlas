import { gql } from "@apollo/client";
import { client } from "client";
import Heading from "components/Heading";
import Link from "next/link";
import React, { Fragment, useEffect } from "react";
import { LocationSettingsFragment } from 'fragments/LocationSettings';

interface MapProps {
	title?: string,
    lat: number,
    lng: number,
    locationSettings
}

function Map({ title = 'Categories', lat, lng, locationSettings = null }: MapProps): JSX.Element {
    let {
        mapType,
        zoomLevel,
        urlLabel,
        streetview,
        startLatlng,
        typeControl,
        scrollwheel,
        controlPosition,
        markerIconProps,
        startMarker
    } = locationSettings;

    markerIconProps = JSON.parse(markerIconProps);
    startLatlng = new google.maps.LatLng(startLatlng.split(',')[0], startLatlng.split(',')[1])
    
    let geocoder, map, directionsDisplay, directionsService, autoCompleteLatLng,
    activeWindowMarkerId, infoWindow, markerClusterer, startMarkerData, startAddress,
    openInfoWindow = [],
    markersArray = [],
    mapsArray = [],
    markerSettings = {},
    directionMarkerPosition = {},
    mapDefaults = {},
    resetMap = false,
    streetViewAvailable = false,
    autoLoad = true,
    userGeolocation = {},
    statistics = {
        enabled: false,
        addressComponents: ''
    };

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

        console.log('Markers');
        console.log(JSON.stringify(markerIconProps));
        map = new google.maps.Map( document.getElementById( mapId ), mapOptions );
        // Create a new infoWindow, either with the infobox libray or use the default one.
        infoWindow = newInfoWindow();
        addMarker(startLatlng, 0, {}, false, infoWindow);
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
            infoWindow = new google.maps.InfoWindow();
        // }
    
        return infoWindow;
    }

    const addMarker = ( latLng, storeId, infoWindowData, draggable, infoWindow ) => {
        let url;
        if ( storeId === 0 ) {
            infoWindowData = {
                store: locationSettings.startPoint
            };
    
            url = `/wp-content/plugins/wp-store-locator/img/markers/${startMarker}`;
        } else if ( typeof infoWindowData.alternateMarkerUrl !== "undefined" && infoWindowData.alternateMarkerUrl ) {
            url = infoWindowData.alternateMarkerUrl;
        } else if ( typeof infoWindowData.categoryMarkerUrl !== "undefined" && infoWindowData.categoryMarkerUrl ) {
            url = infoWindowData.categoryMarkerUrl;
        } else {
            url = `/wp-content/plugins/wp-store-locator/img/markers/${locationSettings.storeMarker}`;
        }
        const mapIcon = {
            url: url,
            scaledSize: new google.maps.Size( Number( markerIconProps.scaledSize.split(',')[0] ), Number( markerIconProps.scaledSize.split(',')[1] ) ), //retina format
            // origin: new google.maps.Point( Number( markerIconProps.anchor.split(',')[0] ), Number( markerIconProps.anchor.split(',')[1] ) ),
            anchor: new google.maps.Point( Number( markerIconProps.anchor.split(',')[0] ), Number( markerIconProps.anchor.split(',')[1] ) )
        };

        console.log('Scale');
        console.log(markerIconProps);
    
        const marker = new google.maps.Marker({
            position: startLatlng,
            map: map,
            optimized: true, //fixes markers flashing while bouncing
            title: 'Start',
            icon: mapIcon
        });	
    
        // Store the marker for later use.
        markersArray.push( marker );
        console.log('Marker Added');
        console.log(marker);
    }

    let mapsLoaded;
    mapsLoaded = setInterval( function() {
        if ( typeof google === 'object' && typeof google.maps === 'object' && Object.keys(locationSettings).length > 0) {
            console.log('Load Maps')
            clearInterval( mapsLoaded );

            initMap( 'wpsl-gmap', 1);
        }
    }, 500 );
    // function getMarkerSettings() {
    //     var markerProp,
    //         markerProps = JSON.parse(markerIconProps),
    //         settings	= {
    //             url: '',
    //             categoryMarkerUrl: '',
    //             alternateMarkerUrl: ''
    //         };
    
    //     // Use the correct marker path.
    //     if ( typeof markerProps.url !== "undefined" ) {
    //         settings.url = markerProps.url;
    //     } else if ( typeof markerProps.categoryMarkerUrl !== "undefined" ) {
    //         settings.categoryMarkerUrl = markerProps.categoryMarkerUrl;
    //     } else if ( typeof markerProps.alternateMarkerUrl !== "undefined" ) {
    //         settings.alternateMarkerUrl = markerProps.alternateMarkerUrl;
    //     } else {
    //         settings.url = urlLabel + "img/markers/";
    //     }
    
    //     for ( var key in markerProps ) {
    //         if ( markerProps.hasOwnProperty( key ) ) {
    //             markerProp = markerProps[key].split( "," );
    
    //             if ( markerProp.length == 2 ) {
    //                 settings[key] = markerProp;
    //             }
    //         }
    //     }
        
    //     return settings;
    // }

	return (
        <div id="wpsl-gmap" className="wpsl-wrap wpsl-store-below wpsl-default-filters"></div>
	);
};

export default Map;
