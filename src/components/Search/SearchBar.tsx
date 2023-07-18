import { Category, Edge } from "client";
import Heading from "components/Heading";
import { parseHtml } from "lib/parser";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

export interface Props {
}

function SearchBar({ }: Props): JSX.Element {
    const searchInlineRef = useRef(null);
    const router = useRouter();
    const { searchCursor, s = '' } = useRouter().query;

    const submitSearch = (e) => {
        e.preventDefault();
        router.push(`/search/?s=${searchInlineRef.current.value}`);
    }

    useEffect(() => {
        searchInlineRef.current.value = s;
    },[s])

    return (
        <div className="cx-search__search-bar">
            <form role="search" action="/" onSubmit={submitSearch}>
                <div className="cx-search__input--search">
                    <input type="search" aria-label="Search" size={100} placeholder="Search" id="cxsearch" name="s" ref={searchInlineRef} />
                    <button type="submit" className="cx-search__submit--search cx-button cx-button--outlined">Search </button>
                </div>
            </form>
        </div>
    );
}

export default SearchBar;