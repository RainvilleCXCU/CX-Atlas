import { useRef, useEffect, useState } from 'react';

const MarketingCloudForm = ({ formUrl }) => {
  const iframeRef = useRef(null);
  const [stylesLoaded, setStylesLoaded] = useState(false);
  
  useEffect(() => {
    // Add resize event listener
    const iframe = iframeRef.current;
    let iframeInterval = setInterval(function() {
        console.log(stylesLoaded);
        if(!stylesLoaded) {
            requestIframeHeight();
        } else {
            clearInterval(iframeInterval);}
    }, 100); 
    

    function requestIframeHeight() {
        iframe?.contentWindow?.postMessage({
            type: 'load_stylesheet',
            url: `https://cloud.typography.com/6914618/${process.env.NEXT_PUBLIC_CLOUD_FONT || '7711232'}/css/fonts.css`
        }, '*');
        iframe?.contentWindow?.postMessage({
            type: 'load_stylesheet',
            url: `${process.env.NEXT_PUBLIC_FRONTEND_URL.replace('http://', 'https://')}/wp-content/themes/CXCU/assets/salesforce/${process.env.NEXT_PUBLIC_styleguideVersion}/styles.css${process.env.NEXT_PUBLIC_CACHE ? "?cache=" + process.env.NEXT_PUBLIC_CACHE : '' }`
        }, '*');
            iframe?.contentWindow?.postMessage({
            type: 'request_height'
        }, '*');
    }
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }


    // Debounced height request
    const debouncedRequestHeight = debounce(requestIframeHeight, 200);

    window?.addEventListener('resize', debouncedRequestHeight);

    // Listen for height responses
    window?.addEventListener('message', function(event) {
        if (event.data.type === 'iframe_height_response') {
            console.log('Iframe document height:', event.data.height);
            
            // Adjust iframe height
            iframeRef.current.style.height = `${event.data.height}px`;
        }
        if(event.data.type === 'load_stylesheet_response') {
            setStylesLoaded(true);
        }
    }, false);

    return () => clearInterval(iframeInterval);

  }, [stylesLoaded]);

  return (
    <iframe
      ref={iframeRef}
      src={formUrl}
      width="100%"
      height={"560px"}
      referrerPolicy="origin-when-cross-origin"
      frameBorder="0"
      className={stylesLoaded ? '' : 'cx-visibility-hidden'}
      scrolling="no"
    />
  );
};

export default MarketingCloudForm;