import "@testing-library/jest-dom/extend-expect";

export {};

declare global {
  interface Window {
    KJE: any;
    CXCalc: any;
    $Lightning: any;
    CXoneDfo: any;
  }
  interface Element {
    style: CSSStyleDeclaration
}
}