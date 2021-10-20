import React from "react";
import "css/tailwind.css";
import "css/styles.css";
import { SWRConfig } from 'swr';


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
