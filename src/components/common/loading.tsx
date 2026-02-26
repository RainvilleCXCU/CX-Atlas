import { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Store } from "context/store";

function Loading({ type = 'lines' }): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useContext(Store);
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  
  const loadingTimeout: string = process.env.NEXT_PUBLIC_loadingTimeout || '1000';

  useEffect(() => {
    // Force clear on mount (handles HMR and cached pages)
    setIsLoading(false);
    document.body.classList.remove('is-navigating');
    
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = null;
    }

    const handleRouteChangeStart = (url: string) => {
      if (url !== router.asPath) {
        document.body.classList.add('is-navigating');
        
        if (loadingTimerRef.current) {
          clearTimeout(loadingTimerRef.current);
        }
        
        loadingTimerRef.current = setTimeout(() => {
          setIsLoading(true);
        }, parseInt(loadingTimeout));
      }
    };

    const handleRouteChangeComplete = () => {
      document.body.classList.remove('is-navigating');
      
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
        loadingTimerRef.current = null;
      }
      setIsLoading(false);
    };

    const handleRouteChangeError = () => {
      document.body.classList.remove('is-navigating');
      
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
        loadingTimerRef.current = null;
      }
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      // Critical: clean up everything on unmount
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
      
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
        loadingTimerRef.current = null;
      }
      
      // Clean up DOM state too
      document.body.classList.remove('is-navigating');
      setIsLoading(false);
    };
  }, [router, loadingTimeout]); // Include router in deps

  useEffect(() => {
    setState({
      ...state,
      page: {
        isLoading: isLoading
      }
    });
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="loader-wrapper">
      {type === 'spinner' && (
        <>
          <div className="loader__bg"></div>
          <div className="loader"></div>
        </>
      )}
      {type === 'lines' && (
        <div className="lines">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
          <div className="bar4"></div>
          <div className="bar5"></div>
          <div className="bar6"></div>
          <div className="bar7"></div>
          <div className="bar8"></div>
        </div>
      )}
    </div>
  );
}

export default Loading;