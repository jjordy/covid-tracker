import Document, { Head, Main, NextScript } from "next/document";

export default class extends Document {
  render() {
    return (
      <html>
        <Head />
        <body className="bg-gray-900">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
