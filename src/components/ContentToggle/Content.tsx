import { Store } from "context/store";
import { attributesToProps } from "html-react-parser";
import { useContext, useEffect, useState } from "react";
import { toggleContentContext } from "context/toggleContext";

export interface Props {
//   title?;
//   copy?;
//   continueLink?;
//   continueText?;
//   cancelText?;
  attribs?
  children?;
  device?;
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
  device = "all"
}: Props): JSX.Element {
  const {toggleContent, setToggleContent} = useContext(toggleContentContext);
  const target = attribs?.['data-toggle-content'];
  const [deviceType, setDeviceType] = useState<string>("desktop");

  useEffect(() => {
    const checkDevice = () => {
      const isMobile = window.innerWidth <= 780;
      setDeviceType(isMobile ? "mobile" : "desktop");
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const shouldShow = () => {
    if (device === "all") return toggleContent === target;
    if (device === "mobile") return deviceType === "mobile" ? toggleContent === target : true;
    if (device === "desktop") return deviceType === "desktop" ? toggleContent === target : true;
    return true; // Show for not listed devices
  };

  return (
      <>
        {shouldShow() &&
            <div {...attributesToProps(attribs)}>
                {children}
            </div>
        }
        </>
      )
}

export default ToggleContent;
