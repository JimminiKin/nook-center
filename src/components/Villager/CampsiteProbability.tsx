import React from 'react';
import {VillageStateInput} from '@gen/common/graphql';
import {useCampsiteProbabilityQuery} from '@query/campsiteProbability';

import {CurrentInhabitantsContext} from '@components/contexts/CurrentInhabitantsContext';
import {PastInhabitantsContext} from '@components/contexts/PastInhabitantsContext';
import {PastCampersContext} from '@components/contexts/PastCampersContext';

const CampsiteProbability: React.FC<{
	villagerId: string;
}> = ({villagerId}) => {
	const {currentInhabitants} = React.useContext(CurrentInhabitantsContext);
	const {pastInhabitants} = React.useContext(PastInhabitantsContext);
	const {pastCampers} = React.useContext(PastCampersContext);

	let villageState: VillageStateInput = {
		currentVillagers: currentInhabitants,
		pastVillagers: pastInhabitants,
		pastCampers,
	};

	const {loading, error, data} = useCampsiteProbabilityQuery({
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
				<span className="mr-1 text-lg">⛺</span>
				<span className="text-sm">{(data.villager.campsiteProbability * 100).toFixed(2)}%</span>
			</span>
			<span className="tooltip-text bg-green-200 rounded -ml-8 -mt-6">
				<span>Probability of spawn in campsite</span>
			</span>
		</span>
	);
};

export default CampsiteProbability;
