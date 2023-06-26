import { Post, client } from "client";
import Link from "next/link";
import React, { Fragment } from "react";

interface RelatedPostsProps {
	id: string;
    title?: string;
    className?: string;
    relatedPosts: Array<Post>
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ id, title = "Related Posts", className }) => {
    const { useQuery } = client;
    const relatedPosts = useQuery().relatedPosts({postId:id});
	return (
        <>
        {
            relatedPosts && 
            <div className={`searchwp-related${className ? ` ${className}` : ''}`}>
                <h4>{title}</h4>
                <ul>
                {relatedPosts.map((post, index) => (
                    <li key={post.title()}><p><Link href={post.uri ?? ""}>{post.title()}</Link></p></li>
                ))}
                </ul>
            </div>
        }
        </>
	);
};

export default RelatedPosts;
