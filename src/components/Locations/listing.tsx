// This component renders a single branch listing
import { useContext } from "react";
import Image from "next/image";
import { showDetailsContext } from "./locationsContext";
import { selectedLocationContext } from "./locationsContext";
import { Store } from "context/store";

export interface Props {
	listing: {
		store: string;
		id: string;
		address?: string;
		city?: string;
		state?: string;
		zip?: string;
		lat?: string;
		lng?: string;
		distance?: string;
		logo?: string;
		lobby_hours_html?: string;
		drive_thru_hours_html?: string;
		special_hours_html?: string;
		services?: string;
		phone?: string;
		special_message_type?: string;
		special_message_title?: string;
		special_message?: string;
		categoryMarkerUrl?: string
	}
	unit?: string;
	logo?: string;
}

function LocationListing({listing, unit = 'km', logo = ''}: Props): JSX.Element {
	const { setShowDetails } = useContext(showDetailsContext);
	const { setSelectedLocation } = useContext(selectedLocationContext);
    const [state, setState] = useContext(Store);

	const {
		store,
		id,
		address,
		city,
		zip,
		lat,
		lng,
		distance,
		lobby_hours_html,
		drive_thru_hours_html,
		special_hours_html,
		services,
		phone,
		special_message_type,
		special_message_title,
		special_message,
		categoryMarkerUrl
	} = listing;

	const handleClick = (e) => {
		setShowDetails(true);
		setSelectedLocation({
			id: id,
			store: store,
			address: address,
			city: city,
			state: listing.state,
			zip: zip,
			lobby_hours_html: lobby_hours_html,
			drive_thru_hours_html: drive_thru_hours_html,
			special_hours_html: special_hours_html,
			services: services,
			phone: phone,
			special_message_type: special_message_type,
			special_message_title: special_message_title,
			special_message: special_message,
			categoryMarkerUrl: listing.categoryMarkerUrl,
			position: `${lat},${lng}`
		});
	};

	return (
		<>
			<a
				onClick={handleClick}
				data-store-id={id}
				data-position={`${lat},${lng}`}
				className="cx-modal__open"
				data-modal-target="#wpsl-branch-details"
			>
				<div className="cx-location-listing__item">
					{ state?.location?.search && state?.location.search !== '' && 
						<small
							className="cx-location-listing__item--distance"
						>
							{distance} {unit}
						</small>
					}
					<div className="cx-location-listing__item--address">
						<span className="wpsl-street">{address}</span>
						<span>
							{city}, {listing.state} {zip}
						</span>
					</div>
					<div className="cx-location-listing__item--icon">
						<Image
							src={categoryMarkerUrl}
							width="145"
							height="54"
							alt="Connexus Credit Union"
							title="Connexus Credit Union — High Yields, Low Rates, Online Services"
						/>
					</div>
				</div>
			</a>
		</>
	);
}

export default LocationListing;
