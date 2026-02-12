import { useRef, useState, useEffect } from "react";
interface ReadMoreProps {
	children: string;
    devices?: string;
    className: string;
}

const ReadMore = ({ children, devices, className = "" }:ReadMoreProps) => {
  // get the name, title, and text from the 'children' prop

  const [bioExpanded, setBioExpanded] = useState(false);
  const readMoreButtonRef = useRef(null);
  const bioTextRef = useRef(null);

  const handleClick = () => {
    setBioExpanded(!bioExpanded);
    readMoreButtonRef.current.innerHTML = bioExpanded ? "Read more" : "Read less";
    readMoreButtonRef.current.classList.toggle("expanded");
  };

  const handleResize = () => {
    if ((window.innerWidth >= 800 && devices != 'all') || (devices == 'all') && bioExpanded) {
      bioTextRef.current.style.maskImage = "unset";
      bioTextRef.current.style.maxHeight = "none"
    } else if ((window.innerWidth < 800 || devices == 'all') && !bioExpanded) {
      bioTextRef.current.style.maskImage = "linear-gradient(to bottom, black, black, transparent)";
      bioTextRef.current.style.maxHeight = "126px"
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    if (window.innerWidth >= 800 && devices !== 'all') {
      bioTextRef.current.style.maskImage = "unset";
      bioTextRef.current.style.maxHeight = "none"
    }
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  });

  return (
    <div className={`cx-readmore ${className}`}>
        <p
            ref={bioTextRef}
            className="cx-transition__max-height"
            style={{
            maxHeight: bioExpanded ? `${bioTextRef.current.scrollHeight}px` : "126px",
            maskImage: bioExpanded ? "unset" : "linear-gradient(to bottom, black, black, transparent)",
            }}
        >
            {children}
        </p>
        <button
            className={`cx-button cx-block u-margin-center cx-button--text cx-button--compact read_more_button ${devices && devices !== 'all' ? 'cx-hidden__desktop cx-hidden__tablet' : ''}`}
            ref={readMoreButtonRef}
            onClick={handleClick}
        >
            Read more
        </button>
    </div>
  );
};

export default ReadMore;