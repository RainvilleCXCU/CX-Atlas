import React from "react";
//import { client, FaqIdType } from 'client';
import Accordion from "components/Accordion/Accordion";

export interface Props {
	id: string;
	title: string;
	content: string;
	isOpen: boolean;
}

function FAQ({ id, title, content, isOpen }: Props): JSX.Element {
	/*const { useQuery } = client;
  const faqItem = useQuery().faqBy({
    faqId: parseInt(id)
  });*/
	return (
		<div id={id}>
			<Accordion title={title} content={content} isOpen={isOpen} />
		</div>
	);
}

export default FAQ;
