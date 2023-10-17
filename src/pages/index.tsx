import { getNextStaticProps, is404 } from '@faustjs/next';
import { GetStaticPropsContext } from 'next';
import { client, Page as PageType, PageIdType } from 'client';
import React from 'react';
import { useState, useEffect } from 'react';
import Layout from 'components/layout';
import apolloClient from 'apolloClient';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

export interface PageProps {
  page: PageType | PageType['preview']['node'] | null | undefined;
}

export default function Page() {
  const { usePage } = client;
  const router = useRouter();
	const { useQuery } = client;
	const postPreview = useQuery().postPreview;

  let page = usePage({
    id: '/',
    idType: PageIdType.URI
  });

  if(router.query.page_id && router.query.preview && router.query._ppp) {
    page = postPreview({
      pageId: router.query.page_id.toString()
    })
  }
  
  return (
    <>
      <Layout page={page} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
    revalidate: 10,
    notFound: await is404(context, { client }),
  });
}