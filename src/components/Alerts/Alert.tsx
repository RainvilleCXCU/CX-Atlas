import { Store } from "context/store";
import { parseHtml } from "lib/parser";
import { useContext, useEffect, useState, Fragment } from "react";
import { useCookies } from "react-cookie";

export interface AlertProps {
  id?;
  alerts?;
}

function Alert({ id = "alertdefault", alerts }: AlertProps): JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const [cookies, setCookie] = useCookies(["alertClosed"]);
  const [state] = useContext(Store);
  const [alertsClosed, setAlertsClosed] = useState([]);

  const showAlert = (id) => {
    return (
      loaded && id !== undefined && alertsClosed.indexOf(id?.toString()) < 0
    );
  };
  const closeAlert = (e) => {
    e.preventDefault();
    const alertName = e.target.dataset.alertName;

    console.log("Closing alert:", alertName);

    // Handle the existing cookie value properly
    let existingClosed = [];

    if (cookies.alertClosed) {
      if (typeof cookies.alertClosed === "string") {
        try {
          existingClosed = JSON.parse(cookies.alertClosed);
        } catch {
          // If it's a string but not JSON, treat it as a single value
          existingClosed = [cookies.alertClosed];
        }
      } else if (Array.isArray(cookies.alertClosed)) {
        existingClosed = cookies.alertClosed;
      } else {
        // It's a number or other value, convert to array
        existingClosed = [cookies.alertClosed.toString()];
      }
    }

    const newClosed = [...existingClosed, alertName];

    let expires = new Date();
    expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000);

    setCookie("alertClosed", JSON.stringify(newClosed), {
      expires,
      path: "/",
    });

    setAlertsClosed(newClosed);
  };

  useEffect(() => {
    console.log("Loaded alertClosed from cookies:", cookies.alertClosed);
    if (cookies.alertClosed) {
      console.log(`closed alert type: ${typeof cookies.alertClosed}`);
      const alertsClosedFromCookies =
        typeof cookies.alertClosed === "number"
          ? [cookies.alertClosed]
          : cookies.alertClosed;
      setAlertsClosed([...alertsClosed, ...alertsClosedFromCookies]);
    }
    setLoaded(true);
  }, [cookies.alertClosed, setAlertsClosed]);

  return (
    <>
      {!state?.search?.isOpen &&
        alerts &&
        alerts.length > 0 &&
        alerts.map((post, index) => (
          <Fragment key={`${post?.name}-${index}`}>
            <div
              id="alert-banner"
              className={`cx-alert${
                post.type ? ` cx-alert__type--${post.type}` : ""
              }${showAlert(post.databaseId) ? " show" : " hidden"}`}
            >
              <button
                className="cx-alert__close"
                onClick={closeAlert}
                data-alert-name={post.databaseId}
              >
                &times;
              </button>
              <p className="cx-alert__message title">
                <div className="cx-alert__message-content">
                  <div>{parseHtml(post.message ?? "")}</div>
                  {post.ctaButtonText && (
                    <a href={post.ctaButtonUrl} className="cx-alert__cta">
                      {post.ctaButtonText}
                    </a>
                  )}
                </div>
              </p>
            </div>
          </Fragment>
        ))}
    </>
  );
}

export default Alert;
