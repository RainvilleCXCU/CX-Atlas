import React from 'react';
import { client, FaqIdType } from 'client';

export interface Props {
  id: string;
}

function FAQ({
  id,
}: Props): JSX.Element {
  const { useQuery } = client;
  const faqItem = useQuery().faqBy({
    faqId: parseInt(id)
  });
  return (
    <div id={id}>
      <div>Question: {faqItem.title()}</div>
      <div dangerouslySetInnerHTML={{__html: faqItem.answer}}></div>
    </div>
  );
}

export default FAQ;
