import { useContext, useEffect, useState } from "react";
import { Store } from "context/store";
import { useRouter } from "next/router";

export interface Props {
    categories: [{
        id: string,
        name: string,
        dateFormat: string
    }],
    type: string
}

function LinkLibraryCatLinks({ categories, type = 'link' }: Props): JSX.Element {
    const [state, setState] = useContext(Store);
    const router = useRouter();

    const showCategory = (category) => {
        // setState({
        //     ...state,
        //     linkLibrary: {
        //         ...state.linkLibrary,
        //         activeCat: category,
        //         activePage: 1
        //     }
        // })
        const url = '/about/media-center/';
        console.log('Query');
        console.log(router.query);
        router.push(`${url}${category.id}`, undefined, {shallow:true})
    }

    useEffect(() => {
        // setActiveCat(state?.linkLibrary?.activeCat);
        console.log('Active Cat');
        console.log(state?.linkLibrary?.activeCat);
        return () => {}
    }, [state?.linkLibrary?.activeCat])

    if (type === "link") {
        return (
            <span className="cx-link-lib-cats">
                <ul className="cx-link-lib-cats__list cx-link-lib-cats__list--links">
                    {
                        categories?.map((category, index) => (
                            <li className="cx-link-lib-cats__item" key={`list-link-${category.id}`}>
                                <a className={`cx-link cx-link--large cx-link-lib-cats__link${state?.linkLibrary?.activeCat?.id === category?.id ? ' cx-link-lib-active' : ''}`} data-catid={category?.id}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        showCategory(category);
                                    }}>
                                    {category?.name}
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </span>
        )
    } else if (type === 'select') {
        return (
            <span className="linktable">
                <select className="cx-link-lib-cats__list--select catdropdown catdropdown1"
                    onChange={(e) => {
                        e.preventDefault();
                        showCategory(JSON.parse(e.currentTarget.value));
                    }} value={JSON.stringify(state?.linkLibrary?.activeCat ? state?.linkLibrary?.activeCat : categories[0])}>
                    {
                        categories?.map((category, index) => (
                            <option value={JSON.stringify(category)} key={`category-option-${category.id}`}
                            >{category?.name}</option>
                        ))
                    }
                </select>
            </span>
        )
    }
}

export default LinkLibraryCatLinks;
