import Document, { Html, Head, Main, NextScript } from "next/document";

export default class extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="min-h-screen md:w-screen bg-gradient-to-tl from-gray-500 to-gray-50">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
