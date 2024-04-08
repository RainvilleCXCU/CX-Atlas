import { useContext, useEffect, useState } from "react";
import { Store } from "context/store";
import LinkLibraryLink from "./LinkLibraryLink";
import dateFormat from 'dateformat';
import Pagination from "components/Pagination";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

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

    const LinkQuery = useQuery(gql`
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

    const getLinks = ($id: number) => {
        const newLinks = LinkQuery.refetch({catid: $id});
       return newLinks;
    }

    useEffect(() => {
        console.log('Get Links');
        console.log(`${category?.id} - ${activeCat}`)
        if(category?.id && category?.id !== activeCat) {
            getLinks(parseInt(category?.id));
            setActiveCat(category?.id);
        }
        console.log('DATA');
        console.log(LinkQuery.data);
    }, [category])

    return (
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
    );
}

export default LinkLibraryList;
