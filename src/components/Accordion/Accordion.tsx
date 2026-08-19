import { parseHtml } from "lib/parser";
import { useState, useEffect, useRef, FC } from "react";
import { useRouter } from 'next/router';

interface AccordionProps {
  title: string;
  preHeading?: string;
  content: string;
  isOpen?: boolean;
  stayOpen?: string;
  startOpen?: string;
  id?: string;
  classNames?: string;
  borderStyle?: React.CSSProperties;
  borderStyleOpen?: React.CSSProperties;
  borderColorOpen?: string;
  useTitleBackground?: boolean;
  detailsBackground?: string;
  contentBackground?: string;
  accordionIconSrc?: string;
  accordionIconOpenSrc?: string;
  showDetailsText?: string;
  hideDetailsText?: string;
}

const Accordion: FC<AccordionProps> = ({ classNames = '', title = '', preHeading = '', content = '', isOpen = false, id, stayOpen = 'false', startOpen = 'false', borderStyle = {}, borderStyleOpen = {}, borderColorOpen = '', useTitleBackground = false, detailsBackground = '', contentBackground = '', accordionIconSrc = '', accordionIconOpenSrc = '', showDetailsText = '', hideDetailsText = '' }) => {
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
        // router.replace(pathWithoutHash, undefined, { shallow: true, scroll: false });
        window.history.replaceState(null, '', pathWithoutHash);
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
    <div className={`cx-accordion__brand ${classNames}${isAccordionOpen ? ' is-open' : ''}`} style={isAccordionOpen ? borderStyleOpen : borderStyle}>
      <div className={`accordion-header${useTitleBackground ? ' use-title-background' : ''}`} onClick={openHandler} id={id} style={isAccordionOpen && borderColorOpen ? { backgroundColor: borderColorOpen } : undefined}>
        <summary className={`gb-accordion-title${isAccordionOpen ? ' is-open' : ''}`}>
          {accordionIconSrc && (
            <img src={isAccordionOpen ? (accordionIconOpenSrc || accordionIconSrc) : accordionIconSrc} className="gb-accordion-icon" />
          )}
          <span className="heading-group">
            {preHeading && (
              <span className="pre-heading">{preHeading}</span>
            )}
            <span className={`heading${preHeading ? ' bold-text' : ''}`}>{title}</span>
          </span>
          {showDetailsText && (
            <span
              className={`show-details${detailsBackground && !isAccordionOpen ? ' has-background-color' : ''}`}
              style={detailsBackground && !isAccordionOpen ? { backgroundColor: detailsBackground } : undefined}
            >{isAccordionOpen ? hideDetailsText : showDetailsText}</span>
          )}
        </summary>
      </div>
      <div
        className="accordion-content"
        ref={contentRef}
        style={{
          display: 'grid',
          gridTemplateRows: `${contentHeight}fr`,
          overflow: 'hidden',
          transition: 'grid-template-rows 0.3s ease',
          background: contentBackground,
        }}
      >
        <div className="gb-accordion-content-wrapper" style={{overflow: "hidden"}}>
          <div className="gb-accordion-text">
            {typeof(content) === 'string' ? parseHtml(content) : content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
