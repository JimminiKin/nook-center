import React, { useState } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { FaBars, FaHamburger } from "react-icons/fa";
import HeadLinks from "@components/App/HeadLInks";

import "../css/styles.css";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [isMenuOpen, setOpenMenu] = useState<boolean>(false);
  return (
    <>
      <Head>
        <title>Nook Center</title>
        <HeadLinks></HeadLinks>
      </Head>
      <header className="bg-green-700 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3">
        <div className="flex justify-between items-center px-4 py-3 sm:p-0">
          <div>
            <Link href="/">
              <a
                onClick={() => {
                  setOpenMenu(false);
                }}
              >
                <img className="h-10" src="/favicon-96x96.png" alt="Logo" />
              </a>
            </Link>
          </div>
          <div>
            <button
              type="button"
              className="block text-gray-300 hover:text-white focus:text-white sm:hidden"
              onClick={() => {
                setOpenMenu(!isMenuOpen);
              }}
            >
              {isMenuOpen ? <FaHamburger /> : <FaBars />}
            </button>
          </div>
        </div>
        <nav
          className={`px-2 pt-2 pb-4 ${
            isMenuOpen ? "block" : "hidden"
          } sm:flex sm:p-0`}
        >
          <Link href="/villager">
            <a
              className="sm:mt-0 mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-green-900"
              onClick={() => {
                setOpenMenu(false);
              }}
            >
              Villagers
            </a>
          </Link>
          <Link href="/islands">
            <a
              className="sm:mt-0 mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-green-900"
              onClick={() => {
                setOpenMenu(false);
              }}
            >
              Islands
            </a>
          </Link>
        </nav>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default App;
