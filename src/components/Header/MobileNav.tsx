import Link from "next/link";
import UtilityNavLinks from "./UtilityNavLinks";
import MenuNavigation from "components/Navigation/Navbar";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { parseHtml } from "lib/parser";
import { useCookies } from "react-cookie";
import SearchBar from "components/Search/SearchBar";
import { clear } from "console";

export default function MobileNav({
  links,
  menuOpen = false,
  navOpen = false,
  setNavOpen,
  headerSettings,
  showNavigation,
  children = <></>,
}) {
  const [cookies, setCookie] = useCookies(["ismember"]);
  //const [navOpen, setNavOpen] = useState(false);
  useEffect(() => {
    if (navOpen) {
      document.querySelector("html").classList.add("nav-open");
    } else {
      document.querySelector("html").classList.remove("nav-open");
    }
  }, [navOpen]);
  const trackMember = (e) => {
    let expires = new Date();
    expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000);
    setCookie("ismember", "true", {
      expires,
    });
  };

  useEffect(() => {
    setNavOpen(menuOpen);
    // Clear the search input field after submit
    setInputValue("");
    searchInlineRef.current.value = "";
  }, [menuOpen]);

  const searchInlineRef = useRef(null);
  const { push, query } = useRouter();
  const { searchCursor, s = "" } = query;
  const [searchIsFocused, setSearchIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const focusSearch = () => {
    setSearchIsFocused(true);
    setInputValue(searchInlineRef?.current?.value);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    push(`/search/?s=${searchInlineRef.current.value}`);
    setInputValue(searchInlineRef.current.value);
    if(searchInlineRef.current.value === s) setNavOpen(false); // if the search term is repeated then close the navigation
  };

  const clearSearch = () => {
    setInputValue("");
    searchInlineRef.current.value = "";
    searchInlineRef.current.focus();
  };

  useEffect(() => {
    searchInlineRef.current.value = s;
  }, [s]);

  return (
    <>
      {showNavigation && (
        <div
          className={`cx-nav__collapse offcanvas offcanvas-end${
            navOpen ? " show" : ""
          }`}
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <button
            type="button"
            className="visually-hidden"
            data-bs-dismiss="offcanvas"
            aria-label="Close navigation"
            onClick={() => {
              setNavOpen(false);
            }}
          ></button>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 cx-nav__navbar">
            <div className="cx-search__search-bar">
              <form role="search" action="/" onSubmit={submitSearch}>
                <div className="cx-search__input--search">
                  {!searchIsFocused && (
                    <img
                      src="/wp-content/uploads/search_icon_dark.svg"
                      alt="search"
                    />
                  )}
                  <input
                    type="search"
                    aria-label="Search"
                    size={100}
                    placeholder="Search"
                    id="cxsearch"
                    name="s"
                    ref={searchInlineRef}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                    }}
                    onFocus={focusSearch}
                    onBlur={() => {
                      if (searchInlineRef?.current?.value == "") {
                        setSearchIsFocused(false);
                      }
                    }}
                  />
                  {inputValue && <span onClick={clearSearch}><button type="button">Clear</button></span>}
                </div>
                {searchIsFocused && (
                  <button
                    type="submit"
                    className="cx-search__submit--search cx-button cx-button--color-positive"
                  >
                    <img src="/wp-content/uploads/search.svg" alt="search" />
                  </button>
                )}
              </form>
            </div>
            {/* Search overlay */}
            {searchIsFocused && (
              <div
                className="cx-nav__overlay"
                onClick={() => setSearchIsFocused(false)}
              ></div>
            )}
            {headerSettings?.headerButtonsMobile &&
            headerSettings?.headerButtonsMobile !== "" ? (
              <li
                className="cx-nav__buttons header-buttons-mobile"
                onClick={() => {
                  setNavOpen(false);
                }}
              >
                {parseHtml(headerSettings.headerButtonsMobile)}
              </li>
            ) : (
              <>
                <li className="nav-item cx-nav__item">
                  <Link
                    className="nav-link cx-nav__link cx-nav__link--primary"
                    href="/mdr?loc=LStUVVkwNi1DO1c1Tj0nLTYsQGBgCmAK&login=mobile"
                    onClick={trackMember}
                  >
                    Log in
                  </Link>
                </li>
                <li className="nav-item cx-nav__item">
                  <Link
                    href="/pay-my-loan/"
                    passHref
                    className="nav-link cx-nav__link cx-nav__link--primary"
                    onClick={() => {
                      let expires = new Date();
                      expires.setTime(
                        expires.getTime() + 30 * 24 * 60 * 60 * 1000
                      );
                      setCookie("ismember", "true", {
                        expires,
                      });
                      setNavOpen(false);
                    }}
                  >
                    Pay my loan
                  </Link>
                </li>
              </>
            )}

            <div className="accordion accordion-flush" id="cxNavAccordion">
              <MenuNavigation
                device="Mobile"
                menuItems={links}
                menuOpen={menuOpen}
                setNavOpen={setNavOpen}
              />
              <span
                className="cx-nav__items"
                onClick={() => {
                  setNavOpen(false);
                }}
              >
                <UtilityNavLinks
                  headerUtilities={headerSettings.headerUtilitiesMobile}
                />
              </span>
            </div>
          </ul>
        </div>
      )}
    </>
  );
}
