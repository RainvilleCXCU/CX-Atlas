import "@testing-library/jest-dom/extend-expect";

export {};

declare global {
  interface Window {
    KJE: any;
    CXCalc: any;
    $Lightning: any;
    CXoneDfo: any;
    ttd_dom_ready: any;
    TTDUniversalPixelApi: function;
  }
  interface Element {
    style: CSSStyleDeclaration
}
}