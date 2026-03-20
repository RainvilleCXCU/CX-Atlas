import React, { useState, useEffect, useMemo, useRef } from "react";

export default function ProductCard({ attribs, children }) {
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  // check device width on mount and on resize
  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 782);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Handle toggle of the accordion on mobile.
  const handleToggle = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const details = detailsRef.current;
    const content = contentRef.current;
    if (!details || !content) return;

    if (details.open) {
      content
        .animate(
          { height: [`${content.offsetHeight}px`, "0px"], opacity: [1, 0] },
          { duration: 250, easing: "ease" }
        )
        .finished.then(() => details.removeAttribute("open"));
    } else {
      details.setAttribute("open", "");
      content.animate(
        { height: ["0px", `${content.offsetHeight}px`], opacity: [0, 1] },
        { duration: 250, easing: "ease" }
      );
    }
  };

  // If not mobile or if the data-mobile-collapse attribute is present, render children as normal without accordion behavior
  if (!isMobile || attribs["data-mobile-collapse"] === "") {
    return <div {...attribs}>{children}</div>;
  }

  // For mobile, we want to extract the content of the "top-section" div for the summary,
  // and render the rest in the details section.
  const { filteredChildren, summaryContent } = useMemo(() => {
    const summaryNodes: React.ReactNode[] = [];

    const removeTopSection = (node: React.ReactNode) => {
      if (!React.isValidElement(node)) return node;

      // Check if this node is the "top-section" div and if so, extract its children for the summary
      if (node.type === "div") {
        const className = node.props.className;
        if (typeof className === "string" && className.split(" ").includes("top-section")) {
          summaryNodes.push(...React.Children.toArray(node.props.children));
          return null;
        }
      }

      // Recursively check children
      const nodeChildren = node.props.children;
      if (!nodeChildren) return node;

      // Process children and remove any "top-section" divs found within them
      const nextChildren = React.Children.toArray(nodeChildren).map(removeTopSection).filter(Boolean);
      if (nextChildren.length === React.Children.count(nodeChildren)) return node;
      return React.cloneElement(node, { ...node.props }, nextChildren);
    };

    const filtered = React.Children.toArray(children).map(removeTopSection).filter(Boolean);
    return { filteredChildren: filtered, summaryContent: summaryNodes };
  }, [children]);

  return (
    <div {...attribs}>
      <details ref={detailsRef}>
        <summary className="top-section accordion" onClick={handleToggle}>
          {summaryContent}
        </summary>
        <div ref={contentRef} style={{ overflow: "hidden" }}>
          <hr />
          {filteredChildren}
        </div>
      </details>
    </div>
  );
}