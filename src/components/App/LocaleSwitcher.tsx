import React from 'react';
import {useRouter} from 'next/router';
import {locales, languageNames, languageEmojis, localeSlugToFullLocale} from '../../translations/config';
import {LocaleContext} from '../../contexts/LocaleContext';

const LocaleSwitcher: React.FC = () => {
	const router = useRouter();
	const {locale} = React.useContext(LocaleContext);

	const handleLocaleChange = React.useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			router.push(router.pathname, router.asPath.replace(locale, `${e.target.value}`));
		},
		[router, locale],
	);

	return (
		<select
			value={locale}
			onChange={handleLocaleChange}
			aria-label="Select language"
			className="bg-transparent mx-4 p-2 text-xl"
		>
			{locales.map((locale) => (
				<option key={locale} value={locale} aria-label={languageNames[locale]} className="bg-green-700">
					{localeSlugToFullLocale[locale]} {languageEmojis[locale]}
				</option>
			))}
		</select>
	);
};

export default LocaleSwitcher;
