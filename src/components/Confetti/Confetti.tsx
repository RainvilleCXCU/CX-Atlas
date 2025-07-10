import { useState, useEffect } from "react";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import confetti from "canvas-confetti";

const Confetti = ({ ...attribs }) => {
  const {
    x_origin,
    y_origin,
    angle,
    spread,
    particle_count,
    colors,
    explosion_velocity,
    duration,
    gravity,
    drift,
    size,
    zIndex,
    decay,
    delay,
    // <- potential for admin driven svgPaths here
  } = attribs.attribs;

  const [delayComplete, setDelayComplete] = useState(false);
  const [confettiFired, setConfettiFired] = useState(false);
  const [xOrigin, setXOrigin] = useState(x_origin);

  useEffect(() => {
    // Set xOrigin to 0.5 if screen width < 992, else use provided x_origin
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setXOrigin(0.5);
      } else {
        setXOrigin(x_origin);
      }
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    // Only run the confetti once per session
    const hasRenderedConfetti = sessionStorage.getItem("hasRenderedConfetti");
    if (hasRenderedConfetti) {
      setConfettiFired(true);
    } else {
      sessionStorage.setItem("hasRenderedConfetti", "true");
    }

    // Trigger the animation after the delay
    const timer = setTimeout(() => {
      setDelayComplete(true);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [delay, x_origin]);

  // Split the colors string into an array and trim whitespace
  const colorsArr = colors.split(",").map((color) => color.trim());

  // Confetti shapes
  const svgPaths = [
    'M10,20.63c3.11-.76,6.99-1.07,9.95.41-6.92,8.14-12.63,23.25.52,27.65,13.99,4.68,17.16-15.31,15.19-24.52.14-.06.27-.12.4-.17,2.98-1.16,6.04-1.48,9.04-1.13l-1.48-12.06c-4.75-.09-9.5.87-13.84,2.87-5.35-4.98-13.31-6.87-21.04-4.99l1.25,11.94Z',
    'M65.58,24.88c-9.13-6.44-19.4-10.94-30.01-9.47-4.46-3.46-9.58-6.04-15.03-7.38-4.47-1.1-9.02-1.3-13.44-.74l.35,12.12c4.75-.78,9.72-.3,14.3,1.63-12.51,9.67-14.58,31.39-1.17,41.54,5.99,4.54,14.44,4.81,21,1.31,7.44-3.96,10.63-12.21,9.91-20.34-.48-5.52-2.27-10.83-5.02-15.62,4.87,1.42,9.58,4.3,13.9,7.66l5.2-10.7ZM36.19,53.2c-5.54,3.29-10.35-.75-11.9-6.12-2.07-7.18-.12-14.14,6.71-17.77.43-.23.86-.43,1.28-.62,1.92,2.14,3.56,4.53,4.8,7.12,2.33,4.88,4.91,13.95-.89,17.4Z',
    'M35.37,3.78l-11.57,3.19c3.12,18.13-4.15,36.64-17.96,48.54l8.49,8.49C31.55,49.14,39.2,26.01,35.37,3.78Z',
    'M5.01,27.14l10.98,4.84c3.1-8.75,11.55-14.86,21.01-13.91l1.9-11.85c-14.55-1.46-28.93,6.92-33.88,20.92Z',
    'M15.41,9.51c0,3.39-2.75,6.13-6.13,6.13s-6.13-2.75-6.13-6.13,2.75-6.13,6.13-6.13,6.13,2.75,6.13,6.13Z',
    'M6.89,6.66l-1.03,11.96c10.79.88,21.6.34,32.19-1.63l-4.02-11.48c-8.93,1.49-17.99,1.89-27.14,1.15Z',
    'M18.98,6.95l-11.86,2.23c.4,4.86-.91,9.82-4.17,13.87l8.9,8.05c5.53-6.89,8.01-15.68,7.13-24.15Z',
    'M15.41,9.51c0,3.39-2.75,6.13-6.13,6.13s-6.13-2.75-6.13-6.13,2.75-6.13,6.13-6.13,6.13,2.75,6.13,6.13Z',
    'M3.39,17.67l10.71,5.55c2.69-4.07,6.77-7.17,11.83-8.35l-2.05-11.83C15.28,5.06,7.91,10.45,3.39,17.67Z',
    'M43.62,3.83c-11.49,8.04-24.14,13.66-37.76,17l4.18,11.25c14.56-3.57,28.23-9.86,40.51-18.45l-6.93-9.8Z',
    'M41.83,13.8l-7.41-9.44c-6.85,6.26-17.19,7.67-25.08,2.38l-7.26,9.56c12.15,8.14,28.78,7.52,39.74-2.5Z',
  ];
  const shapes = svgPaths.map((path) => confetti.shapeFromPath(path));

  const decorateOptions = (defaultOptions) => {
    return {
      ...defaultOptions,
      origin: { x: xOrigin, y: y_origin },
      angle: angle,
      spread: spread,
      particleCount: particle_count,
      colors: colorsArr,
      startVelocity: explosion_velocity,
      ticks: duration,
      gravity: gravity,
      drift: drift,
      scalar: size,
      zIndex: zIndex,
      decay: decay,
      shapes: shapes,
      disableForReducedMotion: true,
    };
  };

  return (delayComplete && !confettiFired) ? (
    <Realistic
      autorun={{ speed: 1, duration: 1 }}
      decorateOptions={decorateOptions}
    />
  ) : null; // Render nothing until the delay has passed and only if confetti hasn't been fired yet in this session
};

export default Confetti;
