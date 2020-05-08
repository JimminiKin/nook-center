import React from 'react';
import Layout from '@components/App/Layout';
import withLocale from '@hocs/withLocale';
import {Gender, Species, Personality, ZodiacSign, FullVillager} from '@src/types';
import Head from 'next/head';
import {ucfirst} from '@modules/utils';
import VillagerCard from '@components/Villager/VillagerCard';
import {getByLang} from '@modules/villagers';
import {localeSlugToFullLocale, locales} from '@src/translations/config';
import useTranslation from '@hooks/useTranslation';

export const getStaticPaths = () => {
	return {
		paths: locales.map((l) => `/${l}/villagers`),
		fallback: false,
	};
};

export const getStaticProps = async ({params}) => {
	const all = await getByLang(localeSlugToFullLocale[params.lang]);
	return {
		props: {
			locale: params.lang,
			villagers: all,
		},
	};
};
const Villagers: React.FC<{villagers: {[key: string]: FullVillager}}> = ({villagers}) => {
	const [gender, setGender] = React.useState<string>('');
	const [personality, setPersonality] = React.useState<string>('');
	const [species, setSpecies] = React.useState<string>('');
	const [starSign, setStarSign] = React.useState<string>('');
	const [searchText, setSearchText] = React.useState<string>('');

	const {t} = useTranslation();

	return (
		<Layout>
			<Head>
				<title>Villager Search - Nook Center</title>
			</Head>
			<div className="p-4 flex justify-evenly flex-wrap">
				<input
					aria-label={t('Text Search')}
					type="text"
					className="inline-block p-2 px-3 rounded m-4"
					value={searchText || ''}
					onChange={(event) => setSearchText(event.target.value)}
					placeholder={t('Text Search')}
				/>

				<select
					aria-label="Select Gender"
					value={gender || ''}
					className="inline-block p-2 m-4 rounded"
					onChange={(event) => setGender(event.target.value)}
				>
					<option value="">{t('Gender')}</option>
					{Object.keys(Gender).map((key) => {
						return (
							<option key={key} value={key}>
								{t(Gender[key])}
							</option>
						);
					})}
				</select>
				<select
					aria-label="Select Species"
					value={species || ''}
					className="inline-block p-2 m-4 rounded"
					onChange={(event) => setSpecies(event.target.value || '')}
				>
					<option value="">{t('Species')}</option>
					{Object.keys(Species).map((key) => (
						<option key={key} value={key}>
							{t(Species[key])}
						</option>
					))}
				</select>

				<select
					aria-label="Select Star Sign"
					value={starSign || ''}
					className="inline-block p-2 m-4 rounded"
					onChange={(event) => setStarSign(event.target.value || '')}
				>
					<option value="">{t('Zodiac Sign')}</option>
					{Object.keys(ZodiacSign).map((key) => (
						<option key={key} value={key}>
							{t(ZodiacSign[key])}
						</option>
					))}
				</select>

				<select
					aria-label="Select Personality"
					value={personality || ''}
					className="inline-block p-2 m-4 rounded"
					onChange={(event) => setPersonality(event.target.value || '')}
				>
					<option value="">{t('Personality')}</option>
					{Object.keys(Personality).map((key) => (
						<option key={key} value={key}>
							{t(Personality[key])}
						</option>
					))}
				</select>

				<button
					className="inline-block bg-green-900 text-gray-100 p-2 px-3 rounded m-4"
					onClick={() => {
						setGender(undefined);
						setPersonality(undefined);
						setSpecies(undefined);
						setStarSign(undefined);
						setSearchText(undefined);
					}}
				>
					{t('Reset')}
				</button>
			</div>
			<ul className="flex flex-wrap justify-evenly p-4">
				{Object.values(villagers)
					.filter((villager) => {
						let keep = true;

						if (searchText) {
							if (String(villager.name).toUpperCase().includes(searchText.toUpperCase())) {
								keep = keep && true;
							} else {
								return false;
							}
						}

						if (gender) {
							if (gender === villager.gender) {
								keep = keep && true;
							} else {
								return false;
							}
						}

						if (personality) {
							if (personality === villager.personality) {
								keep = keep && true;
							} else {
								return false;
							}
						}

						if (species) {
							if (species === villager.species) {
								keep = keep && true;
							} else {
								return false;
							}
						}

						if (starSign) {
							if (starSign === villager.zodiacSign) {
								keep = keep && true;
							} else {
								return false;
							}
						}
						return keep;
					})
					.map((villager) => {
						return <VillagerCard key={villager.id} villager={villager} villagers={villagers} />;
					})}
			</ul>
		</Layout>
	);
};

export default withLocale(Villagers, {ssr: false});
