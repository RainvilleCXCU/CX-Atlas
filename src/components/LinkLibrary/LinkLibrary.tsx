import { useContext, useEffect, useState } from "react";
import { Store } from "context/store";
import LinkLibraryCatLinks from "./NavItem";
import LinkLibraryList from "./List";
import { useRouter } from "next/router";
import { getDynamicQueryVal } from '../../utils/urlParser';

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
    const [currPage, setCurrPage] = useState('1');

    const router = useRouter();

    const cat = getDynamicQueryVal({
        urlObj: router.query.wordpressNode,
        key: 'media-center'
    })

    useEffect(() => {
        if(router.query.page) {
            setCurrPage(router.query.page.toString());
        }
    }, [router.query.page]);

    useEffect(() => {
        console.log('CAT!!!!!!');
        console.log(cat);
        if((cat == '' || cat === undefined) && !router.query.preview) {
            console.log('NO ACTIVE ID!!!!')
            router.push(`/about/media-center/${cat_ids[0].id}`, undefined, {shallow:true});
        } else {
            setActiveCat(cat_ids.filter(category => category.id == cat).length === 1 ? cat_ids.filter(category => category.id == cat)[0] : cat_ids[0])
            setState(state => ({
                ...state,
                linkLibrary: {
                    ...state.linkLibrary,
                    activeCat: cat_ids.filter(category => category.id == cat).length === 1 ? cat_ids.filter(category => category.id == cat)[0] : cat_ids[0],
                    activePage: currPage
                }
            }));
        }
    }, [cat, currPage]);
    return (
        <div className="cx-link-library">
            <nav aria-label="secondary">
                <LinkLibraryCatLinks categories={cat_ids} type="link"></LinkLibraryCatLinks>
                <LinkLibraryCatLinks categories={cat_ids} type="select"></LinkLibraryCatLinks>
            </nav>
            { state?.linkLibrary?.activeCat?.id === activeCat?.id &&
                <LinkLibraryList category={activeCat}></LinkLibraryList>
            }
        </div>
    );
}

export default LinkLibrary;
