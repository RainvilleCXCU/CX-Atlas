import "@testing-library/jest-dom/extend-expect";

export {};

declare global {
  interface Window {
    KJE: any;
    CXCalc: any;
    $Lightning: any;
    CXoneDfo: any;
    ttd_dom_ready: any;
    MSStream: any;
    TTDUniversalPixelApi: function;
    closeBanner;
  }
  interface Element {
    style: CSSStyleDeclaration
}
}