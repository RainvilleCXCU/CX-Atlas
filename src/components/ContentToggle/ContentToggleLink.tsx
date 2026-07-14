import { Store } from "context/store";
import { toggleContentContext } from "context/toggleContext";
import { attributesToProps } from "html-react-parser";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef } from "react";

export interface Props {
  attribs?
  children?;
  classNames?;
}

function ToggleContentLink({
  attribs,
  children = <></>,
  classNames = "",
}: Props): JSX.Element {
  const { toggleContent, setToggleContent } = useContext(toggleContentContext);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const router = useRouter();

  const toggleContentClick = e => {
    e.preventDefault();
    const target = linkRef?.current?.href.split('#')[1];
    console.log(`Target: ${target}`)
    setToggleContent(target);
    window.history.replaceState(null, '', `#${target}`);
  }

  useEffect(() => {
    // Sync the active content to the URL: match the hash if present, otherwise
    // fall back to the default. Re-runs on navigation (including browser
    // back/forward) so a stale selection doesn't persist across route changes.
    const applyFromLocation = () => {
        const target = linkRef?.current?.href?.split('#')[1];
        if(!target) return;
        if(document?.location?.hash === '#' + target) {
            setToggleContent(target);
        } else if(!document?.location?.hash && attribs?.['data-content-default']) {
            setToggleContent(target);
        }
    };

    applyFromLocation();

    router.events.on('routeChangeComplete', applyFromLocation);
    router.events.on('hashChangeComplete', applyFromLocation);
    window.addEventListener('hashchange', applyFromLocation);
    window.addEventListener('popstate', applyFromLocation);
    return () => {
        router.events.off('routeChangeComplete', applyFromLocation);
        router.events.off('hashChangeComplete', applyFromLocation);
        window.removeEventListener('hashchange', applyFromLocation);
        window.removeEventListener('popstate', applyFromLocation);
    };
  }, [])
  
  return (
    <>
        <a {...attributesToProps(attribs)} className={`${attribs?.class}${toggleContent !== attribs?.href.split('#')[1] ? '' : ' active'}`} onClick={toggleContentClick} ref={linkRef}>
            {children}
        </a>
    </>
      )
}

export default ToggleContentLink;
