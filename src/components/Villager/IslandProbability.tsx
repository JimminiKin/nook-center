import React from 'react';
import {VillageStateInput} from '@gen/common/graphql';
import {useIslandProbabilityQuery} from '@query/islandProbability';

import {CurrentInhabitantsContext} from '@components/contexts/CurrentInhabitantsContext';

const CampsiteProbability: React.FC<{
	villagerId: string;
}> = ({villagerId}) => {
	const {currentInhabitants} = React.useContext(CurrentInhabitantsContext);

	let villageState: VillageStateInput = {
		currentVillagers: currentInhabitants,
		pastVillagers: [],
		pastCampers: [],
	};

	const {loading, error, data} = useIslandProbabilityQuery({
		variables: {
			villagerId,
			villageState,
		},
	});

	if (error) {
		throw error;
	}

	if (loading) {
		return <span>...</span>;
	}

	return (
		<span className="tooltip">
			<span className="whitespace-no-wrap">
				<span className="mr-1">🏝</span>
				<span className="text-sm">{(data.villager.islandProbability * 100).toFixed(2)}%</span>
			</span>
			<span className="tooltip-text bg-green-200 rounded -ml-8 -mt-6">
				<span>Probability of spawn in on random island</span>
			</span>
		</span>
	);
};

export default CampsiteProbability;
