// This component renders a list of branch locations
import React from "react";
import LocationListing from "./listing";

export interface Props {
	data: any;
	distanceUnit: any;
	logo: string;
}

function LocationListings({ data, distanceUnit, logo }: Props): JSX.Element {

	return (
		<>
			<ul id="store-list" className="accordion-collapse collapse show">
				{data?.map((location, index) => {
					return (
						<li key={location.id} data-store-id={location.id}>
							<LocationListing
								listing = {location}
								logo = {logo}
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
