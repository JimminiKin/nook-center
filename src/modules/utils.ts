import {Gender, StarSign} from '@gen/common/graphql';

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

export const getZodiacEmoji = (zodiac: StarSign) => {
	switch (zodiac) {
		case StarSign.Aquarius:
			return '♒';
		case StarSign.Aries:
			return '♈';
		case StarSign.Cancer:
			return '♋';
		case StarSign.Capricorn:
			return '♑';
		case StarSign.Gemini:
			return '♊';
		case StarSign.Leo:
			return '♌';
		case StarSign.Libra:
			return '♎';
		case StarSign.Pisces:
			return '♓';
		case StarSign.Sagittarius:
			return '♐';
		case StarSign.Scorpio:
			return '♏';
		case StarSign.Taurus:
			return '♉';
		case StarSign.Virgo:
			return '♍';
		default:
			return '🤷';
	}
};
