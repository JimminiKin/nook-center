import React from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {withApollo, createApolloClient} from '@apollo/client';

import {useVillagerQuery, VillagerDocument} from '@query/villager';

import {NextPage} from 'next';

import {ucfirst, getGenderEmoji, getZodiacEmoji} from '@modules/utils';

export const getStaticPaths = async () => {
	const data = require('@data/villagers.json');

	return {
		paths: data.map((villager) => `/villager/${villager.id}`),
		fallback: false,
	};
};

export const getStaticProps = async ({params}) => {
	const apolloClient = createApolloClient();
	await apolloClient.query({
		query: VillagerDocument,
		variables: {villagerId: params.id},
	});
	return {
		props: {
			apolloState: apolloClient.cache.extract(),
		},
	};
};

const Villager: NextPage = () => {
	const router = useRouter();

	const {loading, error, data} = useVillagerQuery({
		variables: {
			villagerId: router.query.id as string,
		},
	});

	if (error) {
		throw new Error('Error searching for villagers');
	}

	if (loading) {
		return (
			<div className="items-center flex justify-around p-56">
				<h4>Loading ...</h4>
			</div>
		);
	}

	const {villager} = data;

	return (
		<>
			<Head>
				<title>{villager.name} - Villager - Nook Center</title>
			</Head>
			<div className="content-center flex flex-col justify-center">
				<h1 className="text-green-900 font-bold text-5xl text-center my-8">{villager.id}</h1>
				<img
					loading="lazy"
					className="block h-64"
					style={{objectFit: 'contain'}}
					src={villager.picture.full}
					alt={`Picture of ${villager.name}`}
				/>{' '}
				<h2 className="text-green-900 font-bold text-xl  px-8 pt-8 pb-4">Informations :</h2>
				<dl className="px-8 text-center">
					<div className="flex justify-start gap-4">
						<dt className="p-2 whitespace-no-wrap">Species : </dt>
						<dd className="p-2">{ucfirst(villager.species)}</dd>
					</div>
					<hr />
					<div className="flex justify-start gap-4">
						<dt className="p-2 whitespace-no-wrap">Gender : </dt>
						<dd className="p-2">
							{ucfirst(villager.gender)} {getGenderEmoji(villager.gender)}
						</dd>
					</div>
					<hr />
					<div className="flex justify-start gap-4">
						<dt className="p-2 whitespace-no-wrap">Birthday : </dt>
						<dd className="p-2">{ucfirst(villager.birthday)}</dd>
					</div>
					<hr />
					<div className="flex justify-start gap-4">
						<dt className="p-2 whitespace-no-wrap">Zodiac Sign : </dt>
						<dd className="p-2">
							{ucfirst(villager.starSign)} {getZodiacEmoji(villager.starSign)}
						</dd>
					</div>
					<hr />
					<div className="flex justify-start gap-4">
						<dt className="p-2 whitespace-no-wrap">Personality : </dt>
						<dd className="p-2">{ucfirst(villager.personality)}</dd>
					</div>
					<hr />
					<div className="flex justify-start gap-4">
						<dt className="p-2 whitespace-no-wrap">Description : </dt>
						<dd className="p-2">{villager.description}</dd>
					</div>
					<hr />
					<div className="flex justify-start gap-4">
						<dt className="p-2 whitespace-no-wrap">Saying : </dt>
						<dd className="p-2">{villager.saying}</dd>
					</div>
				</dl>{' '}
				<h2 className="text-green-900 font-bold text-xl  px-8 pt-8 pb-4">Names in other languages :</h2>
				<ul className="px-8 mb-8">
					<li>
						<span className="p-2">🇫🇷</span>
						<span>{villager.translations.french}</span>
					</li>
					<li>
						<span className="p-2">🇯🇵</span>
						<span>{villager.translations.japanese}</span>
					</li>
					<li>
						<span className="p-2">🇪🇸</span>
						<span>{villager.translations.spanish}</span>
					</li>
					<li>
						<span className="p-2">🇩🇪</span>
						<span>{villager.translations.german}</span>
					</li>
					<li>
						<span className="p-2">🇮🇹</span>
						<span>{villager.translations.italian}</span>
					</li>
					<li>
						<span className="p-2">🇳🇱</span>
						<span>{villager.translations.dutch}</span>
					</li>
					<li>
						<span className="p-2">🇰🇷</span>
						<span>{villager.translations.korean}</span>
					</li>
					<li>
						<span className="p-2">🇷🇺</span>
						<span>{villager.translations.russian}</span>
					</li>
					<li>
						<span className="p-2">🇨🇳</span>
						<span>{villager.translations.chinese}</span>
					</li>
				</ul>
			</div>
		</>
	);
};

export default withApollo(Villager, {ssr: false});
