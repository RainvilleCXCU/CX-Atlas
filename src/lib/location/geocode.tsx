export const getLocationByLatLng = async ({ lat, lng }) => {
  const params = {
    latlng: {
      lat,
      lng
    }
  };

  return new Promise((resolve, reject) => {
    let mapsLoaded = setInterval(function () {
      if (typeof google === 'object' && typeof google.maps === 'object' && typeof google.maps.Geocoder === 'function') {
        clearInterval(mapsLoaded);
        const geocoder = new google.maps.Geocoder();
        let addressLength, responseLength, responseType, filteredData = { zip: null, locality: null }, userLocation;

        geocoder.geocode({
          location: params.latlng
        }, (response) => {
          responseLength = response.length;

          for (let i = 0; i < responseLength; i++) {
            addressLength = response[0]?.address_components.length;

            for (let j = 0; j < addressLength; j++) {
              responseType = response[i]?.address_components[j].types;

              if ((/^postal_code$/.test(responseType)) || (/^postal_code,postal_code_prefix$/.test(responseType))) {
                filteredData.zip = response[i]?.address_components[j]?.long_name;
                break;
              }

              if (/^locality,political$/.test(responseType)) {
                filteredData.locality = response[i]?.address_components[j]?.long_name;
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
          console.log('User Locations!');
          console.log(userLocation);
          resolve(userLocation);
        });
      }
    }, 500);
  });
}



export const getLatLngByLocation = ({ address }): Promise<any> => {
  let latLng = {};
  let request = {
    address
  };
  return new Promise((resolve, reject) => {
    let mapsLoaded = setInterval(function () {
      if (typeof google === 'object' && typeof google.maps === 'object' && typeof google.maps.Geocoder === 'function') {
        clearInterval(mapsLoaded);
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(request, function (response, status) {
          if (status == google.maps.GeocoderStatus.OK) {

            latLng = response[0].geometry.location;

          }
          console.log('LAT LNG');
          console.log(latLng)
          resolve(latLng);
        });
      }
    }, 500);
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