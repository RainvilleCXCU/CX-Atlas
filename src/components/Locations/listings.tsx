// This component renders a list of branch locations
import React from "react";
import { client } from 'client';
import LocationListing from "./listing";

export interface Props {
	data: any;
}

function LocationListings({ data }: Props): JSX.Element {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

	return (
		<>
			<ul id="store-list" className="accordion-collapse collapse show">
				{data?.map((location, index) => {
					return (
						<li key={location.id} data-store-id={location.id}>
							<LocationListing
								id={location.id}
								address={location.address}
								city={location.city}
								state={location.state}
								zip={location.zip}
								lat={location.lat}
								lng={location.lng}
								distance={location.disance}
								logo={generalSettings.logo}
							/>
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default LocationListings;
