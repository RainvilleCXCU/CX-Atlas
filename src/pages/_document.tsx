import Document, { Html, Head, Main, NextScript } from "next/document";
import { files } from "../lib/externalFiles";
import { addCSSAsset, addJSAsset } from "lib/enqueuedFiles";


class CXDoc extends Document {
  render() {
    return (
      <Html>
        <Head>
          <style>{`body { display: block !important }`}</style>
          <link href='https://www.googletagmanager.com' rel='preconnect' />
          <link href='https://www.googletagmanager.com' rel='dns-prefetch' />
          <link href='https://cloud.typography.com' rel='preconnect' />
          <link href='https://cloud.typography.com' rel='dns-prefetch' />
          <link href={process.env.NEXT_PUBLIC_WORDPRESS_URL} rel='preconnect' />
          <link href={process.env.NEXT_PUBLIC_WORDPRESS_URL} rel='dns-prefetch' />
          {/* <link
            rel="stylesheet"
            href={`/856897/9F6C645B2367EC4D3.css`}
          /> */}
          <link
            rel="stylesheet"
            href={`https://cloud.typography.com/6914618/${process.env.NEXT_PUBLIC_CLOUD_FONT || '7711232'}/css/fonts.css`}
          />
          
          <link rel="stylesheet" href="/_next/static/css/styles.css" />
          <link rel="stylesheet" href={`/wp-content/themes/CXCU/assets/${
                process.env.NEXT_PUBLIC_styleguideVersion || "latest"
              }/cxcuatlas.css?v=3`} />
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
