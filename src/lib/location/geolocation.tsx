export const getGeoLocation = ():Promise<any> => {
    return new Promise((resolve, reject) => {
        if ( navigator.geolocation ) {
            console.log('NAVIGATION');
			var geolocationInProgress, locationTimeout,
				keepStartMarker = false,
				timeout			= Number( 6000 );
		
			// Make the direction icon flash every 600ms to indicate the geolocation attempt is in progress.
			// geolocationInProgress = setInterval( function() {
			// 	$( ".wpsl-icon-direction" ).toggleClass( "wpsl-active-icon" );
			// }, 600 );

			/* 
			* If the user doesn't approve the geolocation request within the value set in 
			* wpslSettings.geoLocationTimeout, then the default map is loaded.
			* 
			* You can increase the timeout value with the wpsl_geolocation_timeout filter. 
			*/
			// locationTimeout = setTimeout( function() {
			// 	geolocationFinished( geolocationInProgress );
			// 	showStores( startLatLng, infoWindow );
			// }, timeout );

			navigator.geolocation.getCurrentPosition( function( position ) {
				// geolocationFinished( geolocationInProgress );
				// clearTimeout( locationTimeout );
				
				/* 
				* If the timeout is triggerd and the user later decides to enable 
				* the geolocation detection again, it gets messy with multiple start markers. 
				* 
				* So we first clear the map before adding new ones.
				*/
				// deleteOverlays( keepStartMarker ); 
				// handleGeolocationQuery( startLatLng, position, resetMap, infoWindow );
				
				/*
				* Workaround for this bug in Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1283563.
				* to keep track if the geolocation code has already run.
				* 
				* Otherwise after the users location is determined succesfully the code 
				* will also detect the returned error, and triggers showStores() to 
				* run with the start location set in the incorrect location.
				*/ 
				resolve(position);
			}, function( error ) {

				/* 
				* Only show the geocode errors if the user actually clicked on the direction icon. 
				* 
				* Otherwise if the "Attempt to auto-locate the user" option is enabled on the settings page, 
				* and the geolocation attempt fails for whatever reason ( blocked in browser, unavailable etc ). 
				* Then the first thing the visitor will see on pageload is an alert box, which isn't very userfriendly.
				* 
				* If an error occurs on pageload without the user clicking on the direction icon,
				* the default map is shown without any alert boxes.
				*/
                switch ( error.code ) {
                    case error.PERMISSION_DENIED:
                        // alert( wpslGeolocationErrors.denied );
                        break;
                    case error.POSITION_UNAVAILABLE:
                        // alert( wpslGeolocationErrors.unavailable );
                        break;
                    case error.TIMEOUT:
                        // alert( wpslGeolocationErrors.timeout );
                        break;
                    default:
                        // alert( wpslGeolocationErrors.generalError );
                        break;
                }
                reject(error);
			},
			{ maximumAge: 60000, timeout: timeout, enableHighAccuracy: true } );
        }
    });
}