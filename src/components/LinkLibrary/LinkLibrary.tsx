import React, { useContext, useEffect, useState } from "react";
import { client } from 'client';
import Link from "next/link";
import { Store } from "context/store";
import LinkLibraryCatLink from "./NavItem";
import LinkLibraryList from "./List";

export interface Props {
    cat_ids: [{
        id: string,
        name: string,
        dateFormat: string
    }],
    children
}

function LinkLibrary({ cat_ids, children = <></> }: Props): JSX.Element {
    const [state, setState] = useContext(Store);
    const [activeCat, setActiveCat] = useState(null);

    useEffect(() => {
        setActiveCat(state?.linkLibrary?.activeCat)
    }, [state?.linkLibrary?.activeCat]);

    useEffect(() => {
        setState({
            ...state,
            linkLibrary: {
                activeCat: cat_ids[0]
            }
        });
    }, [cat_ids]);
    return (
        <>
            <nav aria-label="secondary" className="cx-link-lib-cats">
                <ul className="cx-link-lib-cats__list">
                    {
                        cat_ids?.map((category, index) => (
                            <li className="cx-link-lib-cats__item" key={`list-link-${category.id}`}>
                                <LinkLibraryCatLink category={category}>{category.name}</LinkLibraryCatLink>
                            </li>
                        ))
                    }
                </ul>
            </nav>
            {
                activeCat &&
                <LinkLibraryList category={activeCat}></LinkLibraryList>
            }
        </>
    );
}

export default LinkLibrary;
