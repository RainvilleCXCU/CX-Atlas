import Heading from "components/Heading";
import { parseHtml } from "lib/parser";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export interface Props {
    id: string;
    title: string;
    content: string;
    url: string;
    featuredImage?;
    categories?;
}

function SearchListing({ id, title, content, url = '', featuredImage, categories }: Props): JSX.Element {
    return (

        <article id={`post-${id}`} className="post" aria-label={title}>
            <div className="post-content">

                {featuredImage && featuredImage.node?.sourceUrl &&
                    <div className="cx-search__thumbnail">
                        <Image src={featuredImage.node?.sourceUrl?.replace(/^(?:\/\/|[^\/]+)*\//gi, '/')} alt='' width={featuredImage.node.mediaDetails.width || '100'} height={featuredImage.node?.mediaDetails.height || '100'} priority={true} />
                    </div>
                }
                <div className="cx-search__content">

                    <header className="entry-header">
                        <Heading level={'h2'} className="cx-h3"><Link href={url} rel="bookmark">{title}</Link></Heading>
                        {categories &&
                            <div className="categories">
                                {categories.map((a, i) => (
                                    <Fragment key={`post-category-${a.name?.replace(' ', '_')}`}>
                                        <Link href={a.uri || ''}>{a.name}</Link>{i != categories.length - 1 ? ', ' : ""}
                                    </Fragment>
                                ))}
                            </div>
                        }
                    </header>
                    { content && 
                        <div className="entry-content">
                            {parseHtml(content.replace('[&hellip;]', ''))}
                        </div>
                    }
                </div>
            </div>

        </article>
    );
}

export default SearchListing;
