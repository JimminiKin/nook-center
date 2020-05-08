import {Gender, Hobby, Personality} from '@nooksbazaar/acdb/villagers';
export {Gender, Hobby, Personality} from '@nooksbazaar/acdb/villagers';

export enum ZodiacSign {
	Aquarius = 'Aquarius',
	Pisces = 'Pisces',
	Aries = 'Aries',
	Taurus = 'Taurus',
	Gemini = 'Gemini',
	Cancer = 'Cancer',
	Virgo = 'Virgo',
	Libra = 'Libra',
	Scorpio = 'Scorpio',
	Sagittarius = 'Sagittarius',
	Capricorn = 'Capricorn',
	Leo = 'Leo',
}

export enum Species {
	Alligator = 'Alligator',
	Anteater = 'Anteater',
	Bear = 'Bear',
	Bird = 'Bird',
	Bull = 'Bull',
	Cat = 'Cat',
	Chicken = 'Chicken',
	Cow = 'Cow',
	Cub = 'Cub',
	Deer = 'Deer',
	Dog = 'Dog',
	Duck = 'Duck',
	Eagle = 'Eagle',
	Elephant = 'Elephant',
	Frog = 'Frog',
	Goat = 'Goat',
	Gorilla = 'Gorilla',
	Hamster = 'Hamster',
	Hippo = 'Hippo',
	Kangaroo = 'Kangaroo',
	Koala = 'Koala',
	Lion = 'Lion',
	Monkey = 'Monkey',
	Mouse = 'Mouse',
	Octopus = 'Octopus',
	Ostrich = 'Ostrich',
	Penguin = 'Penguin',
	Rabbit = 'Rabbit',
	Rhino = 'Rhino',
	Sheep = 'Sheep',
	Pig = 'Pig',
	Squirrel = 'Squirrel',
	Wolf = 'Wolf',
	Horse = 'Horse',
	Tiger = 'Tiger',
}

export interface TranslationCleaned {
	'en-US': string;
	'en-GB': string;
	'de-DE': string;
	'es-ES': string;
	'es-US': string;
	'fr-FR': string;
	'fr-CA': string;
	'it-IT': string;
	'nl-NL': string;
	'zh-CN': string;
	'zh-TW': string;
	'ja-JP': string;
	'ko-KR': string;
	'ru-RU': string;
}

export interface FullVillager {
	id: string;
	name: TranslationCleaned | string;
	allNames?: TranslationCleaned;
	iconImage: string;
	houseImage: string;
	species: string;
	gender: Gender;
	personality: Personality;
	hobby: Hobby;
	birthday: string;
	zodiacSign: ZodiacSign;
	catchphrase: TranslationCleaned | string;
	favoriteSong: {
		image: string;
		name: TranslationCleaned | string;
	};
	poster: {
		image: string;
		name: TranslationCleaned | string;
	};
	photo: {
		image: string;
		name: TranslationCleaned | string;
	};
}

export interface TranslatedFullVillager {
	id: string;
	name: string;
	allNames?: TranslationCleaned;
	iconImage: string;
	houseImage: string;
	species: Species;
	gender: Gender;
	personality: Personality;
	hobby: Hobby;
	birthday: string;
	zodiacSign: ZodiacSign;
	catchphrase: string;
	favoriteSong: {
		image: string;
		name: string;
	};
	poster: {
		image: string;
		name: string;
	};
	photo: {
		image: string;
		name: string;
	};
}
