import { getNextStaticProps, is404 } from '@faustjs/next';
import { Footer, Header, Hero } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { client, Page as PageType } from 'client';

export interface PageProps {
  page: PageType | PageType['preview']['node'] | null | undefined;
}

export function PageComponent({ page }: PageProps) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  const enqueuedStylesheets = page.enqueuedStylesheets().edges;
  const addAsset = asset => {
    if (asset.src !== null && asset.src !== undefined) {
      return (<link rel="stylesheet" href={(asset.src.includes('http') ? '' : process.env.NEXT_PUBLIC_WORDPRESS_URL) + asset.src} key={asset.id} />)
    }
  }

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>
          {page?.title()} - {generalSettings.title}
        </title>
        {enqueuedStylesheets.map((sheet) => {
          return addAsset(sheet.node);
        })}
      </Head>
      <div id="page" className='container site'>
      <main className="content content-single">
        <div dangerouslySetInnerHTML={{ __html: page?.content() ?? '' }} />
      </main>
       </div>
      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export default function Page() {
  const { usePage } = client;
  const page = usePage();

  return <PageComponent page={page} />;
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
