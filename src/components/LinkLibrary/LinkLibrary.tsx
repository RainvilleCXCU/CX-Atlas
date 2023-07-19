import React, { useContext, useEffect, useState } from "react";
import { client } from 'client';
import Link from "next/link";
import { Store } from "context/store";
import LinkLibraryCatLinks from "./NavItem";
import LinkLibraryList from "./List";
import { useQuery } from "@apollo/client";
import path from "path";
import { useRouter } from "next/router";

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

    const router = useRouter();


    useEffect(() => {
        setActiveCat(state?.linkLibrary?.activeCat)
    }, [state?.linkLibrary?.activeCat]);

    useEffect(() => {
        const newLib = state.link
        setState({
            ...state,
            linkLibrary: {
                ...state.linkLibrary,
                activeCat: cat_ids.filter(cat => cat.id == router.query.linkLibCatId).length === 1 ? cat_ids.filter(cat => cat.id == router.query.linkLibCatId)[0] : cat_ids[0],
                activePage: router.query.linkLibCatPage ? router.query.linkLibCatPage : 1
            }
        });
    }, [cat_ids]);
    return (
        <div className="cx-link-library">
            <nav aria-label="secondary">
                <LinkLibraryCatLinks categories={cat_ids} type="link"></LinkLibraryCatLinks>
                <LinkLibraryCatLinks categories={cat_ids} type="select"></LinkLibraryCatLinks>
            </nav>
            <LinkLibraryList category={activeCat}></LinkLibraryList>
        </div>
    );
}

export default LinkLibrary;
