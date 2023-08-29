export const getLocationByLatLng = async ({ lat, lng }) => {
  const geocoder = new google.maps.Geocoder();
  let addressLength, responseLength, responseType, filteredData = { zip: null, locality: null }, userLocation;

  const params = {
    latlng: {
      lat,
      lng
    }
  };

  return geocoder.geocode({
    location: params.latlng
  }).then((response) => {
    responseLength = response.results.length;

    for (let i = 0; i < responseLength; i++) {
      addressLength = response?.results[i]?.address_components.length;

      for (let j = 0; j < addressLength; j++) {
        responseType = response?.results[i]?.address_components[j].types;

        if ((/^postal_code$/.test(responseType)) || (/^postal_code,postal_code_prefix$/.test(responseType))) {
          filteredData.zip = response?.results[i]?.address_components[j]?.long_name;
          break;
        }

        if (/^locality,political$/.test(responseType)) {
          filteredData.locality = response?.results[i]?.address_components[j]?.long_name;
        }
      }

      if (typeof filteredData?.zip !== "undefined") {
        break;
      }
    }

    // If no zip code was found ( it's rare, but it happens ), then we use the city / town name as backup.
    if (typeof filteredData?.zip === "undefined" && typeof filteredData?.locality !== "undefined") {
      userLocation = filteredData?.locality;
    } else {
      userLocation = filteredData?.zip;
    }
    return userLocation;
  });
}



export const getLatLngByLocation = async ({ address }) => {
  let latLng ={}; 
  let request = {
    address
  };
  const geocoder = new google.maps.Geocoder();

  return geocoder.geocode(request, function (response, status) {
    if (status == google.maps.GeocoderStatus.OK) {

      latLng = response[0].geometry.location;

    }
    return latLng;
  });
}

export const distance = (lat1, lon1, lat2, lon2) => {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p) / 2 +
    c(lat1 * p) * c(lat2 * p) *
    (1 - c((lon2 - lon1) * p)) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}