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
    } else {
      e.preventDefault();
      setIsAccordionOpen(!isAccordionOpen);
      window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
      return false;
    }
  } 

  useEffect(() => {

    // Router detect hash match
    if (router.asPath.includes('#')) {
      const elementid = router.asPath.split('#')[1];
      const element = document.getElementById(elementid);
      if (element) {
        element.scrollIntoView();
      }

      if(id === elementid && !isAccordionOpen) {
        setIsAccordionOpen(true);
      } else {
        // setIsAccordionOpen(false);
      }
    }
  }, [router.asPath]);

  useEffect(() => {
    
    // Handle same page hash change
    const handleHashChange = (e) => {
      const accordionElement = document.getElementById(id);
			
      if (accordionElement && window.location.hash.substring(1) === id && !isAccordionOpen) {
        setIsAccordionOpen(true);
      } else {
        // setIsAccordionOpen(false);
      }
    }
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('click', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('click', handleHashChange);
    };

  }, [])
	
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
