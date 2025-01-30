import { useEffect, useRef, useState } from 'react';

export interface Props {
    align?,
    children?
    classNames?
    style?
    columns?
    mobileSwipe?
}

function SwiperContainer({
    align = '',
    style = {},
    children = <></>,
    classNames,
    columns = 1,
    mobileSwipe = true
}: Props): JSX.Element {    
  const divElement = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const isActive = (index) => {
    const lowerEnd = (index / (columns - 1)) * 100;
    return scrollPercentage >= lowerEnd - 5 && scrollPercentage <= lowerEnd + 5
  }
  useEffect(() => {
    const container = divElement.current;
    const scroller = container.querySelector('.wp-block-columns');
    const handleScroll = e => {
      let scrollLeft = scroller.scrollLeft; // Get the horizontal scroll offset
      let maxScrollLeft = scroller.scrollWidth - scroller.clientWidth; // Maximum horizontal scroll distance
      setScrollPercentage((scrollLeft / maxScrollLeft) * 100); // Calculate scroll position as a percentage
    }
    if(scroller && mobileSwipe) {
      scroller.addEventListener('scroll', handleScroll);
    }
  }, [])

  return (
    <div ref={divElement} className={`cx-swiper-container mobile-swipe ${classNames}`} style={style}>
        {children}
          <div className="dot-indicator">
            { Array.from({ length: columns }).map((_, index) => (
                  <div key={index} className={`dot${isActive(index) ? ' active' : ''}`}></div>
              ))}
          </div>
    </div>
  );
}

export default SwiperContainer;
