import { parseHtml } from "lib/parser";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

interface AccordionProps {
  title: string;
  content: string;
  isOpen?: boolean;
  id?: string;
}

const Accordion: React.FC<AccordionProps> = ({ title = '', content = '', isOpen = false, id }) => {
	const [isAccordionOpen, setIsAccordionOpen] = useState(isOpen);
	const router = useRouter();

  useEffect(() => {
		// handle the hash change
    const handleHashChange = (url, { shallow }) => {
      const accordionElement = document.getElementById(id);
			
      if (accordionElement && window.location.hash.substring(1) === id) {
        setIsAccordionOpen(true);
      }
    }
 
		// listen for the hash change in the URL
    router.events.on('hashChangeComplete', handleHashChange)
 
    //unsubscribe from the event with the `off` method:
    return () => {
      router.events.off('hashChangeComplete', handleHashChange)
    }
  }, [router])
	
  return (
    <div className="cx-accordion__brand">
      <details open={isAccordionOpen} id={id}>
        <summary className="gb-accordion-title">{title}</summary>
        <div className="gb-accordion-text">{typeof(content) === 'string' ? parseHtml(content) : content}</div>
      </details>
    </div>
  );
};

export default Accordion;
