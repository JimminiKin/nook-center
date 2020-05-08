import React from 'react';
import Layout from '@components/App/Layout';
import withLocale from '@hocs/withLocale';
import {getByLang} from '@modules/villagers';
import {localeSlugToFullLocale, locales} from '@src/translations/config';
import {FullVillager} from '@src/types';
import MyVillagers from '@components/Villager/MyVillagers';

export const getStaticPaths = () => {
	return {
		paths: locales.map((l) => `/${l}/my-village`),
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

const MyVillage: React.FC<{villagers: {[key: string]: FullVillager}}> = ({villagers}) => {
	return (
		<Layout>
			<MyVillagers villagers={villagers}></MyVillagers>
		</Layout>
	);
};

export default withLocale(MyVillage, {ssr: false});
