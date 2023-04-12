import Document, { Html, Head, Main, NextScript } from 'next/document';
import { files } from '../lib/externalFiles';
import { addCSSAsset } from 'lib/enqueuedFiles';

class CXDoc extends Document {
  render() {
    
    return (
      <Html>
        <Head>
        </Head>
          {files.css.map((sheet) => {
              return addCSSAsset(sheet);
          })}
        <body className="home page-template page-template-templates page-template-full-width page-template-templatesfull-width-php page page-id-75 wp-custom-logo wp-embed-responsive group-blog featured-image-wide">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CXDoc;
