import Heading from "components/Heading";
import { HeadingProps } from "components/Heading";
import { parseHtml } from "lib/parser";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

interface PostListingProps {
    post;
    className?: string;
    featuredImage?;
    postTitleLevel?: HeadingProps['level'];
}

const PostListing: React.FC<PostListingProps> = ({ post, className, postTitleLevel = 'h2' }) => {
    return (
        <div
            id={`post-${post.id}`}
            className={`post${className ? ` ${className}` : ''}`}
        >
            <header className='entry-header'>
                {post.featuredImage &&
                    <div className="featured-image">
                        <Link href={`${post.uri}`}>
                            <Image src={post.featuredImage.node?.sourceUrl?.replace(/^(?:\/\/|[^\/]+)*\//gi, '/')} alt='' width={post.featuredImage.node.mediaDetails.width} height={post.featuredImage.node?.mediaDetails.height} />
                        </Link>
                    </div>
                }
                <Heading level={postTitleLevel} className="cx-h3">
                    <Link href={`${post.uri}`}>{post?.title}
                    </Link>
                </Heading>
                {post.categories &&
                    <div className='categories'>
                        {post.categories.nodes?.map((category, index) => (
                            <Fragment key={`categories-${post.id}-${index}-${category.name}`}>
                                {category.uri &&
                                    <><Link href={category.uri}>{category.name}</Link>{index < post.categories.nodes.length - 1 ? ', ' : ''}</>
                                }
                            </Fragment>
                        ))}
                    </div>
                }
            </header>
            <div className="excerpt">
                {parseHtml(post.excerpt ?? "")}
            </div>
        </div>
    );
};

export default PostListing;
