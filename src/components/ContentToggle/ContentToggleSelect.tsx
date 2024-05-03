import { Store } from "context/store";
import { attributesToProps } from "html-react-parser";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef } from "react";

export interface Props {
  attribs?
  children?;
  classNames?;
}

function ToggleContentSelect({
  attribs,
  children = <></>,
  classNames = "",
}: Props): JSX.Element {
  const [ state, setState ] = useContext(Store);
  const selectRef = useRef<HTMLSelectElement>(null);
  const {push, isReady} = useRouter();

  const toggleContent = e => {
    e.preventDefault();
    const target = selectRef?.current?.value.split('#')[1];
    console.log(`Target: ${target}`)
    if(target !== state?.toggleContent) {
      setState(state => ({
          ...state,
          toggleContent: target
      }));
      push(`#${target}`, undefined, {shallow: true});
    }
  }
  useEffect(() => {
    selectRef.current.value = '#'+state?.toggleContent;
  }, [state?.toggleContent])

  useEffect(() => {
      if(document?.location?.hash && document?.location?.hash === '#' + selectRef?.current?.value?.split('#')[1]) {        
          const target = selectRef.current.value.split('#')[1];
          console.log(`Select Target: ${target}`)
          setState(state => ({
              ...state,
              toggleContent: target
          }));
      } else if(document?.location?.hash == '' && attribs?.['data-content-default']) {
          const target = selectRef.current.value.split('#')[1];
          setState(state => ({
              ...state,
              toggleContent: target
          }));
      }
  }, [])
  
  return (
    <>
        <select {...attributesToProps(attribs)} className={`${attribs?.class}`} onChange={toggleContent} ref={selectRef}>
            {children}
        </select>
    </>
      )
}

export default ToggleContentSelect;
