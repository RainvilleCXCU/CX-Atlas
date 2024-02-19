import React from 'react';
import Script from 'next/script';
import { Router, useRouter } from 'next/router';
import { client, Page as PageType, PageIdType, PostIdType } from 'client';

export interface Props {
}

function NotFound({
}: Props): JSX.Element {
  const { useQuery } = client;
  const {asPath, push} = useRouter();
  
  if(asPath) {
    const pathArray = asPath.split('/')
    const post = useQuery().post({
        id:pathArray[pathArray.length-2],
        idType: PostIdType.SLUG
    });
    if(post.uri && post.uri !== asPath) {
        push(post.uri);
    }
  }
  return (
    <>      </>
  );
}

export default NotFound;
