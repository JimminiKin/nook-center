import {defaultLocale, locales} from './config';
import {Locale, isLocale} from './types';
import {lookup} from 'accept-language-negotiator';

export function getInitialLocale(): Locale {
	const localSetting = localStorage.getItem('locale');
	if (localSetting && isLocale(localSetting)) {
		return localSetting;
	}

	return lookup(navigator.languages.join(','), locales, defaultLocale);
}
