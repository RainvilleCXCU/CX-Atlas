import { useRef, useState, useEffect } from "react";

const CXBio = ({ children }) => {
  // get the name, title, and text from the 'children' prop
  const bioName = children[1].props.children[1].props.children;
  const bioTitle = children[1].props.children[3].props.children;
  const bioText = children[1].props.children[5].props.children;

  const [bioExpanded, setBioExpanded] = useState(false);
  const readMoreButtonRef = useRef(null);
  const bioTextRef = useRef(null);

  const handleClick = () => {
    setBioExpanded(!bioExpanded);
    readMoreButtonRef.current.innerText = bioExpanded ? "Read more" : "Read less";
    readMoreButtonRef.current.classList.toggle("expanded");
  };

  const handleResize = () => {
    if (window.innerWidth >= 800) {
      bioTextRef.current.style.maskImage = "unset";
    } else {
      bioTextRef.current.style.maskImage = "linear-gradient(to bottom, black, transparent)";
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    if (window.innerWidth >= 800) {
      bioTextRef.current.style.maskImage = "unset";
    }
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  });

  return (
    <div className="cx-bio">
      <div className="cx-bio__bio-wrapper">
        <h3 className="cx-bio__name">{bioName}</h3>
        <span className="cx-bio__title">{bioTitle}</span>
        <p
          className="cx-bio__bio"
          ref={bioTextRef}
          style={{
            maxHeight: bioExpanded ? `${bioTextRef.current.scrollHeight}px` : "126px",
            maskImage: bioExpanded ? "unset" : "linear-gradient(to bottom, black, transparent)",
          }}
        >
          {bioText}
        </p>
        <button
          className="cx-button cx-button--text cx-button--compact read_more_button"
          ref={readMoreButtonRef}
          onClick={handleClick}
        >
          Read more
        </button>
      </div>

      <img
        decoding="async"
        src={children[3].props.src}
        alt={children[1].props.children[1].props.children}
        className="cx-bio__photo"
      />
    </div>
  );
};

export default CXBio;