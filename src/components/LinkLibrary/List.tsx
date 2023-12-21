import React, { useContext, useEffect, useState } from "react";
import { client } from 'client';
import { Store } from "context/store";
import LinkLibraryLink from "./LinkLibraryLink";
import dateFormat from 'dateformat';
import Pagination from "components/Pagination";
import { useRouter } from "next/router";
import { getPageUri } from "lib/routing";


export interface Props {
    category: {
        id: string,
        name?: string,
        dateFormat?: string
    }
}

function LinkLibraryList({ category }: Props): JSX.Element {
    const [state, setState] = useContext(Store);
    const [activeCat, setActiveCat] = useState(null)
    const postPerPage = 7;
    const router = useRouter();

    // const url = getPageUri(router.query.pageUri ? router.query.pageUri : ['/']);
    const url = '/about/media-center/';

    const pageinate = (page) => {
        setState({
            ...state,
            linkLibrary: {
                ...state.linkLibrary,
                activePage: page
            }
        });
        console.log('Query');
        console.log(router.query);
        // router.push(`${url}${category.id}`, undefined, { shallow: true });
    }

    let links = client.useQuery().linkLibraryByCatId({
        catId: parseInt(category?.id)
    })
    console.log(`LINKS for : ${category?.id}`);
    console.log(links.length);
    console.log(category)
    // const getLinks = (id) => {
    //     return client.useQuery().linkLibraryByCatId({
    //         catId: parseInt(category?.id)
    //     })
    // }

    // useEffect(() => {
    //     links = getLinks(category?.id);
    // }, [category?.id])

    return (
        <div className={`linklist LinkLibraryCat LinkLibraryCat${category?.name}`}>
            <div id={`LinkLibraryCat-${category?.name}`}>
                <div className="linklistcatname">
                    <span className="linklistcatclass">{category?.name}</span>
                </div>
            </div>
            {
                links.length > 1 &&
                <>
                    <ul>
                        {
                            links.map((link, index) => (
                                <LinkLibraryLink key={`link-lib-link-${link.id}`} date={link.date && dateFormat(link?.date, category?.dateFormat)} url={link.url}>{link.title}</LinkLibraryLink>
                            )).filter((e, i) => i >= ((state?.linkLibrary?.activePage - 1) * postPerPage) && i < ((state?.linkLibrary?.activePage - 1) * postPerPage) + postPerPage)
                        }
                    </ul>
                    <Pagination currentPage={parseInt(state?.linkLibrary?.activePage)} totalResults={links.length} basePath={`${url}${category?.id}`} perPage={10} shallow={true} clickHandler={pageinate} />
                </>
            }
        </div>
    );
}

export default LinkLibraryList;
