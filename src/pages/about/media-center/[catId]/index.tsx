import { client, Page as PageType, PageIdType } from 'client';
import { Router, useRouter } from 'next/router';
import React, { useState, useEffect, useContext } from 'react';
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustjs/next';
import Layout from 'components/layout';
import { Store } from 'context/store';

export interface PageProps {
  page: PageType | PageType['preview']['node'] | null | undefined;
}

export default function Page() {
  const { usePage } = client;
  const { query = {}, isReady } = useRouter();
  const { catId, pageNum = '1' } = query;
  const [state, setState] = useContext(Store);


  let page = usePage({
    id: '/about/media-center/',
    idType: PageIdType.URI
  });
  useEffect(() => {
    setState({
      ...state,
      linkLibrary: {
        ...state.linkLibrary,
        activeId: catId,
        activePage: pageNum ?? '1'
      }
    });
  }, [catId, pageNum]);
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
    revalidate: parseInt(process.env.PAGE_REVALIDATION) ? parseInt(process.env.PAGE_REVALIDATION) : null,
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}
