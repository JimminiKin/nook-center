import React, { useState } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import HeadLinks from "@components/App/HeadLinks";
import Header from "@components/App/Header";

import "../css/styles.css";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Nook Center</title>
        <HeadLinks></HeadLinks>
      </Head>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default App;
