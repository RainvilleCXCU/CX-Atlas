import { getNextStaticProps, is404 } from '@faustjs/next';
import { client, Post } from 'client';
import { Footer, Header } from 'components';
import { addCSSAsset, addJSAsset } from "../../../lib/enqueuedFiles";
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import GTM from 'components/ThirdParty/gtm';

export interface PostProps {
  post: Post | Post['preview']['node'] | null | undefined;
}

export function PostComponent({ post }: PostProps) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  const enqueuedStylesheets = post.enqueuedStylesheets().edges;

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>
          {post?.title()} - {generalSettings.title}
        </title>
        {enqueuedStylesheets.map((sheet) => {
          return addCSSAsset(sheet.node);
        })}
      </Head>
      <GTM />

      <main className="content content-single">
        <div className="wrap">
          <div dangerouslySetInnerHTML={{ __html: post?.content() ?? '' }} />
        </div>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
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
    notFound: await is404(context, { client }),
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
