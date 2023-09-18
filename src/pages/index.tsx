import { getNextStaticProps, is404 } from '@faustjs/next';
import { GetStaticPropsContext } from 'next';
import { client, Page as PageType, PageIdType } from 'client';
import React from 'react';
import { useState, useEffect } from 'react';
import Layout from 'components/layout';
import apolloClient from 'apolloClient';
import { gql, useQuery } from '@apollo/client';

export interface PageProps {
  page: PageType | PageType['preview']['node'] | null | undefined;
}

export default function Page() {
  const { usePage } = client;
  const page = usePage({
    id: '/',
    idType: PageIdType.URI
  });
  
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
    notFound: await is404(context, { client }),
  });
}