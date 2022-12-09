import Document, { Html, Head, Main, NextScript } from 'next/document';

class CXDoc extends Document {
  render() {
    return (
      <Html>
        <Head>

        </Head>
        <body className="home page-template page-template-templates page-template-full-width page-template-templatesfull-width-php page page-id-75 wp-custom-logo wp-embed-responsive group-blog featured-image-wide">
          <Main />
          <NextScript />
          <script async src="https://cxcudev.wpengine.com/wp-content/themes/CXCU/assets/0.6.7/cxcu.js" type="text/javascript"></script>
        </body>
      </Html>
    );
  }
}

export default CXDoc;
