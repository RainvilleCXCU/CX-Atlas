import { useContext, useEffect, useRef, useState } from 'react';
import MobileHeader from './MobileHeader';
import { useRouter } from 'next/router';
import { Store } from 'context/store';

interface SearchBarProps {
	device?: string
	navOpen?: boolean
	setNavOpen?
	showSearch?: boolean
	logo?
	desktopLogo?
	desktopLogoWidth?
	mobileLogo?
	mobileLogoWidth?
	logoText?
	showNavigation?: boolean
	template?: string
	ctas?
	children?
}

function DesktopSearchBar(props: SearchBarProps) {
	const [isSearchExpanded, setIsSearchExpanded] = useState(false);
	const searchRef = useRef(null);
	const router = useRouter();

	useEffect(() => {
		if (isSearchExpanded) {
			searchRef.current.focus();
		}
	}, [isSearchExpanded])

	const submitSearch = (e) => {
		e.preventDefault();
		router.push(`/search/?s=${searchRef.current.value}`);
		setIsSearchExpanded(false);
	} 

	return (
		<form className={`cx-search${isSearchExpanded ? ' cx-active' : ''}`} role="search" action="/" onSubmit={submitSearch}>

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
				<input type="search" aria-label="Search" placeholder="Search" defaultValue="" id="cxsearch" name="s" ref={searchRef} />
			</div>

			<button type="button" className="cx-search__clear">
				clear<span className="visually-hidden"> current search</span>
			</button>

			<button type="button" className="cx-search__close"
				onClick={() => {
					setIsSearchExpanded(false);
					searchRef.current.value = '';
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
	const [searchTerm, setSearchTerm] = useState('');
	const {navOpen, setNavOpen, logo, desktopLogo, mobileLogo, desktopLogoWidth, mobileLogoWidth, logoText, showSearch, template, ctas } = props;
    const [state, setState] = useContext(Store);

	useEffect(() => {
		if (isSearchExpanded) {
			document.querySelector('html').classList.add('nav-open');
			setState(state => ({
				...state,
				search: {
					...state.search,
					isOpen: true
				}
			}))
		} else {
			document.querySelector('html').classList.remove('nav-open');
			setTimeout(()=>{
				setState(state => ({
					...state,
					search: {
						...state.search,
						isOpen: false
					}
				}))
			}, 300)
		}
	}, [isSearchExpanded])

	return (
			<MobileHeader logo={logo} desktopLogo={desktopLogo} mobileLogo={mobileLogo} desktopLogoWidth={desktopLogoWidth} mobileLogoWidth={mobileLogoWidth} logoText={logoText} setSearchTerm={setSearchTerm} showNav={showSearch} isSearchExpanded={isSearchExpanded} setIsSearchExpanded={setIsSearchExpanded} navOpen={navOpen} setNavOpen={setNavOpen} template={template} ctas={ctas} />
	);
}

export default function SearchBar({ device, navOpen, setNavOpen, logo, desktopLogo, mobileLogo, desktopLogoWidth, mobileLogoWidth, logoText, showSearch, showNavigation = true, template, ctas, children = <></> }:SearchBarProps) {
	if (device.toLowerCase() === 'mobile') {
		return (
			<MobileSearchBar logo={logo} desktopLogo={desktopLogo} mobileLogo={mobileLogo} desktopLogoWidth={desktopLogoWidth} mobileLogoWidth={mobileLogoWidth} logoText={logoText} navOpen={navOpen} setNavOpen={setNavOpen} showNavigation={showNavigation} showSearch={showSearch} template={template} ctas={ctas} />
		);
	}
	return (
		<DesktopSearchBar navOpen={navOpen} setNavOpen={setNavOpen} />
	);
};


