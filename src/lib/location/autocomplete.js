export const activateAutocomplete = () => {
	var input, autocomplete, place,
		options = {};

	input		  = document.getElementById( "wpsl-search-input" );
	autocomplete = new google.maps.places.Autocomplete( input, options );

	autocomplete.addListener( "place_changed", function() {
		place = autocomplete.getPlace();

		/**
		 * Assign the returned latlng to the autoCompleteLatLng var.
		 * This var is used when the users submits the search.
		 */
		if ( place.geometry ) {
            autoCompleteLatLng = place.geometry.location;
		}
    });
}