// This component renders a list of branch locations
import React, { useContext, useEffect } from "react";
import { client } from "client";
import { Store } from "context/store";
import { useRouter } from "next/router";

function Loading(): JSX.Element {
    const [state, setState] = useContext(Store);
    const router = useRouter()
    useEffect(() => {
        router.events.on('routeChangeComplete', () => {
          setState({
            ...state,
            isLoading: false
          })
        })
        router.events.on('routeChangeStart', () => {
          setState({
            ...state,
            isLoading: true
          })
        })
        return () => {
          router.events.off('routeChangeStart', () => {
            setState({
              ...state,
              isLoading: true
            })
          })
          router.events.off('routeChangeComplete', () => {
            setState({
              ...state,
              isLoading: false
            })
          })
        }
      }, [router.events])

	return (
        <>
		{
            state?.isLoading && 
                <div className="loader-wrapper">
                    <div className="loader"></div>
                </div>
        }
        </>
	);
}

export default Loading;