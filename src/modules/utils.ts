import {Gender, ZodiacSign} from '@src/types';

export const ucfirst = (value: string): string => {
	return value.charAt(0).toUpperCase() + value.toLowerCase().slice(1);
};

export const getGenderEmoji = (gender: Gender) => {
	switch (gender) {
		case Gender.Male:
			return '♂️';
		case Gender.Female:
			return '♀️';
		default:
			return '🤷';
	}
};

export const getZodiacEmoji = (zodiac: ZodiacSign) => {
	switch (zodiac) {
		case ZodiacSign.Aquarius:
			return '♒';
		case ZodiacSign.Aries:
			return '♈';
		case ZodiacSign.Cancer:
			return '♋';
		case ZodiacSign.Capricorn:
			return '♑';
		case ZodiacSign.Gemini:
			return '♊';
		case ZodiacSign.Leo:
			return '♌';
		case ZodiacSign.Libra:
			return '♎';
		case ZodiacSign.Pisces:
			return '♓';
		case ZodiacSign.Sagittarius:
			return '♐';
		case ZodiacSign.Scorpio:
			return '♏';
		case ZodiacSign.Taurus:
			return '♉';
		case ZodiacSign.Virgo:
			return '♍';
		default:
			return '🤷';
	}
};

export const unique = (array: string[]): string[] => {
	return [...new Set(array)];
};
