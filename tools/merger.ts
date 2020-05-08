const slug = require('slug');
import {Villagers} from '@nooksbazaar/acdb/villagers';
import {Items} from '@nooksbazaar/acdb/items';
import {SourceSheet, Version} from '@nooksbazaar/acdb/all';

import {FullVillager, TranslationCleaned, ZodiacSign} from '../src/types';

const fs = require('fs');
const util = require('util');
const path = require('path');

const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

const logToFile = (basePath: string, fileName: string) => async (data: any) => {
	await mkdir(basePath, {recursive: true});
	await writeFile(path.join(basePath, fileName), JSON.stringify(data, null, 4), {encoding: 'utf8'});
	return data;
};

const originalData = require('../data/villagers.json');

const villagersNameTranslations = require('@stun3r/acnh-translations/villagers.json') as TranslationItem[];
const villagersCatchPhraseTranslations = require('@stun3r/acnh-translations/catchphrases.json') as TranslationItem[];
const villagersMusicTranslations = require('@stun3r/acnh-translations/music.json') as TranslationItem[];
const itemsTranslations = require('@stun3r/acnh-translations/items.json') as TranslationItem[];
const zodiacTranslations = require('@stun3r/acnh-translations/constellations.json') as TranslationItem[];

const villagers = require('@nooksbazaar/acdb/villagers.json') as Villagers[];
const items = require('@nooksbazaar/acdb/items.json') as Items[];

interface TranslationItem {
	source: SourceSheet;
	id: string;
	version: Version;
	ref: string;
	localization: Translation;
	variants: any[];
}

interface Translation {
	en_US: string;
	en_GB: string;
	de_DE: string;
	es_ES: string;
	es_US: string;
	fr_FR: string;
	fr_CA: string;
	it_IT: string;
	nl_NL: string;
	zh_CN: string;
	zh_TW: string;
	ja_JP: string;
	ko_KR: string;
	ru_RU: string;
}

const renderOneVillager = (v: Villagers, locale?: keyof TranslationCleaned): FullVillager => {
	const id = slug(v.name);

	const original = originalData.find((o) => o.id === id);

	// const starSignTr = zodiacTranslations.find((tr) => tr.ref === original.starsign);
	// if (!starSignTr) {
	// 	throw new Error('Missing translation for ' + original.starsign);
	// }

	const nameTr = villagersNameTranslations.find((tr) => tr.id === v.filename);
	if (!nameTr) {
		throw new Error('Missing translation for ' + v.name);
	}
	const catchPhraseTr = villagersCatchPhraseTranslations.find((tr) => tr.id === v.filename);
	if (!catchPhraseTr) {
		throw new Error('Missing translation for ' + v.catchphrase);
	}

	const favoriteSong = items.find((p) => p.name.toLowerCase() === v.favoriteSong.toLowerCase());
	if (!favoriteSong) {
		throw new Error('Missing favorite song ' + v.favoriteSong);
	}

	const favoriteSongTr = villagersMusicTranslations.find((tr) => tr.ref.toLowerCase() === v.favoriteSong.toLowerCase());
	if (!favoriteSongTr) {
		throw new Error('Missing translation for ' + v.favoriteSong);
	}

	const posterRef = `${v.name}'s poster`;
	const posterItem = items.find((p) => p.name === posterRef);
	if (!posterItem) {
		throw new Error('Missing poster for ' + v.name);
	}

	const posterItemTr = itemsTranslations.find((tr) => tr.ref === posterRef);
	if (!posterItemTr) {
		throw new Error('Missing translation for ' + posterRef);
	}

	const photoRef = `${v.name}'s photo`;
	const photoItem = items.find((p) => p.name === photoRef);
	if (!photoItem) {
		throw new Error('Missing photo for ' + v.name);
	}

	const photoItemTr = itemsTranslations.find((tr) => tr.ref === photoRef);
	if (!photoItemTr) {
		throw new Error('Missing translation for ' + photoRef);
	}

	const localize = (localization: TranslationItem, forceAll: boolean = false): string | TranslationCleaned => {
		if (locale && !forceAll) {
			return localization.localization[locale.replace('-', '_')];
		}
		return {
			'en-US': localization.localization['en_US'],
			'en-GB': localization.localization['en_GB'],
			'de-DE': localization.localization['de_DE'],
			'es-ES': localization.localization['es_ES'],
			'es-US': localization.localization['es_US'],
			'fr-FR': localization.localization['fr_FR'],
			'fr-CA': localization.localization['fr_CA'],
			'it-IT': localization.localization['it_IT'],
			'nl-NL': localization.localization['nl_NL'],
			'zh-CN': localization.localization['zh_CN'],
			'zh-TW': localization.localization['zh_TW'],
			'ja-JP': localization.localization['ja_JP'],
			'ko-KR': localization.localization['ko_KR'],
			'ru-RU': localization.localization['ru_RU'],
		};
	};
	return {
		id,
		name: localize(nameTr),
		// allNames: locale ? (localize(nameTr, true) as TranslationCleaned) : undefined,
		iconImage: v.iconImage,
		houseImage: v.houseImage,
		species: v.species,
		gender: v.gender,
		personality: v.personality,
		hobby: v.hobby,
		birthday: v.birthday,
		zodiacSign: original.starsign as ZodiacSign,
		catchphrase: localize(catchPhraseTr),
		favoriteSong: {
			image: favoriteSong.variants[0].albumImage,
			name: localize(favoriteSongTr),
		},
		poster: {
			image: posterItem.variants[0].image,
			name: localize(posterItemTr),
		},
		photo: {
			image: photoItem.variants[1].image,
			name: localize(photoItemTr),
		},
	};
};

const langs: (keyof TranslationCleaned)[] = [
	'en-US',
	'en-GB',
	'de-DE',
	'es-ES',
	'es-US',
	'fr-FR',
	'fr-CA',
	'it-IT',
	'nl-NL',
	'zh-CN',
	'zh-TW',
	'ja-JP',
	'ko-KR',
	'ru-RU',
];

// const all = langs.map((lang) => villagers.map((v) => renderOneVillager(v, lang)));
langs.forEach((locale) => {
	const finalObj = {};
	villagers.forEach((v) => {
		const rendered = renderOneVillager(v, locale);
		finalObj[rendered.id] = rendered;
	});
	logToFile(path.join(__dirname, '../data/localized/'), `${locale}.json`)(finalObj);
});

const finalObj = {};
villagers.forEach((v) => {
	const rendered = renderOneVillager(v);
	finalObj[rendered.id] = rendered;
});
logToFile(path.join(__dirname, '../data/'), `tutut.json`)(finalObj);
// console.log(all.map((a) => a[0]));
