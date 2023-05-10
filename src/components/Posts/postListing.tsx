import { MediaItem, Post, client } from "client";
import Heading from "components/Heading";
import { HeadingProps } from "components/Heading";
import parseHtml from "lib/parser";
import RenderResult from "next/dist/server/render-result";
import Image from "next/image";
import Link from "next/link";
import { format } from "path";
import React from "react";

interface PostListingProps {
    post: Post;
    className?: string;
    featuredImage?: MediaItem;
    postTitleLevel?: HeadingProps['level'];
}

const PostListing: React.FC<PostListingProps> = ({ post, className, postTitleLevel = 'h2' }) => {
    return (
        <div
            key={post.id}
            id={`post-${post.id}`}
            className={`post${className ? ` ${className}` : ''}`}
        >
            <header className='entry-header'>
                {post.featuredImage &&

                    <div className="featured-image">
                        <Link href={`${post.uri}`}>
                            <Image src={post.featuredImage.node?.sourceUrl()?.replace(/^(?:\/\/|[^\/]+)*\//gi, '/')} alt='' width={post.featuredImage.node.mediaDetails.width} height={post.featuredImage.node?.mediaDetails.height} />
                        </Link>
                    </div>
                }
                <Heading level={postTitleLevel}>
                    <Link href={`${post.uri}`}>{post.title()}
                    </Link>
                </Heading>
                {post.categories &&
                    <div className='categories'>
                        {post.categories().nodes?.map((category, index) => (
                            <span key={`category-${index}-${category.name}`}>
                                {category.uri &&
                                    <><Link href={category.uri}>{category.name}</Link>{index < post.categories().nodes.length - 1 ? ', ' : ''}</>
                                }
                            </span>
                        ))}
                    </div>
                }
            </header>
            <div className="excerpt">
                {parseHtml(post.excerpt() ?? "")}
            </div>
        </div>
    );
};

export default PostListing;
