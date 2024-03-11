import React, { useContext, useEffect, useState } from "react";
import { Store } from "context/store";
import LinkLibraryCatLinks from "./NavItem";
import LinkLibraryList from "./List";
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
    // const catId = router.query.pageUri[2] ?? cat_ids[0];
    // const page = router.query.pageUri[4] ?? 1;

    useEffect(() => {
        setActiveCat(state?.linkLibrary?.activeCat)
    }, [state?.linkLibrary?.activeCat]);

    useEffect(() => {
        if(state?.linkLibrary?.activeId == 0) {
            console.log('NO ACTIVE ID!!!!')
            router.push(`/about/media-center/${cat_ids[0].id}`, undefined, {shallow:true});
        } else {
            setState({
                ...state,
                linkLibrary: {
                    ...state.linkLibrary,
                    activeCat: cat_ids.filter(cat => cat.id == state?.linkLibrary?.activeId).length === 1 ? cat_ids.filter(cat => cat.id == state?.linkLibrary?.activeId)[0] : cat_ids[0],
                    activePage: state?.linkLibrary?.activePage ?? '1'
                }
            });
        }
    }, [state?.linkLibrary?.activeId]);
    return (
        <div className="cx-link-library">
            <nav aria-label="secondary">
                <LinkLibraryCatLinks categories={cat_ids} type="link"></LinkLibraryCatLinks>
                <LinkLibraryCatLinks categories={cat_ids} type="select"></LinkLibraryCatLinks>
            </nav>
            { state?.linkLibrary?.activeCat?.id === activeCat?.id &&
                <LinkLibraryList category={state?.linkLibrary?.activeCat}></LinkLibraryList>
            }
        </div>
    );
}

export default LinkLibrary;
