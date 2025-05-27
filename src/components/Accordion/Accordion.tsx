import { parseHtml } from "lib/parser";
import { useState, useEffect, useRef, FC } from "react";
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
    const [isAccordionOpen, setIsAccordionOpen] = useState(startOpen === 'true');
    const [contentHeight, setContentHeight] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

  const openHandler = e => {
    if(stayOpen == 'true') {
      e.preventDefault();
      return false;
    } else {
      if (e.target.tagName.toLowerCase() === 'a') { // Prevent open/close if accordion title has a link (ex: <sup>)
        return;
      }
      e.preventDefault();
      setIsAccordionOpen(!isAccordionOpen);
      
      if (window.location.hash) {
        // Get current path without the hash
        const pathWithoutHash = window.location.pathname + window.location.search;
        
        // Replace current URL without the hash
        router.replace(pathWithoutHash, undefined, { shallow: true });
      }
      return false;
    }
  };

  // Animate the open/close of the accordion
  useEffect(() => {
    if (contentRef.current) {
      if (stayOpen == 'true') {
        setIsAccordionOpen(true);
      }
      setContentHeight(isAccordionOpen ? 1 : 0);
    }
  }, [isAccordionOpen]);

  useEffect(() => {
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
    const handleHashChange = () => {
      const accordionElement = document.getElementById(id);
			
      if (accordionElement && window.location.hash.substring(1) === id && !isAccordionOpen) {
        setIsAccordionOpen(true);
      } else {
        // setIsAccordionOpen(false);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('click', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('click', handleHashChange);
    };
  }, []);

  return (
    <div className={`cx-accordion__brand ${classNames}${isAccordionOpen ? ' is-open' : ''}`}>
      <div className="accordion-header" onClick={openHandler} id={id}>
        <summary className={`gb-accordion-title${isAccordionOpen ? ' is-open' : ''}`}>{title}</summary>
      </div>
      <div
        className="accordion-content"
        ref={contentRef}
        style={{
          display: 'grid',
          gridTemplateRows: `${contentHeight}fr`,
          overflow: 'hidden',
          transition: 'grid-template-rows 0.3s ease',
        }}
      >
        <div className="gb-accordion-text">
          {typeof(content) === 'string' ? parseHtml(content) : content}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
