import { Store } from "context/store";
import { useContext, useEffect, useState, Fragment } from "react";
import { useCookies } from "react-cookie";

export interface AlertProps {
    id?;
    alerts?;
}

function Alert({ id = 'alertdefault', alerts }: AlertProps): JSX.Element {

    const [alertsClosed, setAlertsClosed] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [cookies, setCookie ] = useCookies(['alertClosed']);
    const [state] = useContext(Store);

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
    }, [cookies.alertClosed, setAlertsClosed])

    return (
        <>
            {(!state?.search?.isOpen && alerts && alerts.length > 0) && alerts.map((post, index) => (
                <Fragment key={`${post?.name}-${index}`}>
                    <div id="alert-banner" className={`cx-alert${showAlert(post.databaseId) ? ' show': ' hidden'}`}>
                        <button className="cx-alert__close" onClick={closeAlert} data-alert-name={post.databaseId}>&times;</button>
                        <p className="cx-alert__message">{post.message}
                            {post.ctaButtonText &&
                                <a href={post.ctaButtonUrl} className="cx-alert__cta">{post.ctaButtonText}</a>
                            }
                        </p>
                    </div>
                </ Fragment>
            ))}
        </>
    );
}

export default Alert;