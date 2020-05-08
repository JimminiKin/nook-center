import React, {useState} from 'react';
import {AppProps} from 'next/app';
import Head from 'next/head';
import Router from 'next/router';

import withGA from 'next-ga';

import withLocale from '@hocs/withLocale';

import '../css/styles.css';

const App: React.FC<AppProps> = ({Component, pageProps}) => {
	return (
		<>
			<Head>
				<title>Nook Center</title>
			</Head>
			<Component {...pageProps} />
		</>
	);
};

export default withGA('UA-165377644-1', Router)(App);
