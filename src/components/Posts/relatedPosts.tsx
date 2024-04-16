import Link from "next/link";
import { FC } from 'react';
interface RelatedPostsProps {
	id: string;
    title?: string;
    className?: string;
    relatedPosts?;
}

const RelatedPosts: FC<RelatedPostsProps> = ({ id, title = "Related Posts", className, relatedPosts }) => {
	return (
        <>
        {
            relatedPosts && 
            <div className={`searchwp-related${className ? ` ${className}` : ''}`}>
                <h4>{title}</h4>
                <ul>
                {relatedPosts.map((post, index) => (
                    <li key={post.title + '-' + index}><p><Link href={post.uri ?? ""}>{post.title}</Link></p></li>
                ))}
                </ul>
            </div>
        }
        </>
	);
};

export default RelatedPosts;
