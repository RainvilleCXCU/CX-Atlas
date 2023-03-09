import React from 'react';
import Image from 'next/image';

interface Props {
  id: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  lat?: string;
  lng?: string;
  distance?: string;
  logo?: string;
}

function LocationListing({
  id,
  address,
  city,
  state,
  zip,
  lat,
  lng,
  distance,
  logo,
}: Props): JSX.Element {
  return (
    <a href="#" data-store-id={id} data-position={`${lat},${lng}`} className="cx-modal__open" data-modal-target="#wpsl-branch-details">
        <div className="cx-location-listing__item">
        <small className="cx-location-listing__item--distance">{distance}</small>
            <div className="cx-location-listing__item--address">
                <span className="wpsl-street">{address}</span>
                
                <span>{city} {state} {zip}</span>
            </div>
            <div className="cx-location-listing__item--icon">
                <img src={logo} width="145" height="54" alt="Connexus Credit Union" title="Connexus Credit Union — High Yields, Low Rates, Online Services" />
            </div>
        </div>
    </a>
  );
}

export default LocationListing;
