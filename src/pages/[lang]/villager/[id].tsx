import React from 'react';
import Layout from '@components/App/Layout';
import withLocale from '@hocs/withLocale';
import Head from 'next/head';
import {locales, localeSlugToFullLocale} from '../../../translations/config';
import {getByLang, getAllData} from '@modules/villagers';
import {ucfirst, getGenderEmoji, getZodiacEmoji} from '@modules/utils';
import {FullVillager} from '@src/types';
import useTranslation from '@hooks/useTranslation';

export const getStaticPaths = async () => {
	const villagers = await getAllData();
	return {
		paths: locales
			.map((l) => `/${l}`)
			.map((lp) => {
				return Object.keys(villagers).map((villagerId) => `${lp}/villager/${villagerId}`);
			})
			.reduce((a, b) => a.concat(b), []),
		fallback: false,
	};
};

export const getStaticProps = async ({params}) => {
	const all = await getByLang(localeSlugToFullLocale[params.lang]);
	return {
		props: {
			locale: params.lang,
			villager: all[params.id],
		},
	};
};

const Villager: React.FC<{villager: FullVillager}> = ({villager}) => {
	const {t} = useTranslation();
	return (
		<Layout>
			<Head>
				<title>{villager.name} - Villager - Nook Center</title>
			</Head>
			<div className="content-center">
				<h1 className="text-green-900 font-bold text-5xl text-center my-8">{villager.name}</h1>
				<div className="flex justify-evenly">
					<div className="flex flex-col justify-evenly">
						<img
							loading="lazy"
							className="block m-4"
							src={villager.iconImage}
							width="128"
							height="128"
							alt={`Picture of ${villager.name}`}
						/>
						<img
							loading="lazy"
							className="block m-4"
							src={villager.poster.image}
							width="128"
							height="128"
							alt={String(villager.poster.name)}
						/>
						<img
							loading="lazy"
							className="block m-4"
							src={villager.photo.image}
							width="128"
							height="128"
							alt={String(villager.photo.name)}
						/>
					</div>
					<div>
						<img
							loading="lazy"
							className="block m-4"
							src={villager.houseImage}
							width="512"
							height="512"
							alt={`Picture the house of ${villager.name}`}
						/>
					</div>
				</div>
				<h2 className="text-green-900 font-bold text-xl  px-8 pt-8 pb-4">Informations :</h2>
				<dl className="px-8 text-center">
					<div className="flex justify-start gap-4 border-b border-t border-green-600 border-opacity-25">
						<dt className="p-2 whitespace-no-wrap">{t('Species')} : </dt>
						<dd className="p-2">{t(villager.species)}</dd>
					</div>
					<div className="flex justify-start gap-4 border-b border-green-600 border-opacity-25">
						<dt className="p-2 whitespace-no-wrap">{t('Gender')} : </dt>
						<dd className="p-2">
							{t(villager.gender)} {getGenderEmoji(villager.gender)}
						</dd>
					</div>
					<div className="flex justify-start gap-4 border-b border-green-600 border-opacity-25">
						<dt className="p-2 whitespace-no-wrap">{t('Birthday')} : </dt>
						<dd className="p-2">{t(villager.birthday)}</dd>
					</div>
					<div className="flex justify-start gap-4 border-b border-green-600 border-opacity-25">
						<dt className="p-2 whitespace-no-wrap">{t('Zodiac Sign')} : </dt>
						<dd className="p-2">
							{t(villager.zodiacSign)} {getZodiacEmoji(villager.zodiacSign)}
						</dd>
					</div>
					<div className="flex justify-start gap-4 border-b border-green-600 border-opacity-25">
						<dt className="p-2 whitespace-no-wrap">{t('Personality')} : </dt>
						<dd className="p-2">{t(villager.personality)}</dd>
					</div>
					{/* <div className="flex justify-start gap-4 border-b border-green-600 border-opacity-25">
						<dt className="p-2 whitespace-no-wrap">{t("Description")} : </dt>
						<dd className="p-2">{villager.description}</dd>
					</div> */}
					<div className="flex justify-start gap-4 border-b border-green-600 border-opacity-25">
						<dt className="p-2 whitespace-no-wrap">{t('Catchphrase')} : </dt>
						<dd className="p-2">{villager.catchphrase}</dd>
					</div>
				</dl>
				{/*<h2 className="text-green-900 font-bold text-xl  px-8 pt-8 pb-4">Names in other languages :</h2>
				 <ul className="px-8 mb-8">
					<li>
						<span className="p-2">🇬🇧</span>
						<span>{villager.translations.english}</span>
					</li>
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
				</ul> */}
			</div>
		</Layout>
	);
};

export default withLocale(Villager, {ssr: false});
