import { useRef, useEffect, useState } from 'react';

const MarketingCloudForm = ({ formUrl }) => {
  const iframeRef = useRef(null);
  const [stylesLoaded, setStylesLoaded] = useState(false);

  useEffect(() => {
      const iframe = iframeRef.current;

        // Debounce function to limit resize event frequency
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

        // Function to request iframe height
        function requestIframeHeight() {
            iframe?.contentWindow?.postMessage({
                type: 'request_height'
            }, '*');
            iframe?.contentWindow?.postMessage({
                type: 'load_stylesheet',
                url: `${process.env.NEXT_PUBLIC_FRONTEND_URL.replace('http://', 'https://')}/wp-content/themes/CXCU/assets/salesforce/${process.env.NEXT_PUBLIC_styleguideVersion}/styles.css${process.env.NEXT_PUBLIC_CACHE ? "?cache=" + process.env.NEXT_PUBLIC_CACHE : '' }`
            }, '*');
            iframe?.contentWindow ? setStylesLoaded(true) : setStylesLoaded(false);
        }

        // Debounced height request
        const debouncedRequestHeight = debounce(requestIframeHeight, 200);

        // Add resize event listener
        window.addEventListener('resize', debouncedRequestHeight);

        // Listen for height responses
        window.addEventListener('message', function(event) {
            if (event.data.type === 'iframe_height_response') {
                console.log('Iframe document height:', event.data.height);
                
                // Adjust iframe height
                iframe.style.height = `${event.data.height}px`;
            }
        }, false);

        // Initial height request when iframe loads
        iframe.addEventListener('load', requestIframeHeight);

  }, [formUrl]);

  return (
    <iframe
      ref={iframeRef}
      src={formUrl}
      width="100%"
      height={"200px"}
      referrerPolicy="origin-when-cross-origin"
      frameBorder="0"
      className={stylesLoaded ? '' : 'cx-hidden'}
      scrolling="no"
    />
  );
};

export default MarketingCloudForm;