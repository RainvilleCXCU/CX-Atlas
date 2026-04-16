import { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export interface StickyProps {
  id?: string;
  disableDismiss?: boolean;
  position?: string;
  children?: React.ReactNode;
  scrollDownEnterThreshold?: number;  // Percentage of viewport height (0-100) when scrolling down shows sticky
  scrollDownExitThreshold?: number;   // Distance in pixels from viewport bottom when scrolling down hides sticky
  scrollUpEnterThreshold?: number;    // Distance in pixels from viewport bottom when scrolling up shows sticky
  scrollUpExitThreshold?: number;     // Percentage of viewport height (0-100) when scrolling up hides sticky
  animationSpeed?: number;
  stayVisible?: boolean;
  expandBottomSiblings?: number;
  hideAboveOffset?: number;
}

function Sticky({ 
  id = "cx-sticky", 
  disableDismiss = false, 
  position = "bottom", 
  children = <></>, 
  scrollDownEnterThreshold = 50, 
  scrollDownExitThreshold = 90, 
  scrollUpEnterThreshold = 90, 
  scrollUpExitThreshold = 50,
  animationSpeed = 300, 
  stayVisible = false, 
  expandBottomSiblings = 0, 
  hideAboveOffset = 90 
}: StickyProps): JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const [cookies, setCookie] = useCookies(["stickyClosed"]);
  const [alertsClosed, setAlertsClosed] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const hasScrolled = useRef<boolean>(false);
  const scrollDirection = useRef<'down' | 'up' | null>(null);
  const lastScrollY = useRef<number>(0);
  const stateChangeTimeout = useRef<number | null>(null);

  const showSticky = (id: string | number | undefined) => {
    return (
      loaded && id !== undefined && alertsClosed.indexOf(id?.toString()) < 0 && isVisible
    );
  };

  const closeSticky = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const stickyName = (e.target as HTMLButtonElement).dataset.stickyName?.valueOf();

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

  // Use framer-motion's scroll tracking with debounced state changes
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!containerRef.current) return;
    
    const parentContainer = containerRef.current.closest('.gb-block-container') as HTMLElement;
    if (!parentContainer) return;
    
    // Track scroll direction with more stable detection
    const scrollDelta = latest - lastScrollY.current;
    lastScrollY.current = latest;
    
    // Set direction with hysteresis - only change if moving significantly
    if (Math.abs(scrollDelta) > 5) {
      const newDirection = scrollDelta > 0 ? 'down' : 'up';
      scrollDirection.current = newDirection;
    }
    
    // Track if user has scrolled
    if (!hasScrolled.current && Math.abs(scrollDelta) > 3) {
      hasScrolled.current = true;
    }
    
    // Get positions
    const viewportHeight = window.innerHeight;
    const parentRect = parentContainer.getBoundingClientRect();
    const parentTopRelativeToViewport = parentRect.top;
    const parentBottomRelativeToViewport = parentRect.bottom;
    
    // Calculate threshold positions with hysteresis buffers
    const scrollDownEnterThreshold_px = viewportHeight * (scrollDownEnterThreshold / 100);
    const scrollDownExitThreshold_px = viewportHeight * (scrollDownExitThreshold / 100);
    const scrollUpEnterThreshold_px = viewportHeight * (scrollUpEnterThreshold / 100);
    const containerBottomDistanceFromViewportBottom = viewportHeight - parentBottomRelativeToViewport;
    
    const isScrollingDown = scrollDirection.current === 'down';
    const containerVisible = parentBottomRelativeToViewport > -50 && parentTopRelativeToViewport < (viewportHeight + 50);
    
    console.log(`ScrollY: ${latest}, Direction: ${scrollDirection.current}, Container visible: ${containerVisible}, ParentTop: ${parentTopRelativeToViewport}, ParentBottom: ${parentBottomRelativeToViewport}`);
    
    // Add hysteresis - different thresholds for showing vs hiding
    const HYSTERESIS_BUFFER = 20; // pixels
    
    // Clear any pending state change
    if (stateChangeTimeout.current) {
      clearTimeout(stateChangeTimeout.current);
      stateChangeTimeout.current = null;
    }
    
    let shouldShow = false;
    let shouldHide = false;
    
    if (isScrollingDown) {
      // Scrolling down: Show when top reaches 50%, Hide when bottom is 90px above viewport bottom OR container completely above viewport
      console.log(`Scroll down - Enter threshold: ${scrollDownEnterThreshold_px}, Exit threshold: ${scrollDownExitThreshold}, Container bottom distance: ${containerBottomDistanceFromViewportBottom}, Container visible: ${containerVisible}`);
      shouldShow = !isVisible && hasScrolled.current && 
        parentTopRelativeToViewport <= (scrollDownEnterThreshold_px + HYSTERESIS_BUFFER) && 
        containerVisible && parentTopRelativeToViewport > -50; // Don't show if container is way above viewport
      
      shouldHide = isVisible && !stayVisible && 
        (containerBottomDistanceFromViewportBottom >= (scrollDownExitThreshold_px - HYSTERESIS_BUFFER) || 
         parentBottomRelativeToViewport < -20 || parentTopRelativeToViewport >= viewportHeight);
    } else {
      // Scrolling up: Show when bottom is 90px from viewport bottom AND container is below 50%, Hide when top reaches 50%
      const containerBelow50Percent = parentTopRelativeToViewport > scrollDownEnterThreshold_px;
      console.log(`Scroll up enter ${scrollUpEnterThreshold} - Bottom ${containerBottomDistanceFromViewportBottom} - Container Visible: ${containerVisible} - Below 50%: ${containerBelow50Percent} - isVisible: ${isVisible}`);
      console.log(`Parent top: ${parentTopRelativeToViewport}, Scroll up enter threshold: ${scrollDownEnterThreshold_px}`);
      shouldShow = hasScrolled.current && 
        (containerBottomDistanceFromViewportBottom <= (scrollUpEnterThreshold_px + HYSTERESIS_BUFFER) && containerVisible) && parentTopRelativeToViewport <= (scrollDownEnterThreshold_px + HYSTERESIS_BUFFER) ;
      console.log(`Should show: ${shouldShow}`);
      shouldHide = (parentTopRelativeToViewport >= (scrollDownEnterThreshold_px + HYSTERESIS_BUFFER) || parentTopRelativeToViewport >= viewportHeight);
    }
    
    console.log(`Should show: ${shouldShow}, Should hide: ${shouldHide}`);
    // Debounce state changes to prevent rapid toggling
    if (shouldShow || shouldHide) {
      stateChangeTimeout.current = window.setTimeout(() => {
        if (shouldShow) {
          console.log(`SHOWING STICKY (scroll ${isScrollingDown ? 'down' : 'up'})`);
          setIsVisible(true);
        } else if (shouldHide) {
          console.log(`HIDING STICKY (scroll ${isScrollingDown ? 'down' : 'up'})`);
          setIsVisible(false);
        }
        stateChangeTimeout.current = null;
      }, 1); // 50ms debounce
    }
  });

  return (
    <motion.div
        ref={containerRef}
        id={id}
        data-sticky-name={id}
        data-scroll-down-enter={scrollDownEnterThreshold}
        data-scroll-down-exit={scrollDownExitThreshold}
        data-scroll-up-enter={scrollUpEnterThreshold}
        data-scroll-up-exit={scrollUpExitThreshold}
        data-hide-above-offset={hideAboveOffset}
        data-expand-bottom-siblings={expandBottomSiblings}
        data-stay-visible={stayVisible}
        className={`cx-sticky db-hide cx-sticky--${position} cx-full-width cx-transition__translate cx-transition__translate--${position} slim-padding--vertical container cx-background--color-dark-green-gradient--vertical ${showSticky(id) ? "show" : "hidden"}`}
        style={{ 
          '--animation-speed': `${animationSpeed}ms`,
          transitionDuration: `${animationSpeed}ms`
        } as React.CSSProperties}
        initial={{ y: position === "bottom" ? "100%" : "-100%" }}
        animate={{ 
          y: showSticky(id) ? "0%" : (position === "bottom" ? "100%" : "-100%")
        }}
        transition={{ 
          duration: animationSpeed / 1000,
          ease: "easeInOut"
        }}
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
    </motion.div>
  );
}

export default Sticky;