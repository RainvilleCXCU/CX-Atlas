import { parseHtml } from "lib/parser";
import { useState, useEffect, FC } from "react";
import { useRouter } from 'next/router';

interface AccordionProps {
  title: string;
  content: string;
  isOpen?: boolean;
  stayOpen?: string;
  startOpen?: string;
  id?: string;
  classNames?: string;
}

const Accordion: FC<AccordionProps> = ({ classNames = '', title = '', content = '', isOpen = false, id, stayOpen = 'false', startOpen = 'false'}) => {
	const [isAccordionOpen, setIsAccordionOpen] = useState(isOpen);
	const router = useRouter();

  const openHandler = e => {
    if(stayOpen == 'true') {
      e.preventDefault();
      return false;
    }
  } 

  useEffect(() => {
		// handle the hash change
    const handleHashChange = (url, { shallow }) => {
      const accordionElement = document.getElementById(id);
			
      if (accordionElement && window.location.hash.substring(1) === id) {
        setIsAccordionOpen(true);
      }
    }
			
    if (id && window.location.hash.substring(1) === id) {
      console.log('HASH DEFAULT')
      console.log(`${window.location.hash.substring(1)} - ${id}`)
      setIsAccordionOpen(true);
    }
 
		// listen for the hash change in the URL
    router.events.on('hashChangeComplete', handleHashChange)
 
    //unsubscribe from the event with the `off` method:
    return () => {
      router.events.off('hashChangeComplete', handleHashChange)
    }
  }, [router, id])
	
  return (
    <div className={`cx-accordion__brand ${classNames}`}>
      <details open={isAccordionOpen || stayOpen == 'true'} id={id}>
        <summary className="gb-accordion-title" onClick={openHandler}>{title}</summary>
        <div className="gb-accordion-text">{typeof(content) === 'string' ? parseHtml(content) : content}</div>
      </details>
    </div>
  );
};

export default Accordion;
