import Document, { Html, Head, Main, NextScript } from "next/document";
import { files } from "../lib/externalFiles";
import { addJSAsset } from "lib/enqueuedFiles";
import { WingifyScript } from "wingify-smartcode-nextjs";


class CXDoc extends Document {
  render() {
    return (
      <Html
        lang="en-us">
        <Head>
          {/* 
            DEV ONLY: LocalWP's domain router does not forward Next.js's hot-reload
            WebSocket (/_next/webpack-hmr)
          */}
          {process.env.NODE_ENV === 'development' && (
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(){if(window.__hmrStubbed)return;window.__hmrStubbed=true;var R=window.WebSocket;if(!R)return;function F(){var s=this;this.readyState=1;setTimeout(function(){if(typeof s.onopen==='function')s.onopen({});},0);}F.prototype.OPEN=1;F.prototype.send=function(){};F.prototype.close=function(){};F.prototype.addEventListener=function(){};F.prototype.removeEventListener=function(){};function W(u,p){if(typeof u==='string'&&u.indexOf('webpack-hmr')!==-1){console.warn('[dev] HMR socket stubbed (LocalWP proxy workaround) - page will NOT auto-reload; refresh manually to see changes.');return new F();}return new R(u,p);}W.prototype=R.prototype;W.OPEN=R.OPEN;W.CONNECTING=R.CONNECTING;W.CLOSING=R.CLOSING;W.CLOSED=R.CLOSED;window.WebSocket=W;})();`,
              }}
            />
          )}
          {/* <style>{`body { display: block !important }`}</style> */}
          <link href='https://www.googletagmanager.com' rel='dns-prefetch' />
          <link href={process.env.NEXT_PUBLIC_WORDPRESS_URL} rel='dns-prefetch' />
          {
            process.env.NEXT_PUBLIC_DISABLED_APP_BANNER !== 'true' &&
            <>
              <meta name="smartbanner:title" content="Connexus CU Mobile" />
              <meta name="smartbanner:author" content="Connexus Credit Union" />
              <meta name="smartbanner:ios:url" content="https://apps.apple.com/us/app/connexus-cu-mobile-app/id895555570" />
              <meta name="smartbanner:android:url" content="https://play.google.com/store/apps/details?id=com.alkamitech.connexus" />
              <meta name="smartbanner:button-url-apple" content="https://ios/application-url"/>
              <meta name="smartbanner:button-url-google" content="https://android/application-url"/>
              <meta name="smartbanner:enabled-platforms" content="android,ios" />
              <meta name="apple-itunes-app" content="app-id=895555570"></meta>
            </>
          }
          
          <link
            rel="preload"
            href={`/_next/static/css/styles.css${process.env.NEXT_PUBLIC_CACHE ? "?cache=" + process.env.NEXT_PUBLIC_CACHE : '' }`}
            as="style"
          />
          <link rel="stylesheet" href={`/_next/static/css/styles.css${process.env.NEXT_PUBLIC_CACHE ? "?cache=" + process.env.NEXT_PUBLIC_CACHE : '' }`} />
          {process.env.NEXT_PUBLIC_DISABLE_STYLEGUIDE !== 'true' &&
            <>
              <link
                rel="preload"
                href={`/wp-content/themes/CXCU/assets/${
                  process.env.NEXT_PUBLIC_styleguideVersion || "latest"}/cxcuatlas.css${process.env.NEXT_PUBLIC_CACHE ? "?cache=" + process.env.NEXT_PUBLIC_CACHE : '' }`}
                as="style"
              />
              <link rel="stylesheet" href={`/wp-content/themes/CXCU/assets/${
                  process.env.NEXT_PUBLIC_styleguideVersion || "latest"}/cxcuatlas.css${process.env.NEXT_PUBLIC_CACHE ? "?cache=" + process.env.NEXT_PUBLIC_CACHE : '' }`} />
            </>
          }
          <WingifyScript accountId="1256673" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {files.js.map((sheet) => {
            console.log(`Script: ${sheet}`);
            return addJSAsset(sheet);
          })}
        </body>
      </Html>
    );
  }
}

export default CXDoc;
