export const getLocationByLatLng = async ({ lat, lng }) => {
  const geocoder = new google.maps.Geocoder();
  let addressLength, responseLength, responseType, filteredData = {zip:null,locality:null}, userLocation;

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