import { gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export interface AlertProps {
    id;
    alerts?;
}

function Alert({ id = 'alertdefault', alerts }: AlertProps): JSX.Element {

    const [alertsClosed, setAlertsClosed] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['alertClosed']);

    const showAlert = id => {
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

Alert.fragments = {
	entry: gql`
	  fragment AlertsFragment on CXAlert {
        displayPages
        databaseId
        ctaButtonText
        ctaButtonUrl
        name
        message
	  }
	`,
  };