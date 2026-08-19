import { useContext, useEffect, useState } from "react";
import { Store } from "context/store";
import LinkLibraryLink from "./LinkLibraryLink";
import dateFormat from 'dateformat';
const Pagination = dynamic(() => import('components/Pagination'))
import { gql, useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

export interface Props {
    category?: {
        id: string,
        name?: string,
        dateFormat?: string
    }
    encodedList?,
    slug?: string
}

function LinkLibraryList({ category = null, encodedList = null, slug }: Props): JSX.Element {
    const [state, setState] = useContext(Store);
    const [activeCat, setActiveCat] = useState(null)
    const postPerPage = 7;
    const router = useRouter();
    let LinkQuery;
    if(!encodedList) {
        LinkQuery = useQuery(gql`
        query GetLinkData($id: Float!) {
            linkLibraryByCatId(catId: $id) {
                id
                date
                title
                url
            }
            
        }`, {
            variables: {
                id: parseInt(category?.id)
            }
        });
    }

    // const url = getPageUri(router.query.pageUri ? router.query.pageUri : ['/']);
    const url = encodedList && slug ? slug : `/about/media-center/`;

    const pageinate = (page) => {
        setState(state => ({
            ...state,
            linkLibrary: {
                ...state.linkLibrary,
                activePage: page
            }
        }));
    }

    useEffect(() => {
        console.log('Get Links');
        console.log(`${category?.id} - ${activeCat}`)
        if(category?.id && category?.id !== activeCat) {
            // getLinks(parseInt(category?.id));
            setActiveCat(category?.id);
        }
        console.log('DATA');
        console.log(LinkQuery?.data);
    }, [category])

    return (
        <>
            { category?.id && LinkQuery?.data?.linkLibraryByCatId && LinkQuery?.data?.linkLibraryByCatId.length !== 0 &&
                <div className={`linklist LinkLibraryCat LinkLibraryCat${category?.name}`}> 
                    <div id={`LinkLibraryCat-${category?.name}`}>
                        <div className="linklistcatname">
                            <span className="linklistcatclass">{category?.name}</span>
                        </div>
                    </div>
                    {
                        LinkQuery?.data?.linkLibraryByCatId && LinkQuery?.data?.linkLibraryByCatId.length > 0 &&
                        <>
                            <ul>
                                {
                                    LinkQuery?.data?.linkLibraryByCatId.map((link, index) => (
                                        <LinkLibraryLink key={`link-lib-link-${link.id}`} date={link.date && dateFormat(link?.date, category?.dateFormat)} url={link.url}>{link.title}</LinkLibraryLink>
                                    )).filter((e, i) => i >= ((state?.linkLibrary?.activePage - 1) * postPerPage) && i < ((state?.linkLibrary?.activePage - 1) * postPerPage) + postPerPage)
                                }
                            </ul>
                            <Pagination currentPage={parseInt(state?.linkLibrary?.activePage)} totalResults={LinkQuery?.data?.linkLibraryByCatId.length} basePath={`${url}${category?.id}`} perPage={10} shallow={true} clickHandler={pageinate} />
                        </>
                    }
                </div>
            }
            { encodedList &&
                <div className="cx-link-library__encoded-list">
                    <>  
                        <ul className="no-padding">
                            {
                                encodedList.map((link, index) => (
                                    <LinkLibraryLink template="expanded" key={`link-lib-link-${link.id}`} date={link.date && dateFormat(link?.date, link?.dateFormat)} url={link.url} pill={link?.categoryPill} description={link?.description} category={link.category}>{link.title}</LinkLibraryLink>
                                )).filter((e, i) => i >= ((state?.linkLibrary?.activePage - 1) * postPerPage) && i < ((state?.linkLibrary?.activePage - 1) * postPerPage) + postPerPage)
                            }
                        </ul>
                        <Pagination currentPage={parseInt(state?.linkLibrary?.activePage)} totalResults={encodedList.length} basePath={`${url}`} perPage={postPerPage} shallow={true} clickHandler={pageinate} variant="green" />
                    </>
                </div>
            }
        </>
    );
}

export default LinkLibraryList;
