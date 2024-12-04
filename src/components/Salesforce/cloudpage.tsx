import { useRef, useEffect } from 'react';

const MarketingCloudForm = ({ formUrl }) => {
  const iframeRef = useRef(null);

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
            iframe.contentWindow.postMessage({
                type: 'request_height'
            }, '*');
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
      sandbox="allow-top-navigation allow-scripts allow-forms"
      frameBorder="0"
      scrolling="no"
    />
  );
};

export default MarketingCloudForm;