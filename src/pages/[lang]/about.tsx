import React from 'react';
import Head from 'next/head';
import Layout from '@components/App/Layout';
import withLocale from '@hocs/withLocale';
import {locales} from '../../translations/config';
import useTranslation from '@hooks/useTranslation';

export const getStaticPaths = () => {
	return {
		paths: locales.map((l) => `/${l}/about`),
		fallback: false,
	};
};

export const getStaticProps = ({params}) => {
	return {
		props: {
			locale: params.lang,
		},
	};
};
const About: React.FC = () => {
	const {t} = useTranslation();
	return (
		<Layout>
			<Head>
				<title>About - Nook Center</title>
			</Head>
			<div className="p-4">
				<h1 className="text-green-900 font-bold text-5xl text-center">{t('AboutMenuEntry')}</h1>
				<p className="p-4 text-xl">
					Developped with{' '}
					<a href="https://nextjs.org/" className="font-bold">
						Next.js
					</a>
				</p>
				<p className="p-4 text-xl">
					Images provided by{' '}
					<a href="https://acnhcdn.com/" className="font-bold">
						acnhcdn.com
					</a>
				</p>
				<p className="p-4 text-xl">
					Data from the spreadsheets discussed on{' '}
					<a href="https://discord.gg/kWMMYrN" className="font-bold">
						this discord
					</a>
				</p>
				<p className="p-4 text-xl">
					Data included to the project using{' '}
					<a href="https://www.npmjs.com/package/@stun3r/acnh-translations" className="font-bold">
						@stun3r/acnh-translations
					</a>{' '}
					and{' '}
					<a href="https://www.npmjs.com/package/@nooksbazaar/acdb" className="font-bold">
						@nooksbazaar/acdb
					</a>
				</p>
			</div>
		</Layout>
	);
};

export default withLocale(About, {ssr: false});
