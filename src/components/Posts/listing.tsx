import { HeadingProps } from '../Heading';
import { parseHtml } from 'lib/parser';
import dynamic from 'next/dynamic';
const Pagination = dynamic(() => import('components/Pagination'));
const PostListing = dynamic(() => import('./postListing'));

interface Props {
  posts;
  intro?: string;
  id?: string;
  heading?: string;
  category?: string;
  categoryName?: string;
  headingLevel?: HeadingProps['level'];
  postTitleLevel?: HeadingProps['level'];
  postsPerPage?: number;
  postInfo?;
  readMoreText?: string;
  currentPage?: number;
  blogSidebar;
}

function Posts({
  posts,
  intro,
  heading,
  id,
  category,
  categoryName,
  headingLevel = 'h1',
  postTitleLevel = 'h2',
  readMoreText = 'Read more',
  postsPerPage = 6,
  currentPage = 1,
  postInfo,
  blogSidebar
}: Props): JSX.Element {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <section {...(id && { id })} className='blog-wrapper'>
      <div className="wrap archives">
        <aside className="sidebar">
          {blogSidebar &&
            parseHtml(blogSidebar)
          }
        </aside>
        {posts && posts?.length > 0 && intro && <p>{intro}</p>}
        <div id="post-wrap" className="posts archive-content">
          {categoryName &&

            <h2 className="no-margin"><span className="screen-reader-text">Category: </span><span>{categoryName}</span></h2>
          }
          {posts?.map((post) => (
              <PostListing
                key={`listing-${post.id}`}
                post={post}
              />
          ))}
          <Pagination currentPage={currentPage} totalResults={postInfo?.offsetPagination?.total} basePath={`/blog${category ? `/category/${category}` : ''}`} perPage={postsPerPage} />
          {posts && posts?.length < 1 && <p>No posts found.</p>}
                          
        </div>
      </div>
    </section>
  );
}

export default Posts;
