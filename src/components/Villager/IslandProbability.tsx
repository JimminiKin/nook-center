import React from 'react';

import {CurrentInhabitantsContext} from '@contexts/CurrentInhabitantsContext';
import {Species, FullVillager} from '@src/types';
import useTranslation from '@hooks/useTranslation';

const nTotalSpecies = Object.keys(Species).length;

const CampsiteProbability: React.FC<{
	villagerId: string;
	villagers: {[key: string]: FullVillager};
}> = ({villagerId, villagers}) => {
	const {currentInhabitants} = React.useContext(CurrentInhabitantsContext);
	const {t} = useTranslation();

	const ratio = React.useMemo(() => {
		if (currentInhabitants.includes(villagerId)) {
			return 0;
		}

		const allVillagers = Object.values(villagers);
		let sameSpeciesCount = 0;

		for (let i = 0; i < allVillagers.length; i++) {
			const villager = allVillagers[i];
			if (currentInhabitants.includes(villager.id)) {
				continue;
			}
			if (villagers[villager.id].species === villagers[villagerId].species) {
				sameSpeciesCount++;
			}
		}

		return (((1 / nTotalSpecies) * 1) / sameSpeciesCount) * 100;
	}, [villagerId, currentInhabitants]);

	return (
		<span className="tooltip">
			<span className="whitespace-no-wrap">
				<span className="mr-1 text-xl">🏝</span>
				{ratio.toFixed(2)}%
			</span>
			<span className="tooltip-text bg-green-200 rounded -ml-8 -mt-6">
				{t('Probability of spawn in on random island')}
			</span>
		</span>
	);
};

export default CampsiteProbability;
