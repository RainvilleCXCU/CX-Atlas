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
	const {distanceUnit} = useQuery().locationSettings

	return (
		<>
			<ul id="store-list" className="accordion-collapse collapse show">
				{data?.map((location, index) => {
					return (
						<li key={location.id} data-store-id={location.id}>
							<LocationListing
								listing = {location}
								logo = {generalSettings.logo}
								unit = {distanceUnit}
							/>
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default LocationListings;
