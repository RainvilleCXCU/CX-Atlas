import { Store } from "context/store";
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
  const [ state, setState ] = useContext(Store);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const {push, isReady} = useRouter();

  const toggleContent = e => {
    e.preventDefault();
    const target = linkRef?.current?.href.split('#')[1];
    console.log(`Target: ${target}`)
    setState(state => ({
        ...state,
        toggleContent: target
    }));
    push(`#${target}`, undefined, {shallow: true});
  }

  useEffect(() => {
    if(!state?.toggleContent) {
        if(document?.location?.hash && document?.location?.hash === '#' + linkRef?.current?.href?.split('#')[1]) {        
            const target = linkRef?.current?.href.split('#')[1];
            console.log(`Target: ${target}`)
            setState(state => ({
                ...state,
                toggleContent: target
            }));
        } else if(document?.location?.hash == '' && attribs?.['data-content-default']) {
            const target = linkRef?.current?.href.split('#')[1];
            setState(state => ({
                ...state,
                toggleContent: target
            }));
        }
    }
  }, [isReady])
  
  return (
    <>
        <a {...attributesToProps(attribs)} className={`${attribs?.class}${state?.toggleContent !== attribs?.href.split('#')[1] ? '' : ' active'}`} onClick={toggleContent} ref={linkRef}>
            {children}
        </a>
    </>
      )
}

export default ToggleContentLink;
