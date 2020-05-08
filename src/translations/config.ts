export const defaultLocale: typeof locales[number] = 'en-us' as const;

export const locales = [
	'de',
	'en-gb',
	'en-us',
	'es',
	'es-us',
	'fr',
	'fr-ca',
	'it',
	'ja',
	'ko',
	'nl',
	'ru',
	'zh-cn',
	'zh-tw',
] as const;

export const languageNames: Record<typeof locales[number], string> = {
	de: 'Deutsch',
	'en-gb': 'English (Europe)',
	'en-us': 'English (United States)',
	es: 'español',
	'es-us': 'español (Estados Unidos)',
	fr: 'français',
	'fr-ca': 'français (Canada)',
	it: 'italiano',
	ja: '日本語',
	ko: '한국어',
	nl: 'Nederlands',
	ru: 'русский',
	'zh-cn': '中文（中国）',
	'zh-tw': '中文（台灣）',
};

export const localeSlugToFullLocale: Record<typeof locales[number], string> = {
	de: 'de-DE',
	'en-gb': 'en-GB',
	'en-us': 'en-US',
	'es-us': 'es-US',
	es: 'es-ES',
	'fr-ca': 'fr-CA',
	fr: 'fr-FR',
	it: 'it-IT',
	ja: 'ja-JP',
	ko: 'ko-KR',
	nl: 'nl-NL',
	ru: 'ru-RU',
	'zh-cn': 'zh-CN',
	'zh-tw': 'zh-TW',
};

export const languageEmojis: Record<typeof locales[number], string> = {
	de: '🇩🇪',
	'en-gb': '🇬🇧',
	'en-us': '🇺🇸',
	es: '🇪🇸',
	'es-us': 'es 🇺🇸',
	fr: '🇫🇷',
	'fr-ca': '🇨🇦',
	it: '🇮🇹',
	ja: '🇯🇵',
	ko: '🇰🇷',
	nl: '🇳🇱',
	ru: '🇷🇺',
	'zh-cn': '🇨🇳',
	'zh-tw': '🇹🇼',
};
