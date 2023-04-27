import React from "react";

interface AccordionProps {
	title: string;
	content: string;
	isOpen: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, content, isOpen }) => {
	return (
		<div className="cx-accordion__brand">
			<details open={isOpen}>
				<summary className="gb-accordion-title">{title}</summary>
				<div className="gb-accordion-text">{content}</div>
			</details>
		</div>
	);
};

export default Accordion;
