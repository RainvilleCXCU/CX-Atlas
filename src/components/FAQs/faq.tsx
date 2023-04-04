import React from 'react';
//import { client, FaqIdType } from 'client';

export interface Props {
  id: string;
}

function FAQ({
  id,
}: Props): JSX.Element {
  /*const { useQuery } = client;
  const faqItem = useQuery().faqBy({
    faqId: parseInt(id)
  });*/
  return (
    <div id={id}>
      <div>Question: </div>
      <div dangerouslySetInnerHTML={{__html: ''}}></div>
  </div>
  );
}

export default FAQ;
