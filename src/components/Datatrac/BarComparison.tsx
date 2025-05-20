import { useEffect } from "react";

function DataTracBarComparison({...attribs}) {

  useEffect(() => {
      // Create the Observer and add the '.show' class when element is in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
          entry.target.classList.add('show');
          }
      });
    });

    // Grab all of the bar graph elements
    const rateBarElements = document.querySelectorAll('.rate_info__rate--bar');

    // Tell the Observer to watch the elements
    rateBarElements.forEach((element) => observer.observe(element));
  }, []);
  

  return <div {...attribs}>{attribs?.children}</div>;
}

export default DataTracBarComparison;
