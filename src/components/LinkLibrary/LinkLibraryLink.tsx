import React, { useContext, useEffect, useState } from "react";
import dateFormat from 'dateformat';
import Link from "next/link";

export interface Props {
    date: string
    url: string
    children
}

function LinkLibraryLink({ date, url = "", children = <></> }: Props): JSX.Element {

    return (
        <li className="cx-link-lib__item">
            <p className="cx-link-lib__date">
                <small>{date}</small>
            </p>
            <p className="cx-link-lib__link">
                <Link href={url} id="link-12116" className="track_this_link" rel="noopener noreferrer nofollow" target="_blank">
                    {children}
                </Link>
            </p>
        </li>        
    );
}

export default LinkLibraryLink;
