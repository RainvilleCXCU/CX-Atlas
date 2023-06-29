import { gql } from '@apollo/client';

export const LocationSettingsFragment = gql`
  fragment LocationSettingsFragment on LocationSettings {
    apiBrowserKey
    mapType
    zoomLevel
    urlLabel
    streetview
    startLatlng
    startMarker
    typeControl
    scrollwheel
    controlPosition
    markerIconProps
  }
`;
