import { client } from "client";
import Link from "next/link";
import React from "react";

interface RelatedPostsProps {
	id: string;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ id }) => {
    const { useQuery } = client;
    const relatedPosts = useQuery().relatedPosts({postId:id});
	return (
        <div className="searchwp-related">
            <h4>Related Posts</h4>
            <ul>
            {relatedPosts.map((post) => (
                <>
                { post.url && post.id !== id &&
                    <li><p><Link href={post.url}>{post.title}</Link></p></li>
                }
                </>
            ))}
            </ul>
        </div>
	);
};

export default RelatedPosts;
