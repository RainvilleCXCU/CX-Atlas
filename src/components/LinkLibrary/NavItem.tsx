import React, { useContext, useEffect, useState } from "react";
import { client } from 'client';
import Accordion from "components/Accordion/Accordion";
import Link from "next/link";
import { Store } from "context/store";

export interface Props {
    category: {
        id: string,
        name: string,
        dateFormat: string
    }
    children
}

function LinkLibraryCatLink({ category, children = <></> }: Props): JSX.Element {
    const { useQuery } = client;
    const [state, setState] = useContext(Store);
    const [active, setActive] = useState(false)

    const showCategory = (e) => {
        e.preventDefault();
        setState({
            ...state,
            linkLibrary: {
                activeCat: category
            }
        });
    }

    useEffect(() => {
        setActive(state?.linkLibrary?.activeCat === category)
    }, [state?.linkLibrary?.activeCat])

    return (
        <a href="#" className={`cx-link cx-link--large cx-link-lib-cats__link${active ? ' cx-link-lib-active' : ''}`} data-catid={category?.id}
				onClick={showCategory}>
            {children}
        </a>           
    );
}

export default LinkLibraryCatLink;
