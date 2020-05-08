import React from 'react';
import Head from 'next/head';
import {getInitialLocale} from '../translations/getInitialLocale';

const Index: React.FC = () => {
	React.useEffect(() => {
		window.location.replace(`/${getInitialLocale()}`);
	});
	return null;
};

export default Index;
