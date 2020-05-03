import React, { useState } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import HeadLinks from "@components/App/HeadLinks";
import Header from "@components/App/Header";

import CurrentInhabitantsProvider from "@components/contexts/CurrentInhabitantsContext";
import PastInhabitantsProdiver from "@components/contexts/PastInhabitantsContext";
import PastCampersProvider from "@components/contexts/PastCampersContext";

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
        <PastCampersProvider>
          <PastInhabitantsProdiver>
            <CurrentInhabitantsProvider>
              <Component {...pageProps} />
            </CurrentInhabitantsProvider>
          </PastInhabitantsProdiver>
        </PastCampersProvider>
      </main>
    </>
  );
};

export default App;
