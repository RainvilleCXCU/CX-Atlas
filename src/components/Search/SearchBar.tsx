import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export interface Props {
	showBtn?: boolean;
}

function SearchBar({ showBtn = true }: Props): JSX.Element {
	const searchInlineRef = useRef(null);
	const router = useRouter();
	const { searchCursor, s = "" } = useRouter().query;

	const submitSearch = (e) => {
		e.preventDefault();
		router.push(`/search/?s=${searchInlineRef.current.value}`);
	};

	useEffect(() => {
		searchInlineRef.current.value = s;
	}, [s]);

	return (
		<div className="cx-search__search-bar">
			<form role="search" action="/" onSubmit={submitSearch}>
				<div className="cx-search__input--search">
					<input
						type="search"
						aria-label="Search"
						size={100}
						placeholder="Search"
						id="cxsearch"
						name="s"
						ref={searchInlineRef}
					/>
					{showBtn && (
						<button
							type="submit"
							className="cx-search__submit--search cx-button cx-button--outlined"
						>
							Search{" "}
						</button>
					)}
				</div>
			</form>
		</div>
	);
}

export default SearchBar;
