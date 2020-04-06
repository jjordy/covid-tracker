import React from "react";
import * as Sentry from "@sentry/node";
import "css/tailwind.css";
import "css/styles.css";
import { SWRConfig } from 'swr';

Sentry.init({
  // Replace with your project's Sentry DSN
  dsn: process.env.SENTRY_DSN,
});

export default function App({ Component, pageProps, err }) {
  return (
    <SWRConfig value={{
      //@ts-ignore
      fetcher: (...args) => fetch(...args).then(res => res.json())
    }}>
      <Component {...pageProps} err={err} />
    </SWRConfig>
  );
}
