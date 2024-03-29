import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Store } from "context/store";

function Loading({ type = 'lines' }): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
	const [state, setState] = useContext(Store);
  const [loadingTimer, setLoadingTimer]  = useState(null)
  const router = useRouter();
  
  const loadingTimeout: string = process.env.NEXT_PUBLIC_loadingTimeout ? (process.env.NEXT_PUBLIC_loadingTimeout as string) : '1000';
  useEffect(() => {
    router.events.on('routeChangeStart', (e) => {
      if(e !== router.asPath) {
        setLoadingTimer(setTimeout(() => {
          setIsLoading(true)
        }, parseInt(loadingTimeout)));
      }
    })
    router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
      clearTimeout(loadingTimer);
    })
    router.events.on('routeChangeError', () => {
      setIsLoading(false);
      clearTimeout(loadingTimer);
    })
    return () => {
      router.events.off('routeChangeStart', e => {
        if(e !== router.asPath) {
          setLoadingTimer(setTimeout(() => {
            setIsLoading(true)
          }, parseInt(loadingTimeout)));
        }
      })
      router.events.off('routeChangeComplete', () => {
        setIsLoading(false);
        clearTimeout(loadingTimer);
      })
      router.events.off('routeChangeError', () => {
        setIsLoading(false);
        clearTimeout(loadingTimer);
      })
    }
  }, [router.events])

  useEffect(() => {
    setState({
      ...state,
      page: {
        isLoading: isLoading
      }
    })
  }, [isLoading])

  return (
    <>
      {
        isLoading &&
        <div className="loader-wrapper">
          {type === 'spinner' &&
            <>
              <div className="loader__bg"></div>
              <div className="loader"></div>
            </>
          }
          {type === 'lines' &&
            <>
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
            </>
          }
        </div>

      }
    </>
  );
}

export default Loading;