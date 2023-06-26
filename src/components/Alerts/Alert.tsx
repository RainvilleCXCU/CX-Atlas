import React, { useEffect, useState } from "react";
import { client, Page as PageType } from 'client';
import { useCookies } from "react-cookie";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { gql, useQuery } from "@apollo/client";
import apolloClient from "apolloClient";
import { getNextServerSideProps } from "@faustjs/next";
import { pageview } from "lib/gtm";
import { useRouter } from "next/router";

export interface AlertProps {
    id
}

function Alert({ id }: AlertProps): JSX.Element {

    const { useQuery } = client;
    const alerts = useQuery().cXAlerts().edges.map(a => a.node);

    const [alertsClosed, setAlertsClosed] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['alertClosed']);

    const showAlert = id => {
        console.log('Show Alert');
        console.log(alertsClosed);
        console.log(`Loaded: ${JSON.stringify(loaded)}`);
        console.log(id?.toString());
        console.log(loaded && id !== undefined && alertsClosed.indexOf(id?.toString()) < 0);
        return loaded && id !== undefined && alertsClosed.indexOf(id?.toString()) < 0;
    }

    const closeAlert = (e) => {
        e.preventDefault();
        let expires = new Date();
        expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000));
        setCookie('alertClosed', e.target.dataset.alertName, {
            expires
        });
    }

    useEffect(() => {
        if(cookies.alertClosed) {
            setAlertsClosed([
                ...alertsClosed,
                cookies.alertClosed
            ]);
        }
        console.log('Cookies');
        console.log(cookies.alertClosed);
        setLoaded(true);
    }, [cookies.alertClosed])

    return (
        <>
            {(alerts && alerts.length > 0) && alerts.map((post, index) => (
                <React.Fragment key={`${post?.name}-${index}`}>
                    {post && post.displayPages.includes(id?.toString()) &&
                        <div id="alert-banner" className={`cx-alert${showAlert(post.databaseId) ? ' show': ' hidden'}`}>
                            <button className="cx-alert__close" onClick={closeAlert} data-alert-name={post.databaseId}>&times;</button>
                            <p className="cx-alert__message">{post.message}
                                {post.ctaButtonText &&
                                    <a href={post.ctaButtonUrl} className="cx-alert__cta">{post.ctaButtonText}</a>
                                }
                            </p>
                        </div>
                    }
                </ React.Fragment>
            ))}
        </>
    );
}

export default Alert;
