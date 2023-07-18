import React, { useContext, useEffect, useState } from "react";
import { client } from 'client';
import Link from "next/link";
import { Store } from "context/store";
import LinkLibraryCatLinks from "./NavItem";
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
            <nav aria-label="secondary">
                <LinkLibraryCatLinks categories={cat_ids} type="link"></LinkLibraryCatLinks>
                <LinkLibraryCatLinks categories={cat_ids} type="select"></LinkLibraryCatLinks>
            </nav>
            <LinkLibraryList category={activeCat}></LinkLibraryList>
        </>
    );
}

export default LinkLibrary;
