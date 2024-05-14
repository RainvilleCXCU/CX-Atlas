import { Store } from "context/store";
import { attributesToProps } from "html-react-parser";
import { useContext } from "react";
import { toggleContentContext } from "context/toggleContext";

export interface Props {
//   title?;
//   copy?;
//   continueLink?;
//   continueText?;
//   cancelText?;
  attribs?
  children?;
  classNames?;
}

function ToggleContent({
//   title = 'Title',
//   copy = 'Copy',
//   continueLink,
//   continueText = "Continue",
//   cancelText = "Cancel",
  attribs,
  children = <></>,
  classNames = "",
}: Props): JSX.Element {
  const {toggleContent, setToggleContent} = useContext(toggleContentContext);
  const target = attribs?.['data-toggle-content'];
  return (
      <>
        {toggleContent === target &&
            <div {...attributesToProps(attribs)}>
                {children}
            </div>
        }
        </>
      )
}

export default ToggleContent;
