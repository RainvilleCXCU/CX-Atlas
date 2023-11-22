import { getNextStaticProps, is404 } from '@faustjs/next';
import { client, Post } from 'client';
import { Footer, Header } from 'components';
import { addCSSAsset, addJSAsset } from "../../../../lib/enqueuedFiles";
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import GTM from 'components/ThirdParty/gtm';
import RelatedPosts from 'components/Posts/relatedPosts';
import Categories from 'components/Posts/categories';
import Image from 'next/image';
import { parseHtml } from 'lib/parser';
import Link from 'next/link';
import { Fragment } from 'react';
import HotJar from 'components/ThirdParty/hotjar';
import Qualtrics from 'components/ThirdParty/qualtrics';
import Spectrum from 'components/ThirdParty/spectrum';
import Personyze from 'components/ThirdParty/personyze';

export interface PostProps {
  post: Post | Post['preview']['node'] | null | undefined;
}

export function PostComponent({ post }: PostProps) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  const enqueuedStylesheets = post.enqueuedStylesheets().edges;
  const blogSidebar = useQuery().widgetSettings.blogSidebar;

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>
          {`${post?.title()} - ${generalSettings.title}`}
        </title>
        {enqueuedStylesheets.map((sheet) => {
          return addCSSAsset(sheet.node);
        })}
      </Head>
      <GTM />
      <Personyze />
      <HotJar />

      <div id="page" className="container site">
        <main className="content single-post">
          <article className="post">

            <aside className="sidebar">
              {blogSidebar &&
                parseHtml(blogSidebar)
              }
              {post.databaseId &&
                <RelatedPosts id={post.databaseId?.toString()} />
              }
              <Categories />
            </aside>
            <div className='post-content'>
              <header className='entry-header'>
                <div className='featured-image'>
                  <Image src={post.featuredImage?.node.sourceUrl()?.replace(/^(?:\/\/|[^\/]+)*\//gi, '/')} alt='' width={post.featuredImage.node.mediaDetails.width} height={post.featuredImage.node.mediaDetails.height} />
                </div>
                <h1>{post.title()}</h1>
                {post.categories &&
                  <div className='categories'>
                    {post.categories().nodes.map((category, index) => (
                      <Fragment key={category.name}>
                        {category.uri &&
                          <><Link href={category.uri}>{category.name}</Link>{index < post.categories().nodes.length - 1 ? ', ' : ''}</>
                        }
                      </Fragment>
                    ))}
                  </div>}
              </header>
              <div className='entry-content'>
                {parseHtml(post?.content() ?? "")}

			          <div id="cx-qt-feedback" className="blog-post"></div>
              </div>
            </div>
          </article>
        </main>
      </div>
      <Footer copyrightHolder={generalSettings.title} />
			<Qualtrics />
			<Spectrum />
    </>
  );
}

export default function Page() {
  const { usePost } = client;
  const post = usePost();

  return <PostComponent post={post} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
    revalidate: parseInt(process.env.POST_REVALIDATION) ? parseInt(process.env.POST_REVALIDATION) : null,
    notFound: await is404(context, { client }),
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
