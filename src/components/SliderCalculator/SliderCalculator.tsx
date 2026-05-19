import { useEffect, useRef, useState } from "react";

interface CXCalcProps {
  children;
}

const SliderCalculator = ({children = <></>}: CXCalcProps): JSX.Element => {
  const initialized = useRef(false);
  const [calcsLoaded, setCalcsLoaded] = useState([]);

  // Load the external CXCalc script and initialize the slider calculator on mount
  useEffect(() => {
    // Helper: inject an external script tag and track it in state
    const loadScript = ({ id, src, onload = null }) => {
      const externalScript = document.createElement("script");
      externalScript.id = id;
      externalScript.async = false;
      externalScript.type = "text/javascript";
      externalScript.onload = onload;
      document.body.appendChild(externalScript);
      console.log(`Load Script: ${src}`);
      setCalcsLoaded([...calcsLoaded, id]);
      console.log("calcsLoaded: ", calcsLoaded);
      externalScript.src = src;
    };

    // Script(s) to load — points at the versioned CXCalc bundle
    let CXCalcFile = [
      {
        id: "SliderCalculatorUI",
        src: `/cxlib/calculators/${
          process.env.NEXT_PUBLIC_CALCULATOR_VERSION
            ? process.env.NEXT_PUBLIC_CALCULATOR_VERSION
            : "0.0.1"
        }/scripts.js${
          process.env.NEXT_PUBLIC_CACHE
            ? "?cache=" + process.env.NEXT_PUBLIC_CACHE
            : ""
        }`,
        strategy: "afterInteractive",
        onload: () => {
          console.log("window.CXCalc: ", window.CXCalc);
          window.CXCalc ? window.CXCalc?.SliderCalculatorUI?.init() : null;
        },
      },
    ];

    console.log("initialized current:", initialized.current);

    // First mount: inject the script(s) exactly once
    if (!initialized.current) {
      initialized.current = true;
      CXCalcFile.map((file) => {
        loadScript(file);
      });
      CXCalcFile = [];
    }

    // Re-mount / hot reload: script is already on the page, just re-init
    if (window.CXCalc) {
      window.CXCalc ? window.CXCalc?.SliderCalculatorUI?.init() : null;
    }

    // Cleanup on unmount
    return () => {
      console.log("Cleanup!");
      initialized.current = true;
      CXCalcFile = [];
    };
  }, []);

  return <>{children}</>;
}

export default SliderCalculator