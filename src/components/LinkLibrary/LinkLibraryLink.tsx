export interface Props {
    date: string
    url: string
    children
}

function LinkLibraryLink({ date, url, children = <></> }: Props): JSX.Element {

    return (
        <>
        { date && url &&
            <li className="cx-link-lib__item">
                <p className="cx-link-lib__date">
                    <small>{date}</small>
                </p>
                <p className="cx-link-lib__link">
                    <a href={url} className="track_this_link" rel="noopener noreferrer nofollow" target="_blank">
                        {children}
                    </a>
                </p>
            </li>
        }
        </>
    );
}

export default LinkLibraryLink;
