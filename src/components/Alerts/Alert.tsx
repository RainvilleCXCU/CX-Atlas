import React, { useEffect, useState } from "react";
import { client, Page as PageType } from 'client';
import { useCookies } from "react-cookie";

export interface AlertProps {
    page: PageType | PageType['preview']['node'] | null | undefined;
}

function Alert({ page }: AlertProps): JSX.Element {
    const { useQuery } = client;
    const alerts = useQuery().pageAlerts({ postId: page.databaseId });

    const [alertsOpen, setAlertsOpen] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['alertClosed'])
    
	useEffect(() => {
        console.log(alertsOpen);
        if(alerts.length > 0) {
            setAlertsOpen([
                ...alerts.map(a => {
                    if(cookies.alertClosed && !cookies.alertClosed.includes(a.id)){
                        return a;
                    }
                })
            ])
        }
	}, [alerts]);

	const closeAlert = (e) => {
		e.preventDefault();
        let expires = new Date();
        expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000));

        setAlertsOpen([
            ...alertsOpen.map(alert => alert !== e.target.dataset.alertName)
        ])
        setCookie('alertClosed', alertsOpen.map(a => a.id), {
            expires
        })
	} 

    return (
        <>
            {/* {alertsOpen && alertsOpen.length > 0 && alertsOpen.map((post, index) => (
                <div id="alert-banner" key={`${post.name}-${index}`} className={`cx-alert${!alertsOpen.map(a => a.id).includes(post.id) ? ' hidden' : ''}`}>
                    <button className="cx-alert__close" onClick={closeAlert} data-alert-name={post.id}>&times;</button>
                    <p className="cx-alert__message">{post.message}
                        {post.cta_button_text &&
                        <a href={post.cta_button_url} className="cx-alert__cta">{post.cta_button_text}</a>
                        }
                    </p>
                </div>
            ))} */}
        </>
    );
}

export default Alert;
