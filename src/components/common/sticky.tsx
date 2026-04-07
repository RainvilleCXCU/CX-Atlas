import { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";

export interface StickyProps {
  id?: string;
  disableDismiss?: boolean;
  position?: string;
  children?: React.ReactNode;
  topThreshold?: number;
  bottomThreshold?: number;
  animationSpeed?: number;
}

function Sticky({ id = "cx-sticky", disableDismiss = false, position = "bottom", children = <></>, topThreshold = 0.1, bottomThreshold = 0.1, animationSpeed = 300 }: StickyProps): JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const [cookies, setCookie] = useCookies(["stickyClosed"]);
  const [alertsClosed, setAlertsClosed] = useState<string[]>([]);
  const [isParentInViewport, setIsParentInViewport] = useState(false);
  const [isParentAtTop, setIsParentAtTop] = useState(false);
  const [isParentAtBottom, setIsParentAtBottom] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const entryStateRef = useRef<{ isVisible: boolean; usedTopThreshold: boolean; usedBottomThreshold: boolean }>({
    isVisible: false,
    usedTopThreshold: false,
    usedBottomThreshold: false
  });

  const showSticky = (id: string | number | undefined) => {
    return (
      loaded && id !== undefined && alertsClosed.indexOf(id?.toString()) < 0 && isParentInViewport
    );
  };
  const closeSticky = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const stickyName = (e.target as HTMLButtonElement).dataset.stickyName.valueOf();

    console.log("Closing sticky:", stickyName);

    // Handle the existing cookie value properly
    let existingClosed: string[] = [];

    if (cookies.stickyClosed) {
      if (typeof cookies.stickyClosed === "string") {
        try {
          existingClosed = JSON.parse(cookies.stickyClosed);
        } catch {
          // If it's a string but not JSON, treat it as a single value
          existingClosed = [cookies.stickyClosed];
        }
      } else if (Array.isArray(cookies.stickyClosed)) {
        existingClosed = cookies.stickyClosed;
      } else {
        // It's a number or other value, convert to array
        existingClosed = [cookies.stickyClosed.toString()];
      }
    }

    const newClosed = [...existingClosed, stickyName];

    let expires = new Date();
    expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000);

    setCookie("stickyClosed", JSON.stringify(newClosed), {
      path: "/",
    });

    setAlertsClosed(newClosed);
  };


  useEffect(() => {
    console.log("Loaded stickyClosed from cookies:", cookies.stickyClosed);
    if (cookies.stickyClosed) {
      console.log(`closed sticky type: ${typeof cookies.stickyClosed}`);
      const alertsClosedFromCookies: string[] =
        typeof cookies.stickyClosed === "number"
          ? [cookies.stickyClosed.toString()]
          : Array.isArray(cookies.stickyClosed) 
          ? cookies.stickyClosed
          : [cookies.stickyClosed];
      setAlertsClosed([...alertsClosed, ...alertsClosedFromCookies]);
    }
    setLoaded(true);
  }, [cookies.stickyClosed, setAlertsClosed]);

  useEffect(() => {
    if (!containerRef.current) return;

    const parentContainer = containerRef.current.closest('.gb-block-container');
    if (!parentContainer) return;

    // Main observer - handles both enter and exit with proper thresholds
    const mainObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const visibleArea = entry.intersectionRatio;
        
        if (entry.isIntersecting) {
          // Element is visible - check if it meets threshold requirements
          const meetsTopThreshold = visibleArea >= topThreshold;
          const meetsBottomThreshold = visibleArea >= bottomThreshold;
          
          if (!entryStateRef.current.isVisible) {
            // Not currently shown - check if we should show it
            if (meetsTopThreshold) {
              entryStateRef.current = { isVisible: true, usedTopThreshold: true, usedBottomThreshold: false };
              setIsParentAtTop(true);
              setIsParentAtBottom(false);
              setIsParentInViewport(true);
            } else if (meetsBottomThreshold) {
              entryStateRef.current = { isVisible: true, usedTopThreshold: false, usedBottomThreshold: true };
              setIsParentAtTop(false);  
              setIsParentAtBottom(true);
              setIsParentInViewport(true);
            }
          } else {
            // Currently shown - check if we should hide it based on which threshold was used
            if (entryStateRef.current.usedTopThreshold && !meetsTopThreshold) {
              entryStateRef.current = { isVisible: false, usedTopThreshold: false, usedBottomThreshold: false };
              setIsParentInViewport(false);
              setIsParentAtTop(false);
            } else if (entryStateRef.current.usedBottomThreshold && !meetsBottomThreshold) {
              entryStateRef.current = { isVisible: false, usedTopThreshold: false, usedBottomThreshold: false };
              setIsParentInViewport(false);
              setIsParentAtBottom(false);
            }
          }
        } else {
          // Element is not visible at all - hide everything
          entryStateRef.current = { isVisible: false, usedTopThreshold: false, usedBottomThreshold: false };
          setIsParentInViewport(false);
          setIsParentAtTop(false);
          setIsParentAtBottom(false);
        }
      },
      {
        threshold: [0, topThreshold, bottomThreshold].filter((val, idx, arr) => arr.indexOf(val) === idx),
        rootMargin: '0px'
      }
    );

    mainObserver.observe(parentContainer);

    return () => {
      mainObserver.unobserve(parentContainer);
      mainObserver.disconnect();
    };
  }, [topThreshold, bottomThreshold]);

  return (
    <div
        ref={containerRef}
        id={id}
        data-sticky-name={id}
        data-parent-in-viewport={isParentInViewport}
        data-parent-at-top={isParentAtTop}
        data-parent-at-bottom={isParentAtBottom}
        className={`cx-sticky db-hide cx-sticky--${position} cx-full-width cx-transition__translate cx-transition__translate--${position} slim-padding--vertical container cx-background--color-dark-green-gradient--vertical ${showSticky(id) ? "show" : "hidden"}`}
        style={{ 
          '--animation-speed': `${animationSpeed}ms`,
          transitionDuration: `${animationSpeed}ms`
        } as React.CSSProperties}
    >
        <div className={`cx-sticky__content cx-site-width cx-text--white cx-relative cx-flex__elm`}>
            {children}
            {!disableDismiss &&
                <button
                    className="cx-close"
                    onClick={closeSticky}
                    data-sticky-name={id}
                >
                    &times;
                </button>
            }
        </div>
    </div>
  );
}

export default Sticky;
