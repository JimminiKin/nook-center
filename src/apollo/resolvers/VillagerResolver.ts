import {Resolvers} from '@gen/server/graphql';

import {createConnectionFromFullNodeEdgeList} from '@apollo/resolvers/Common';
import {Species, Personality} from '@gen/common/graphql';

import data from '@data/villagers.json';
import imagesThumb from '../images/thumb';
import imagesMedium from '../images/medium';
import imagesFull from '../images/full';

const getAllIds = () => {
	return data.map((villager) => villager.id);
};

const getOne = (key: string) => {
	return data.find((elm) => elm.id === key);
};

import {getStarSign, getGender, getPersonality, getSpecies} from '@apollo/resolvers/utils';

const VillagerResolver: Resolvers<any> = {
	Query: {
		villager(_, {villagerId}) {
			return {id: villagerId, __typename: 'Villager'};
		},
		villagers(_, {search, start, after}) {
			const ids = getAllIds();

			const results = ids
				.map(getOne)
				.filter((villager) => {
					let keep = true;

					if (!search) {
						return true;
					}

					if (search.text) {
						if (
							villager.name.toUpperCase().includes(search.text.toUpperCase()) ||
							villager.translations.french.toUpperCase().includes(search.text.toUpperCase())
						) {
							keep = keep && true;
						} else {
							return false;
						}
					}

					if (search.gender) {
						if (search.gender === getGender(villager.gender)) {
							keep = keep && true;
						} else {
							return false;
						}
					}

					if (search.personality) {
						if (search.personality === getPersonality(villager.personality)) {
							keep = keep && true;
						} else {
							return false;
						}
					}

					if (search.species) {
						if (search.species === getSpecies(villager.species)) {
							keep = keep && true;
						} else {
							return false;
						}
					}

					if (search.starSign) {
						if (search.starSign === getStarSign(villager.starsign)) {
							keep = keep && true;
						} else {
							return false;
						}
					}
					return keep;
				})
				.map((res) => ({
					id: res.id,
				}));

			return createConnectionFromFullNodeEdgeList(results, start, after);
		},
	},
	Villager: {
		name(parent) {
			return getOne(parent.id).name;
		},

		gender(parent) {
			const gender = getGender(getOne(parent.id).gender);
			if (gender === null) {
				throw new Error('Invalid Or Missing Villager Gender');
			}
			return gender;
		},

		personality(parent) {
			const personality = getPersonality(getOne(parent.id).personality);
			if (personality === null) {
				throw new Error('Invalid Or Missing Villager Personality');
			}
			return personality;
		},

		species(parent) {
			const species = getSpecies(getOne(parent.id).species);
			if (species === null) {
				throw new Error('Invalid Or Missing Villager Species');
			}
			return species;
		},

		starSign(parent) {
			const starSign = getStarSign(getOne(parent.id).starsign);
			if (starSign === null) {
				throw new Error('Invalid Or Missing Villager Star Sign');
			}
			return starSign;
		},

		saying(parent) {
			return getOne(parent.id).saying;
		},

		description(parent) {
			return getOne(parent.id).description;
		},

		translations(parent) {
			const villager = getOne(parent.id);
			return {...villager.translations, english: villager.name};
		},

		birthday(parent) {
			const baseBirthDay = getOne(parent.id).birthday;
			const dateObj = new Date(Date.UTC(1970, baseBirthDay.month, baseBirthDay.day));

			const value = dateObj.toLocaleString('en-US', {
				timeZone: 'UTC',
				month: 'short',
				day: 'numeric',
			});

			let dateletter = '';

			if (baseBirthDay.day > 3 && baseBirthDay.day < 21) dateletter = 'th';
			else if (baseBirthDay.day % 10 === 1) dateletter = 'st';
			else if (baseBirthDay.day % 10 === 2) dateletter = 'nd';
			else if (baseBirthDay.day % 10 === 3) dateletter = 'rd';
			else dateletter = 'th';

			return value + dateletter;
		},

		nookiPediaPage(parent) {
			return getOne(parent.id).nookiPediaPage;
		},

		picture(parent) {
			return {
				full: imagesFull[parent.id.toLowerCase()],
				thumb: imagesThumb[parent.id.toLowerCase()],
				medium: imagesMedium[parent.id.toLowerCase()],
			};
		},

		islandProbability(parent, args) {
			if (
				args.villageState &&
				args.villageState.currentVillagers &&
				args.villageState.currentVillagers.includes(parent.id)
			) {
				return 0;
			}

			const allVillagers = getAllIds();
			let sameSpeciesCount = 0;

			for (let i = 0; i < allVillagers.length; i++) {
				const villagerId = allVillagers[i];
				if (
					args.villageState &&
					args.villageState.currentVillagers &&
					args.villageState.currentVillagers.includes(villagerId)
				) {
					continue;
				}
				if (getOne(villagerId).species === getOne(parent.id).species) {
					sameSpeciesCount++;
				}
			}

			return ((1 / Object.keys(Species).length) * 1) / sameSpeciesCount;
		},

		campsiteProbability(parent, args) {
			if (!args.villageState) {
				return null;
			}

			const {currentVillagers, pastCampers, pastVillagers} = args.villageState;

			const currentVillagersPersonalityCount: Record<Personality, number> = {
				[Personality.Cranky]: 0,
				[Personality.Jock]: 0,
				[Personality.Lazy]: 0,
				[Personality.Normal]: 0,
				[Personality.Peppy]: 0,
				[Personality.Sisterly]: 0,
				[Personality.Smug]: 0,
				[Personality.Snooty]: 0,
			};

			const filteredVillagersPersonalityCount: Record<Personality, number> = {
				[Personality.Cranky]: 0,
				[Personality.Jock]: 0,
				[Personality.Lazy]: 0,
				[Personality.Normal]: 0,
				[Personality.Peppy]: 0,
				[Personality.Sisterly]: 0,
				[Personality.Smug]: 0,
				[Personality.Snooty]: 0,
			};

			for (let i = 0; i < currentVillagers.length; i++) {
				const villagerId = currentVillagers[i];
				currentVillagersPersonalityCount[getPersonality(getOne(villagerId).personality)]++;
			}

			const allVillagers = getAllIds();

			for (let i = 0; i < allVillagers.length; i++) {
				const villagerId = allVillagers[i];
				if (
					!currentVillagers.includes(villagerId) &&
					!pastVillagers.includes(villagerId) &&
					!pastCampers.includes(villagerId)
				) {
					filteredVillagersPersonalityCount[getPersonality(getOne(villagerId).personality)]++;
				}
			}

			if (
				currentVillagers.includes(parent.id) ||
				pastVillagers.includes(parent.id) ||
				pastCampers.includes(parent.id)
			) {
				return 0;
			}

			const personality = getPersonality(getOne(parent.id).personality);

			const emptyPersonnalitiesInVillage = Object.values(Personality).filter((pers) => {
				return currentVillagersPersonalityCount[pers] === 0;
			});

			if (emptyPersonnalitiesInVillage.includes(personality)) {
				return 0.6 * (1 / emptyPersonnalitiesInVillage.length) * (1 / filteredVillagersPersonalityCount[personality]);
			}

			return 0.4 * (1 / (Object.keys(Personality).length - 1)) * (1 / filteredVillagersPersonalityCount[personality]);
		},
	},
};

export default VillagerResolver;
