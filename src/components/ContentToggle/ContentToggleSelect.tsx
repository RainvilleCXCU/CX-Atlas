import { toggleContentContext } from "context/toggleContext";
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
  const { toggleContent, setToggleContent } = useContext(toggleContentContext);
  const selectRef = useRef<HTMLSelectElement>(null);
  const { push } = useRouter();

  const toggleSelectContent = e => {
    e.preventDefault();
    const target = selectRef.current.value.split('#')[1];
    console.log(`Target: ${target}`)
    setToggleContent(target);
    push(`#${target}`, undefined, {shallow: true});
  }
  useEffect(() => {
    selectRef.current.value = '#'+toggleContent;
  }, [toggleContent]);
  
  return (
    <>
        <select {...attributesToProps(attribs)} className={`${attribs?.class}`} onChange={toggleSelectContent} ref={selectRef}>
            {children}
        </select>
    </>
      )
}

export default ToggleContentSelect;
