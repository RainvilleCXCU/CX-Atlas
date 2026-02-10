import { Store } from "context/store";
import { parseHtml } from "lib/parser";
import { useContext, useEffect, useState, Fragment } from "react";
import { useCookies } from "react-cookie";
import { Alert as AlertType } from "utils/alerts";

export interface AlertProps {
  id?: string;
  alerts?: AlertType[];
}

function Alert({ id = "alertdefault", alerts }: AlertProps): JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const [cookies, setCookie] = useCookies(["alertClosed"]);
  const [state] = useContext(Store);
  const [alertsClosed, setAlertsClosed] = useState<string[]>([]);

  const showAlert = (id: string | number | undefined) => {
    return (
      loaded && id !== undefined && alertsClosed.indexOf(id?.toString()) < 0
    );
  };
  const closeAlert = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const alertName = (e.target as HTMLButtonElement).dataset.alertName;

    console.log("Closing alert:", alertName);

    // Handle the existing cookie value properly
    let existingClosed: string[] = [];

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

  const ctaColor = {
    warning: "-warning",
    event: "-warning",
    notice: "",
  }

  useEffect(() => {
    console.log("Loaded alertClosed from cookies:", cookies.alertClosed);
    if (cookies.alertClosed) {
      console.log(`closed alert type: ${typeof cookies.alertClosed}`);
      const alertsClosedFromCookies: string[] =
        typeof cookies.alertClosed === "number"
          ? [cookies.alertClosed.toString()]
          : Array.isArray(cookies.alertClosed) 
          ? cookies.alertClosed
          : [cookies.alertClosed];
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
              className={`cx-alert cx-text--x-small${
                post.type ? ` cx-alert__type--${post.type}` : ""
              }${post.darkMode ? ` cx-alert__type--${post.type}-darkmode` : ""
              }${showAlert(post.databaseId) ? " show" : " hidden"}`}
            >
              {!post.disableDismiss &&
                <button
                  className="cx-alert__close"
                  onClick={closeAlert}
                  data-alert-name={post.databaseId}
                >
                  &times;
                </button>
              }
              <div className={`cx-alert__message cx-text--x-small title${post.noIcon ? ' no-icon' : ''}`}>
                <span className="cx-alert__message-content">
                  <span className="cx-flex__elm">
                    <span className="cx-alert__message-text">
                      {post.heading && <div className="cx-alert__message-heading no-margin--top cx-text--weight-bold">{post.heading}</div>}
                      <p className="no-margin">{parseHtml(post.message ?? "")}</p>
                    </span>
                  </span>
                  { post.ctas && post.ctas.length > 0 &&
                    <p className="cx-alert__ctas no-margin--vertical-bottom">
                     {
                     post.ctas.map((cta, ctaIndex) => (
                        <a href={cta.ctaButtonUrl} className={`cx-button cx-button--compact slim-margin--horizontal-right no-margin--vertical-top cx-button--${cta?.ctaButtonType == 'filled' || cta?.ctaButtonType == null ? 'color' : cta?.ctaButtonType}${ctaColor[post.type]}`} key={`alert-cta-${ctaIndex}`}>
                          {cta.ctaButtonText}
                        </a>
                      ))}
                    </p>
                  }
                </span>
              </div>
            </div>
          </Fragment>
        ))}
    </>
  );
}

export default Alert;
