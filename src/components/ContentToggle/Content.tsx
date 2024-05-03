import { Store } from "context/store";
import { attributesToProps } from "html-react-parser";
import { useContext } from "react";

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
  const [ state, setState ] = useContext(Store);
  const target = attribs?.['data-toggle-content'];
  return (
    <>
        {state?.toggleContent === target &&
            <div {...attributesToProps(attribs)}>
                {children}
            </div>
        }
    </>
      )
}

export default ToggleContent;
