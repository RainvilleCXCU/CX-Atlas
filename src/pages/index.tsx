import { getNextStaticProps, is404 } from '@faustjs/next';
import { GetStaticPropsContext } from 'next';
import { client, Page as PageType, PageIdType } from 'client';
import React from 'react';
import { useState, useEffect } from 'react';
import Layout from 'components/layout';

export interface PageProps {
  page: PageType | PageType['preview']['node'] | null | undefined;
}

export function PageComponent({ page }: PageProps) {
  return (
    <>
      <Layout page={page} />
    </>
  );
}

export default function Page() {
  const { usePage } = client;
  const page = usePage({
    id: '/',
    idType: PageIdType.URI
  });

  return <PageComponent page={page} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
    notFound: await is404(context, { client }),
  });
}