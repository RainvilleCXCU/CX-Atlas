// This component renders the "location details" modal when a location listing is clicked
import { useEffect, useState, useContext } from "react";
import {
	selectedLocationContext,
	showDetailsContext,
} from "./locationsContext";
import { Store } from "context/store";
import Image from "next/image";

const MONTH_INDEX: Record<string, number> = {
	january: 0,
	february: 1,
	march: 2,
	april: 3,
	may: 4,
	june: 5,
	july: 6,
	august: 7,
	september: 8,
	october: 9,
	november: 10,
	december: 11,
};

// Maps a lowercase weekday (e.g. "monday") to the notice for the holiday that
// falls on that day, so each affected row of the hours table can be rewritten.
type UpcomingHolidays = Record<string, string>;

// Parse the special_hours_html table (rows look like
// "<td>Memorial Day - May 29</td><td>Closed</td>") and return every holiday
// occurring within the next 7 days in Central Time, keyed by weekday.
function getUpcomingHolidays(html?: string): UpcomingHolidays {
	if (!html) return {};

	// Today's date in Central Time, as a local-midnight Date for day math.
	const ctParts = new Intl.DateTimeFormat("en-US", {
		timeZone: "America/Chicago",
		year: "numeric",
		month: "numeric",
		day: "numeric",
	}).formatToParts(new Date());
	const part = (type: string) =>
		Number(ctParts.find((p) => p.type === type)?.value);
	const today = new Date(part("year"), part("month") - 1, part("day"));

	const dayMs = 24 * 60 * 60 * 1000;
	const rowRegex = /<tr[^>]*>\s*<td>(.*?)<\/td>\s*<td>(.*?)<\/td>\s*<\/tr>/gi;

	const holidays: UpcomingHolidays = {};
	let match: RegExpExecArray | null;
	while ((match = rowRegex.exec(html)) !== null) {
		const label = match[1].trim();
		const status = match[2].trim();
		// Split "Holiday Name - Month Day" (holiday names never contain " - ").
		const dateMatch = label.match(/^(.*?)\s*-\s*([A-Za-z]+)\s+(\d{1,2})$/);
		if (!dateMatch) continue;

		const name = dateMatch[1].trim();
		const monthIndex = MONTH_INDEX[dateMatch[2].toLowerCase()];
		const day = Number(dateMatch[3]);
		if (monthIndex === undefined) continue;

		let holidayDate = new Date(today.getFullYear(), monthIndex, day);
		// Handle the year boundary (e.g. New Year's Day viewed in late December).
		if (holidayDate.getTime() < today.getTime()) {
			holidayDate = new Date(today.getFullYear() + 1, monthIndex, day);
		}

		const diffDays = Math.round(
			(holidayDate.getTime() - today.getTime()) / dayMs
		);
		if (diffDays < 0 || diffDays > 7) continue;

		const weekday = holidayDate
			.toLocaleDateString("en-US", { weekday: "long" })
			.toLowerCase();
		// The hours-table row already shows the day, so the cell text omits it.
		const message = status.toLowerCase() === "closed" ? `Closed - ${name}` : `${name}: ${status}`;

		// First holiday wins if two land on the same weekday within the window.
		if (!(weekday in holidays)) holidays[weekday] = message;
	}

	return holidays;
}

// Parse an mbhi_hours table (rows look like
// "<tr><td class="mabel-bhi-day">Monday</td><td>9 AM - 5 PM</td></tr>") into a
// map of lowercase weekday -> the inner HTML of that day's hours cell. This lets
// the lobby and drive-thru tables be merged into a single table keyed by day.
function parseHoursTable(html?: string): Record<string, string> {
	if (!html) return {};

	const rowRegex =
		/<tr[^>]*>\s*<td class="mabel-bhi-day">\s*([A-Za-z]+)\s*<\/td>\s*<td[^>]*>(.*?)<\/td>\s*<\/tr>/gi;

	const hours: Record<string, string> = {};
	let match: RegExpExecArray | null;
	while ((match = rowRegex.exec(html)) !== null) {
		hours[match[1].trim().toLowerCase()] = match[2].trim();
	}
	return hours;
}

// Escape plain-text values that get interpolated into the hours-table HTML string below.
function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

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

	//scroll the accordion summary into view when clicked
	// const handleSummaryClick = (e) => {
	// 	setTimeout(() => {
	// 		e.target.scrollIntoView({ behavior: "smooth", block: "start" });
	// 	}, 0);
	// };

	// Weekday labels for display and the full names used to key the parsed hours
	// and holiday maps. Both are indexed Sun..Sat so a single ordered list of
	// indices drives the day label, the hours lookup, and the holiday lookup.
	const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
	const fullDays = [
		"sunday",
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday",
	];
	const ctWeekday = new Intl.DateTimeFormat("en-US", {
		timeZone: "America/Chicago",
		weekday: "short",
	}).format(new Date());
	const todayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
		ctWeekday
	);
	// Day indices ordered so that today comes first.
	const orderedDayIndices = Array.from(
		{ length: 7 },
		(_, i) => (todayIndex + i) % 7
	);

	// For any holiday within the next week, the day's row shows a notice that
	// spans the hours columns instead of the lobby / drive-thru times.
	const upcomingHolidays = getUpcomingHolidays(
		selectedLocation?.special_hours_html
	);

	// Parse the two hours tables into weekday -> hours maps and build the list of
	// hours columns to render (a column is omitted when its table is empty, e.g.
	// an ATM with no lobby hours).
	const lobbyHours = parseHoursTable(selectedLocation?.lobby_hours_html);
	const driveThruHours = parseHoursTable(selectedLocation?.drive_thru_hours_html);
	const hourColumns = [
		{ heading: "Lobby", hours: lobbyHours },
		{ heading: "Drive-thru", hours: driveThruHours },
	].filter((column) => Object.keys(column.hours).length > 0);

	// Build the hours table as a single HTML string
	const headingRowHtml =
		hourColumns.length > 0
			? `<tr><td class="mabel-bhi-day">&nbsp;</td>${hourColumns
					.map(
						(column) =>
							`<td class="wpsl-hours-heading">${escapeHtml(column.heading)}</td>`
					)
					.join("")}</tr>`
			: "";
	const dayRowsHtml = orderedDayIndices
		.map((dayIndex, i) => {
			const dayKey = fullDays[dayIndex];
			const holiday = upcomingHolidays[dayKey];
			const rowAttrs = i === 0 ? ' class="mbhi-is-current"' : "";
			const dayCell = `<td class="mabel-bhi-day">${escapeHtml(
				dayLabels[dayIndex]
			)}</td>`;
			const valueCells = holiday
				? `<td colspan="${hourColumns.length}"><span class="wpsl-holiday-notice">${escapeHtml(
						holiday
					)}</span></td>`
				: hourColumns
						.map((column) => `<td>${column.hours[dayKey] ?? ""}</td>`)
						.join("");
			return `<tr${rowAttrs}>${dayCell}${valueCells}</tr>`;
		})
		.join("");
	const hoursTableHtml = `<table class="mabel-bhi-businesshours"><tbody>${headingRowHtml}${dayRowsHtml}</tbody></table>`;

	// Whether the special-message block has content to show.
	const showSpecialMessage = Boolean(
		selectedLocation?.special_message_type &&
			selectedLocation?.special_message_type !== "none" &&
			(selectedLocation?.special_message_title ||
				selectedLocation?.special_message)
	);

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
					<div
						className={`cx-location-details__content--message cx-location-details__content--message-${
							selectedLocation?.special_message_type || "none"
						}${showSpecialMessage ? "" : " cx-hidden"}`}
					>
						<h4 className="title no-margin">
							{selectedLocation?.special_message_title ?? ""}
						</h4>
						<div className="cx-location-details__content--message-content">
							{selectedLocation?.special_message ?? ""}
						</div>
					</div>
					<div className="cx-branch-content__header wpsl-location--section">
						<div className="cx-location-listing__item--address">
							<span className="wpsl-name">
								<strong>{selectedLocation?.store}</strong>
							</span>
							<span className="wpsl-street">{selectedLocation?.address}</span>
							<span>
								<span>{selectedLocation?.city ?? ""}</span>,{" "}
								<span>{selectedLocation?.state ?? ""}</span>{" "}
								<span>{selectedLocation?.zip ?? ""}</span>
							</span>
						</div>
						<div className="cx-location-listing__item--icon">
							<Image
								src={selectedLocation?.categoryMarkerUrl}
								width="145"
								height="54"
								alt="Connexus Credit Union"
								title="Connexus Credit Union — High Yields, Low Rates, Online Services"
							/>
						</div>
					</div>

					<div className="wp-block-genesis-blocks-gb-accordion cx-accordion__brand gb-block-accordion wpsl-location--section">
						<details open>
							<summary 
								className="gb-accordion-title"
							>
								<span className="wpsl-hours cx-h5">
									Hours of Operation (CT)
								</span>
							</summary>
							<div className="gb-accordion-text">
								<div
									className="wpsl-hours-wrapper"
									dangerouslySetInnerHTML={{ __html: hoursTableHtml }}
								/>
							</div>
						</details>
					</div>

					<div className="wp-block-genesis-blocks-gb-accordion cx-accordion__brand gb-block-accordion wpsl-location--section">
						<details>
							<summary 
								className="gb-accordion-title"
							>
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
					<div
						className={`wp-block-genesis-blocks-gb-accordion cx-accordion__brand gb-block-accordion wpsl-location--section${
							selectedLocation?.services ? "" : " cx-hidden"
						}`}
					>
						<details>
							<summary
								className="gb-accordion-title"
							>
								<span className="wpsl-hours cx-h5">
									Services &amp; Amenities
								</span>
							</summary>
							<div className="gb-accordion-text">
								<span
									className="wpsl-services"
									dangerouslySetInnerHTML={{
										__html: selectedLocation?.services ?? "",
									}}
								/>
							</div>
						</details>
					</div>

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
