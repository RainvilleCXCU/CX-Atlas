// This component renders a list of branch locations
import React from "react";
import { client } from "client";
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
								store={location.store}
								id={location.id}
								address={location.address}
								city={location.city}
								state={location.state}
								zip={location.zip}
								lat={location.lat}
								lng={location.lng}
								distance={location.distance}
								logo={generalSettings.logo}
								lobby_hours_html={location.lobby_hours_html}
								drive_thru_hours_html={location.drive_thru_hours_html}
								special_hours_html={location.special_hours_html}
								services={location.services}
								phone={location.phone}
								special_message_type={location.special_message_type}
								special_message_title={location.special_message_title}
								special_message={location.special_message}
							/>
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default LocationListings;
