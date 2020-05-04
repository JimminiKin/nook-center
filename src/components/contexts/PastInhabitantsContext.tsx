import React from 'react';
import {Scalars} from '@gen/common/graphql';

import {unique} from '@modules/utils';
import useLocalStorage from '@components/hooks/useLocalStorage';

export interface PastInhabitantsContextType {
	pastInhabitants: Scalars['ID'][];
	addPastInhabitant: (pastInhabitantId: Scalars['ID']) => void;
	removePastInhabitant: (pastInhabitantId: Scalars['ID']) => void;
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

const InhabitantsProvider: React.FC = (props) => {
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

export default InhabitantsProvider;
