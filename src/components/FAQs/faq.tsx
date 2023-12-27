import React from "react";
import { client } from 'client';
import Accordion from "components/Accordion/Accordion";

export interface Props {
	id: string;
	title: string;
	content: string;
	isOpen: boolean;
}

function FAQ({ id, title, content, isOpen }: Props): JSX.Element {
	const { useQuery } = client;
	// const faqItem = useQuery().faq({
	// 	faqId: parseInt(id)
	// });
	return (
		<div id={id} className="cx-faq_wrapper">
			<Accordion title={title} content={content} isOpen={isOpen} />
		</div>
	);
}

export default FAQ;
