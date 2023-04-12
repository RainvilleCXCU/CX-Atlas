import React from 'react';
import Link from 'next/link';
import type { Post } from 'client';
import Heading, { HeadingProps } from './Heading';

interface Props {
  posts: Post[] | undefined;
  intro?: string;
  id?: string;
  heading?: string;
  headingLevel?: HeadingProps['level'];
  postTitleLevel?: HeadingProps['level'];
  readMoreText?: string;
}

function Posts({
  posts,
  intro,
  heading,
  id,
  headingLevel = 'h1',
  postTitleLevel = 'h2',
  readMoreText = 'Read more',
}: Props): JSX.Element {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <section {...(id && { id })}>
      <div className="wrap">
        {heading && (
          <Heading level={headingLevel}>
            {heading}
          </Heading>
        )}
        {posts && posts?.length > 0 && intro && <p>{intro}</p>}
        <div className="posts">
          
          {posts.map((post) => (
            <div
              key={post.id ?? ''}
              id={`post-${post.id}`}>
              <div>
                <Heading level={postTitleLevel}>
                  <Link href={`/posts/${post.slug}`}>{post.title()}
                  </Link>
                </Heading>
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: post.excerpt() ?? '' }}
                />
                <Link href={`/posts/${post.slug}`} aria-label={`Read more about ${post.title || 'the post'}`}>
                    {readMoreText}
                </Link>
              </div>
            </div>
          ))}
          {posts && posts?.length < 1 && <p>No posts found.</p>}
        </div>
      </div>
    </section>
  );
}

export default Posts;
