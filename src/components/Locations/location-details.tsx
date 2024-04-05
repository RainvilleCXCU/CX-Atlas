// This component renders the "location details" modal when a location listing is clicked
import { useEffect, useState, useContext } from "react";
import {
	selectedLocationContext,
	showDetailsContext,
} from "./locationsContext";
import { Store } from "context/store";
import Image from "next/image";

function LocationDetails(): JSX.Element {
	const { showDetails, setShowDetails } = useContext(showDetailsContext);
	const { selectedLocation } = useContext(selectedLocationContext);
	const [isMobile, setIsMobile] = useState("");
	const [address, setAddress] = useState("");
	const [state, setState] = useContext(Store);

	const handleResize = () => {
		setIsMobile(window.innerWidth < 992 ? "__mobile" : "");
	};

	useEffect(() => {
		setIsMobile(window.innerWidth < 992 ? "__mobile" : "");
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const submitSearch = (e) => {
		console.log("Searching...");
		e.preventDefault();
		console.log(address);
		setState({
			...state,
			location: {
				...state.location,
				search: address,
			},
		});
		setShowDetails(false);
	};

	return (
		<div
			id={`wpsl-branch-details${isMobile}`}
			className={`cx-modal__close${showDetails ? "" : " cx-hidden"}`}
		>
			{isMobile && (
				<div className="wpsl-search wpsl-clearfix wpsl-checkboxes-enabled wpsl-geolocation-run">
					<div id="wpsl-search-wrap">
						<form autoComplete="on" onSubmit={submitSearch}>
							<div className="wpsl-input">
								{" "}
								{showDetails && (
									<button //back arrow button
										className={`cx-modal__close cx-modal__close--back${isMobile}`}
										onClick={() => setShowDetails(false)}
									>
										Back
									</button>
								)}{" "}
								<div className="cx-location-listing__search--input">
									<input //search input
										id="wpsl-search-input"
										type="text"
										value={address}
										onChange={(e) => setAddress(e.target.value)}
										name="wpsl-search-input"
										placeholder="City, State or ZIP"
										aria-required="true"
										className="p--small pac-target-input"
										autoComplete="off"
									/>{" "}
									<button //clear search button
										type="button"
										onClick={(e) => setAddress("")}
										className="cx-search__close cx-search__close--locations"
									>
										{" "}
										<span className="visually-hidden">close search</span>{" "}
									</button>
								</div>
								<div className="wpsl-search-btn-wrap">
									<input //search button
										id="wpsl-search-btn"
										className="cx-button cx-button--compact cx-button--color-positive"
										type="submit"
										value=""
									/>
								</div>
							</div>
						</form>
					</div>
				</div>
			)}
			<div id="wpsl-store">
				<div className="cx-location-details__title cx-h4">
					<button
						onClick={() => setShowDetails(false)}
						className="cx-modal__close"
						data-modal-target="#wpsl-branch-details"
					></button>
					Location Details
				</div>{" "}
				<div className="cx-location-details__content">
					{/* render the special message section if a special message exists on the location */}
					{selectedLocation?.special_message_type !== "" && String(selectedLocation?.special_message_type) == "none" && (
						<div
							className={`cx-location-details__content--message cx-location-details__content--message-${selectedLocation?.special_message_type}`}
						>
							<h4 className="title no-margin">
								{selectedLocation?.special_message_title}
							</h4>
							<div className="cx-location-details__content--message-content">
								{selectedLocation?.special_message}
							</div>
						</div>
					)}
					<div className="cx-branch-content__header wpsl-location--section">
						<div className="cx-location-listing__item--address">
							<span className="wpsl-name">
								<strong>{selectedLocation?.store}</strong>
							</span>
							<span className="wpsl-street">{selectedLocation?.address}</span>
							<span>
								{selectedLocation?.city}, {selectedLocation?.state}{" "}
								{selectedLocation?.zip}
							</span>
						</div>
						<div className="cx-location-listing__item--icon">
							<Image
								src="https://www.connexuscu.org/wp-content/uploads/2022/02/LogoConnexus.svg"
								width="145"
								height="54"
								alt="Connexus Credit Union"
								title="Connexus Credit Union — High Yields, Low Rates, Online Services"
							/>
						</div>
					</div>

					<div className="wp-block-genesis-blocks-gb-accordion cx-accordion__brand gb-block-accordion wpsl-location--section">
						<details open>
							<summary className="gb-accordion-title">
								<span className="wpsl-hours cx-h5">
									Hours of Operation (CT)
								</span>
							</summary>
							<div className="gb-accordion-text">
								<div className="wpsl-hours-wrapper">
									<span className="wpsl-hours wpsl-days">
										<div className="wpsl-hours-heading">&nbsp;</div>
										<table className="mabel-bhi-businesshours">
											<tbody>
												<tr>
													<td className="mabel-bhi-day">Mon</td>
												</tr>
												<tr className="mbhi-is-current">
													<td className="mabel-bhi-day">Tue</td>
												</tr>
												<tr>
													<td className="mabel-bhi-day">Wed</td>
												</tr>
												<tr>
													<td className="mabel-bhi-day">Thurs</td>
												</tr>
												<tr>
													<td className="mabel-bhi-day">Fri</td>
												</tr>
												<tr>
													<td className="mabel-bhi-day">Sat</td>
												</tr>
												<tr>
													<td className="mabel-bhi-day">Sun</td>
												</tr>
											</tbody>
										</table>
									</span>

									<span className="wpsl-hours hide-days">
										{selectedLocation?.lobby_hours_html && <div className="wpsl-hours-heading">Lobby</div> }
										<div
											dangerouslySetInnerHTML={{
												__html: selectedLocation?.lobby_hours_html,
											}}
										/>
									</span>
									
									<span className="wpsl-hours hide-days">
										{selectedLocation?.drive_thru_hours_html && <div className="wpsl-hours-heading">Drive-Thru</div>}
										<div
											dangerouslySetInnerHTML={{
												__html: selectedLocation?.drive_thru_hours_html,
											}}
										/>
									</span>
								</div>
							</div>
						</details>
					</div>

					<div className="wp-block-genesis-blocks-gb-accordion cx-accordion__brand gb-block-accordion wpsl-location--section">
						<details>
							<summary className="gb-accordion-title">
								<span className="wpsl-hours cx-h5">Holiday Hours</span>
							</summary>
							<div className="gb-accordion-text">
								<div
									className="wpsl-hours-wrapper wpsl-special-hours"
									dangerouslySetInnerHTML={{
										__html: selectedLocation?.special_hours_html,
									}}
								></div>
							</div>
						</details>
					</div>
					{selectedLocation?.services &&
						<div className="wp-block-genesis-blocks-gb-accordion cx-accordion__brand gb-block-accordion wpsl-location--section">
							<details>
								<summary className="gb-accordion-title">
									<span className="wpsl-hours cx-h5">
										Services &amp; Amenities
									</span>
								</summary>
								<div className="gb-accordion-text">
									<span className="wpsl-services">
										{selectedLocation?.services ? (
											<div
												dangerouslySetInnerHTML={{
													__html: selectedLocation?.services,
												}}
											/>
										) : (
											"Unavailable"
										)}
									</span>
								</div>
							</details>
						</div>
					}

					<div className="cx-location-content__footer u-is-hidden">
						<div className="cx-location-content__footer--btn">
							<a
								href={`tel:${selectedLocation?.phone}`}
								className="cx-button cx-button--compact cx-button--icon cx-button--icon-call"
							>
								Call
							</a>
						</div>
						<div className="cx-location-content__footer--btn">
							<a
								href={`https://maps.google.com/maps?saddr=&amp;daddr=${selectedLocation?.address},${selectedLocation?.city} ${selectedLocation?.state} ${selectedLocation?.zip}`}
								target="_blank"
								className="cx-button cx-button--compact cx-button--outlined cx-button--icon cx-button--icon-directions-brand"
							>
								Directions
							</a>
						</div>
					</div>
				</div>
				<div className="cx-location-content__footer">
					<div className="cx-location-content__footer--btn">
						<a
							href={`tel:${selectedLocation?.phone}`}
							className="cx-button cx-button--compact cx-button--icon cx-button--icon-call"
						>
							Call
						</a>
					</div>
					<div className="cx-location-content__footer--btn">
						<a
							href={`https://maps.google.com/maps?saddr=&daddr=${selectedLocation?.address},${selectedLocation?.city} ${selectedLocation?.state} ${selectedLocation?.zip}`}
							target="_blank"
							className="cx-button cx-button--compact cx-button--outlined cx-button--icon cx-button--icon-directions-brand"
						>
							Directions
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LocationDetails;
