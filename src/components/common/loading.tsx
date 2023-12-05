import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Loading(): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    useEffect(() => {
        router.events.on('routeChangeStart', () => {
            setIsLoading(true);
        })
        router.events.on('routeChangeComplete', () => {
            setIsLoading(false);
        })
        router.events.on('routeChangeError', () => {
            setIsLoading(false);
        })
        return () => {
          router.events.off('routeChangeStart', () => {
            setIsLoading(true);
          })
          router.events.off('routeChangeComplete', () => {
            setIsLoading(false);
          })
          router.events.off('routeChangeError', () => {
            setIsLoading(false);
          })
        }
      }, [router.events])

	return (
        <>
		{
            isLoading && 
                <div className="loader-wrapper">
                    <div className="loader"></div>
                </div>
        }
        </>
	);
}

export default Loading;