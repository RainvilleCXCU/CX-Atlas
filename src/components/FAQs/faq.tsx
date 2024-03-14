import Accordion from "components/Accordion/Accordion";

export interface Props {
	id: string;
	title: string;
	content: string;
	isOpen?: boolean;
}

function FAQ({ id, title, content, isOpen }: Props): JSX.Element {
	
	return (
		<div className="cx-faq_wrapper">
			<Accordion title={title} content={content} isOpen={isOpen} id={id}/>
		</div>
	);
}

export default FAQ;
