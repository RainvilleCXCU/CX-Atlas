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
  const {push, isReady} = useRouter();

  const toggleContentClick = e => {
    e.preventDefault();
    const target = linkRef?.current?.href.split('#')[1];
    console.log(`Target: ${target}`)
    setToggleContent(target);
    // setState(state => ({
    //     ...state,
    //     toggleContent: target
    // }));
    push(`#${target}`, undefined, {shallow: true});
  }

  useEffect(() => {
    if(!toggleContent) {
        if(document?.location?.hash && document?.location?.hash === '#' + linkRef?.current?.href?.split('#')[1]) {        
            const target = linkRef?.current?.href.split('#')[1];
            console.log(`Target: ${target}`)
            setToggleContent(target);
            // setState(state => ({
            //     ...state,
            //     toggleContent: target
            // }));
        } else if(document?.location?.hash == '' && attribs?.['data-content-default']) {
            const target = linkRef?.current?.href.split('#')[1];
            console.log(`Target: ${target}`)
            setToggleContent(target);
            // setState(state => ({
            //     ...state,
            //     toggleContent: target
            // }));
        }
    }
  }, [toggleContent])
  
  return (
    <>
        <a {...attributesToProps(attribs)} className={`${attribs?.class}${toggleContent !== attribs?.href.split('#')[1] ? '' : ' active'}`} onClick={toggleContentClick} ref={linkRef}>
            {children}
        </a>
    </>
      )
}

export default ToggleContentLink;
