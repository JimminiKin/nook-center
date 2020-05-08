import React from 'react';

import {unique} from '@modules/utils';
import useLocalStorage from '@hooks/useLocalStorage';

export interface PastInhabitantsContextType {
	pastInhabitants: string[];
	addPastInhabitant: (pastInhabitantId: string) => void;
	removePastInhabitant: (pastInhabitantId: string) => void;
	emptyPastInhabitantList: () => void;
	resetPastInhabitantListToDefault: () => void;
}

export const PastInhabitantsContext = React.createContext<PastInhabitantsContextType>({
	pastInhabitants: [],
	addPastInhabitant: (pastInhabitantId) => {},
	removePastInhabitant: (pastInhabitantId) => {},
	emptyPastInhabitantList: () => {},
	resetPastInhabitantListToDefault: () => {},
});

const PastInhabitantsProvider: React.FC = (props) => {
	const [pastInhabitants, setPastInhabitants, deletePastInhabitants] = useLocalStorage('pastInhabitants', [
		'Reneigh',
		'Louie',
		'Huck',
		'Chadder',
		'Alli',
		'Lyman',
		'Dizzy',
		'Maddie',
		'Snooty',
	]);

	const addPastInhabitant: PastInhabitantsContextType['addPastInhabitant'] = (villagerId) => {
		setPastInhabitants(unique(pastInhabitants.concat([villagerId])));
	};

	const removePastInhabitant: PastInhabitantsContextType['removePastInhabitant'] = (villagerId) => {
		setPastInhabitants(pastInhabitants.filter((a) => a !== villagerId));
	};

	const emptyPastInhabitantList: PastInhabitantsContextType['emptyPastInhabitantList'] = () => {
		setPastInhabitants([]);
	};

	const resetPastInhabitantListToDefault: PastInhabitantsContextType['resetPastInhabitantListToDefault'] = () => {
		deletePastInhabitants();
	};

	return (
		<PastInhabitantsContext.Provider
			value={{
				pastInhabitants,
				addPastInhabitant,
				removePastInhabitant,
				emptyPastInhabitantList,
				resetPastInhabitantListToDefault,
			}}
		>
			{props.children}
		</PastInhabitantsContext.Provider>
	);
};

export default PastInhabitantsProvider;
