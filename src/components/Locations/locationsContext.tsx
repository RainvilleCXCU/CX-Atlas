// Allows access to the locations state with useContext
import { Dispatch, SetStateAction, createContext } from "react";

/**
 *  Location Details 
 */
interface LocationSettings {
  autoLocate?;
  startLatlng?;
  startPoint?;
  searchRadius?;
  apiBrowserKey?;
  autoZoomLevel?;
  mapType?;
  distanceUnit?;
  zoomLevel?;
  urlLabel?;
  streetview?;
  typeControl?;
  scrollwheel?;
  controlPosition?;
  markerIconProps?;
  startMarker?;
  storeMarker?;
}
interface ILocationSettingsContext {
  locationSettings: LocationSettings;
  setLocationSettings: Dispatch<SetStateAction<LocationSettings>>;
}
export const locationSettingsDefaultValue: ILocationSettingsContext = {
  locationSettings: {},
  setLocationSettings: () => {}
}
export const locationSettingsContext = createContext<ILocationSettingsContext>(locationSettingsDefaultValue);

/**
 *  Show Details 
 */
interface IShowDetailsContext {
  showDetails: boolean;
  setShowDetails: Dispatch<SetStateAction<boolean>>;
}
export const showDetailsDefaultValue: IShowDetailsContext = {
  showDetails: false,
  setShowDetails: () => false
}
export const showDetailsContext = createContext<IShowDetailsContext>(showDetailsDefaultValue);

/**
 * Selected Location
 */
interface SelectedLocation {
  id?: string
  store?: string
  address?: string,
  city?: string,
  state?: string,
  zip?: string,
  lobby_hours_html?: string,
  drive_thru_hours_html?: string,
  special_hours_html?: string,
  services?: string,
  phone?: string,
  special_message_type?: string,
  special_message_title?: string,
  special_message?: string,
  position?: string,
  categoryMarkerUrl?: string
}
interface ISelectedLocationContext {
  selectedLocation: SelectedLocation;
  setSelectedLocation: Dispatch<SetStateAction<SelectedLocation>>;
}
export const selectedLocationDefaultValue: ISelectedLocationContext = {
  selectedLocation: {},
  setSelectedLocation: () => false
}
export const selectedLocationContext = createContext<ISelectedLocationContext>(selectedLocationDefaultValue);
