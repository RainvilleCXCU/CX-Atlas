import { useContext, useEffect, useState } from "react";
import { Store } from "context/store";
import LinkLibraryCatLinks from "./NavItem";
import LinkLibraryList from "./List";
import { useRouter } from "next/router";
import { getDynamicQueryVal, getPageNum } from '../../utils/urlParser';

export interface Props {
    cat_ids?: [{
        id: string,
        name: string,
        dateFormat: string
    }],
    encodedList?: string,
    slug?: string,
    children
}

function LinkLibrary({ cat_ids = null, encodedList = null, slug = null, children = <></> }: Props): JSX.Element {
    const [state, setState] = useContext(Store);
    const [activeCat, setActiveCat] = useState(null);
    const [currPage, setCurrPage] = useState('1');

    const router = useRouter();

    const cat = getDynamicQueryVal({
        urlObj: router.query.wordpressNode,
        key: 'media-center'
    })

    // Resolve the current page from the URL on load and on navigation.
    // Wait for router.isReady so the query is populated on a direct/static load,
    // then prefer the rewrite's ?page= value and fall back to parsing the path
    // (/…/page/N) so it works even when the query param isn't present.
    useEffect(() => {
        if(!router.isReady || !((cat_ids && cat_ids.length > 0) || encodedList)) return;

        let page = router.query.page?.toString();
        if(!page) {
            const segments = router.asPath.split('?')[0].split('/').filter(Boolean);
            const parsed = getPageNum(segments);
            page = parsed && !isNaN(parsed) ? parsed.toString() : '1';
        }
        setCurrPage(page);
    }, [router.isReady, router.query.page, router.asPath]);

    useEffect(() => {
        console.log('CAT!!!!!!');
        console.log(cat);
        if(cat_ids && cat_ids.length > 0 && !encodedList) {
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
        } else {
            setState(state => ({
                ...state,
                linkLibrary: {
                    ...state.linkLibrary,
                    activeCat: null,
                    activePage: currPage
                }
            }));
        }
    }, [cat, currPage]);
    return (
        <div className="cx-link-library">
            {encodedList &&
                <LinkLibraryList slug={slug} encodedList={encodedList}></LinkLibraryList>
            }
            { !encodedList && cat_ids &&
                <nav aria-label="secondary">
                    <LinkLibraryCatLinks categories={cat_ids} type="link"></LinkLibraryCatLinks>
                    <LinkLibraryCatLinks categories={cat_ids} type="select"></LinkLibraryCatLinks>
                </nav>
            }
            { state?.linkLibrary?.activeCat?.id === activeCat?.id && !encodedList &&
                <LinkLibraryList category={activeCat}></LinkLibraryList>
            }
        </div>
    );
}

export default LinkLibrary;
