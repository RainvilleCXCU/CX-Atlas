import React from 'react';
import Link from 'next/link';
import { Post, client } from 'client';
import Heading, { HeadingProps } from './Heading';
import Image from 'next/image';
import parseHtml from 'lib/parser';
import RelatedPosts from './Posts/relatedPosts';
import Categories from './Posts/categories';

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
  const { useQuery } = client;
  const {blogSidebar} = useQuery().widgetSettings;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <section {...(id && { id })}>
      <div className="wrap archives">
          <aside className="sidebar">
            { blogSidebar && 
              parseHtml(blogSidebar)
            }
            <Categories />
          </aside>
        {posts && posts?.length > 0 && intro && <p>{intro}</p>}
        <div id="post-wrap" className="posts archive-content">
          {posts.map((post) => (
            <div
              key={post.id ?? ''}
              id={`post-${post.id}`}
              className="post"
              >
                
              <div>
                {post.featuredImage &&

				          <div className="featured-image">
                    <Link href={`/blog/${post.slug}`}>
                      <Image src={post.featuredImage?.node.sourceUrl()?.replace(/^(?:\/\/|[^\/]+)*\//gi, '/')} alt='' width={post.featuredImage.node.mediaDetails.width} height={post.featuredImage.node.mediaDetails.height} />
                    </Link>
                  </div>
                }
                <Heading level={postTitleLevel}>
                  <Link href={`/blog/${post.slug}`}>{post.title()}
                  </Link>
                </Heading>
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: post.excerpt() ?? '' }}
                />
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
