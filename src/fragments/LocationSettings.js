import { gql } from '@apollo/client';

export const LocationSettingsFragment = gql`
  fragment LocationSettingsFragment on LocationSettings {
    apiBrowserKey
    mapType
    zoomLevel
    urlLabel
    emailLabel
    phoneLabel
    streetview
    startLatlng
    startMarker
    storeMarker
    typeControl
    scrollwheel
    controlPosition
    autoZoomLevel
    markerIconProps
  }
`;
