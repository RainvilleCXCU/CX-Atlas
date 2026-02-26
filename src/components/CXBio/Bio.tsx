import ReadMore from "components/common/readmore";

const CXBio = ({ children }) => {
  // get the name, title, and text from the 'children' prop
  const bioName = children[1].props.children[1].props.children;
  const bioTitle = children[1].props.children[3].props.children;
  const bioText = children[1].props.children[5].props.children;

  return (
    <div className="cx-bio">
      <div className="cx-bio__bio-wrapper">
        <h3 className="cx-bio__name">{bioName}</h3>
        <span className="cx-bio__title">{bioTitle}</span>
        <ReadMore className="cx-bio__bio">{bioText}</ReadMore>
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