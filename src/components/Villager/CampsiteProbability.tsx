import React from 'react';

import {CurrentInhabitantsContext} from '@contexts/CurrentInhabitantsContext';
import {PastInhabitantsContext} from '@contexts/PastInhabitantsContext';
import {PastCampersContext} from '@contexts/PastCampersContext';
import {Personality, FullVillager} from '@src/types';
import useTranslation from '@hooks/useTranslation';

const CampsiteProbability: React.FC<{
	villagerId: string;
	villagers: {[key: string]: FullVillager};
}> = ({villagerId, villagers}) => {
	const {currentInhabitants} = React.useContext(CurrentInhabitantsContext);
	const {pastInhabitants} = React.useContext(PastInhabitantsContext);
	const {pastCampers} = React.useContext(PastCampersContext);
	const {t} = useTranslation();

	const ratio = React.useMemo(() => {
		const currentInhabitantsPersonalityCount: Record<Personality, number> = {
			[Personality.Cranky]: 0,
			[Personality.Jock]: 0,
			[Personality.Lazy]: 0,
			[Personality.Normal]: 0,
			[Personality.Peppy]: 0,
			[Personality.BigSister]: 0,
			[Personality.Smug]: 0,
			[Personality.Snooty]: 0,
		};

		const filteredVillagersPersonalityCount: Record<Personality, number> = {
			[Personality.Cranky]: 0,
			[Personality.Jock]: 0,
			[Personality.Lazy]: 0,
			[Personality.Normal]: 0,
			[Personality.Peppy]: 0,
			[Personality.BigSister]: 0,
			[Personality.Smug]: 0,
			[Personality.Snooty]: 0,
		};

		for (let i = 0; i < currentInhabitants.length; i++) {
			const villagerId = currentInhabitants[i];
			currentInhabitantsPersonalityCount[villagers[villagerId].personality]++;
		}

		const allVillagers = Object.values(villagers);

		for (let i = 0; i < allVillagers.length; i++) {
			const v = allVillagers[i];
			if (!currentInhabitants.includes(v.id) && !pastInhabitants.includes(v.id) && !pastCampers.includes(v.id)) {
				filteredVillagersPersonalityCount[villagers[v.id].personality]++;
			}
		}

		if (
			currentInhabitants.includes(villagerId) ||
			pastInhabitants.includes(villagerId) ||
			pastCampers.includes(villagerId)
		) {
			return 0;
		}

		const personality = villagers[villagerId].personality;

		const emptyPersonnalitiesInVillage = Object.values(Personality).filter((pers) => {
			return currentInhabitantsPersonalityCount[pers] === 0;
		});

		if (emptyPersonnalitiesInVillage.includes(personality)) {
			return 0.6 * (1 / emptyPersonnalitiesInVillage.length) * (1 / filteredVillagersPersonalityCount[personality]);
		}

		return 0.4 * (1 / (Object.keys(Personality).length - 1)) * (1 / filteredVillagersPersonalityCount[personality]);
	}, [villagerId, currentInhabitants, pastInhabitants, pastCampers]);

	return (
		<span className="tooltip">
			<span className="whitespace-no-wrap">
				<span className="mr-1 text-xl">⛺</span>
				{(ratio * 100).toFixed(2)}%
			</span>
			<span className="tooltip-text bg-green-200 rounded -ml-8 -mt-6">{t('Probability of spawn in campsite')}</span>
		</span>
	);
};

export default CampsiteProbability;
