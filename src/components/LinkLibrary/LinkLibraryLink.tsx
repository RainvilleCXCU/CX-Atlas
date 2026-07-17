export interface Props {
    date: string
    url: string
    category?: string
    template?: string
    description?: string
    pill?: string
    children
}

function LinkLibraryLink({ date, url, category, template = 'slim', description, pill, children = <></> }: Props): JSX.Element {

    return (
        <>
        { date && url && template === 'slim' ?
            <li className="cx-link-lib__item">
                <p className="cx-link-lib__date">
                    <small>{date}</small>
                </p>
                <p className="cx-link-lib__link">
                    <a href={url} className="track_this_link" rel="noopener noreferrer nofollow" target="_blank">
                        {children}
                    </a>
                </p>
            </li> :
            <li className="cx-link-lib__item cx-link-lib__item-light">
                <p className="cx-link-lib__date cx-flex__elm cx-flex__elm--justify-content--space-between x-slim-margin--vertical-bottom cx-flex__elm--align-items--center">
                    <span className="cx-text--xxx-small cx-text--uppercase">{date}</span>
                    {category && 
                        <span className={`cx-pill cx-pill--slim cx-border--radius-squicle cx-background--color-${pill} cx-text--weight-md cx-border--radius--small cx-text--uppercase cx-text--font-family--ibm-plex-sans cx-text--line-height-tight cx-text--letter-spacing-wide cx-text--xxx-small`}>{category}</span>
                    }
                </p>
                <p className="cx-link-lib__title cx-pdf cx-text--small cx-text--weight-semi-bold x-slim-margin--vertical-bottom">{children}</p>
                {description &&
                    <p className="cx-link-lib__description cx-text--x-small x-slim-margin--vertical-bottom">{description}</p>
                }
                <p className="cx-link-lib__link">
                    <a href={url} className="track_this_link cx-link-icon-right cx-no-pdf cx-link-icon-right__arrow-green" rel="noopener noreferrer nofollow" target="_blank">
                        Read
                    </a>
                </p>
            </li>
        }
        </>
    );
}

export default LinkLibraryLink;
