import React, { useContext, useEffect, useState } from "react";
import { client } from 'client';
import { Store } from "context/store";
import LinkLibraryLink from "./LinkLibraryLink";
import dateFormat from 'dateformat';


export interface Props {
    category: {
        id: string,
        name: string,
        dateFormat: string
    }
}

function LinkLibraryList({ category }: Props): JSX.Element {
    const [state, setState] = useContext(Store);
    const [activeCat, setActiveCAt] = useState(null);

    const links = client.useQuery().linkLibraryByCatId({
        catId: parseInt(category?.id)
    })
    
    return (
        <div className={`linklist LinkLibraryCat LinkLibraryCat${category?.name}`}>
            <div id={`LinkLibraryCat-${category?.name}`}>
                <div className="linklistcatname">
                    <span className="linklistcatclass">{category?.name}</span>
                </div>
            </div>
            <ul>
                {
                    links && 
                    links.map((link, index) => (
                        <LinkLibraryLink key={`link-lib-link-${link.id}`} date={dateFormat(link.date, category.dateFormat)} url={link.url}>{link.title}</LinkLibraryLink>
                    ))
                }
            </ul>
        </div>            
    );
}

export default LinkLibraryList;
