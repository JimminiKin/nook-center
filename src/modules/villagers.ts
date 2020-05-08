import {FullVillager} from '@src/types';

export const getAllData = async (): Promise<{[key: string]: FullVillager}> => {
	return (await import('@data/tutut.json')).default as {[key: string]: FullVillager};
};

export const getByLang = async (lang: string): Promise<{[key: string]: FullVillager}> => {
	return (await import(`@data/localized/${lang}.json`)).default as {[key: string]: FullVillager};
};
