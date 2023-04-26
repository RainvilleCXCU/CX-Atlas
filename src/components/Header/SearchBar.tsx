import Logo from 'components/Logo';
import { useEffect, useRef, useState } from 'react';
import MobileHeader from './MobileHeader';

interface SearchBarProps {
	device?: string,
	navOpen?: boolean,
	setNavOpen
}

function DesktopSearchBar(props: SearchBarProps) {
	const [isSearchExpanded, setIsSearchExpanded] = useState(false);
	const [searchSelected, setSearchSelected] = useState('');
	const searchRef = useRef(null);

	useEffect(() => {
		if (isSearchExpanded) {
			searchRef.current.focus();
		}
	}, [isSearchExpanded])

	return (
		<form className={`cx-search${isSearchExpanded ? ' cx-active' : ''}`} role="search" action="/">

			<button type="button" className="cx-search-open"
				onClick={() => {
					setIsSearchExpanded(true);
				}}>
				<svg aria-hidden="true" focusable="false" width="15" height="15"
					className="cx-search-open__icon" viewBox="0 0 15 15" fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<circle cx="6.86384" cy="6.86384" r="5.24333" stroke="#323333" strokeWidth="2"
						strokeLinecap="round" strokeLinejoin="round" />
					<path d="M11 11L14 14" stroke="#323333" strokeWidth="2" strokeLinecap="round"
						strokeLinejoin="round" />
				</svg>
				<span className="cx-search-open__text"><span className="visually-hidden">Open site </span>
					Search</span>
			</button>

			<div className="cx-search__input">
				<input type="search" aria-label="Search" placeholder="Search" id="cxsearch" name="s" ref={searchRef} />
			</div>

			<button type="button" className="cx-search__clear">
				clear<span className="visually-hidden"> current search</span>
			</button>

			<button type="button" className="cx-search__close"
				onClick={() => {
					setIsSearchExpanded(false);
				}}>
				<span className="visually-hidden">close search</span>
			</button>
			<button type="submit" className="visually-hidden cx-search__submit">
				submit search
			</button>
		</form>
	);
}

function MobileSearchBar(props: SearchBarProps) {
	const [isSearchExpanded, setIsSearchExpanded] = useState(false);
	const {navOpen, setNavOpen} = props;

	useEffect(() => {
		if (isSearchExpanded) {
			document.querySelector('html').classList.add('nav-open');
		} else {
			document.querySelector('html').classList.remove('nav-open');
		}
	}, [isSearchExpanded])
	return (
		<>
			<MobileHeader isSearchExpanded={isSearchExpanded} setIsSearchExpanded={setIsSearchExpanded} navOpen={navOpen} setNavOpen={setNavOpen} />
			<div className={`modal cx-modal${isSearchExpanded ? ' show' : ''}`} id="searchModal" aria-labelledby="searchModalLabel" aria-hidden="true">
				<form className="modal-dialog cx-search-mobile" role="search" action="/">
					<div className="modal-content cx-search-mobile__content">
						<div className={`modal-body cx-search-mobile__body${isSearchExpanded ? ' cx-search-mobile__body--show' : ''}`}>
							<div className="cx-search-mobile__input">
								<input type="search" aria-label="Search" placeholder="Search the site..." id="cxMobileSearch" name="s" />
							</div>
							<button type="button" className="cx-search-mobile__clear">
								clear<span className="visually-hidden"> current search</span>
							</button>
							<button type="submit" className="cx-search-mobile__submit">
								<svg className="cx-search-mobile__icon" aria-hidden="true" focusable="false" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M19.25 16.8578H18.065L17.645 16.4528C19.115 14.7428 20 12.5228 20 10.1078C20 4.72279 15.635 0.357788 10.25 0.357788C4.865 0.357788 0.5 4.72279 0.5 10.1078C0.5 15.4928 4.865 19.8578 10.25 19.8578C12.665 19.8578 14.885 18.9728 16.595 17.5028L17 17.9228V19.1078L24.5 26.5928L26.735 24.3578L19.25 16.8578ZM10.25 16.8578C6.515 16.8578 3.5 13.8428 3.5 10.1078C3.5 6.37279 6.515 3.35779 10.25 3.35779C13.985 3.35779 17 6.37279 17 10.1078C17 13.8428 13.985 16.8578 10.25 16.8578Z" fill="#323232" />
								</svg>
								<span className="visually-hidden">submit search</span>
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}

export default function SearchBar({ device, navOpen, setNavOpen, children = <></> }) {
	if (device.toLowerCase() === 'mobile') {
		return (
			<MobileSearchBar navOpen={navOpen} setNavOpen={setNavOpen} />
		);
	}
	return (
		<DesktopSearchBar navOpen={navOpen} setNavOpen={setNavOpen} />
	);
};


