import Document, { Html, Head, Main, NextScript } from "next/document";
import { files } from "../lib/externalFiles";
import { addJSAsset } from "lib/enqueuedFiles";


class CXDoc extends Document {
  render() {
    return (
      <Html
        lang="en-us">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>{`body { display: block !important }`}</style>
          <link href='https://www.googletagmanager.com' rel='dns-prefetch' />
          <link href={process.env.NEXT_PUBLIC_WORDPRESS_URL} rel='dns-prefetch' />

          <meta name="smartbanner:title" content="Connexus CU Mobile" />
          <meta name="smartbanner:author" content="Connexus Credit Union" />
          <meta name="smartbanner:ios:url" content="https://apps.apple.com/us/app/connexus-cu-mobile-app/id895555570" />
          <meta name="smartbanner:android:url" content="https://play.google.com/store/apps/details?id=com.alkamitech.connexus" />
          <meta name="smartbanner:button-url-apple" content="https://ios/application-url"/>
          <meta name="smartbanner:button-url-google" content="https://android/application-url"/>
          <meta name="smartbanner:enabled-platforms" content="android,ios" />

          

          {process.env.NEXT_PUBLIC_NOFONTS !== 'true' && 
            <>
              <link href='https://cloud.typography.com' rel='dns-prefetch' />
              <link
                rel="preload"
                href={`https://cloud.typography.com/6914618/${process.env.NEXT_PUBLIC_CLOUD_FONT || '7711232'}/css/fonts.css`}
                as="style"
              />
              <link
                rel="stylesheet"
                href={`https://cloud.typography.com/6914618/${process.env.NEXT_PUBLIC_CLOUD_FONT || '7711232'}/css/fonts.css`}
              />
            </>
          }
          
          {process.env.NEXT_PUBLIC_HOSTED_FONTS == 'true' &&
            <>
              <link
                rel="preload"
                href={`/856897/9F6C645B2367EC4D3.css`}
                as="style"
              />
              <link
                rel="stylesheet"
                href={`/856897/9F6C645B2367EC4D3.css`}
              />
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
