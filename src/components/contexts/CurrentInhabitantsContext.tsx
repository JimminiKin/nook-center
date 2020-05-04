import React from 'react';
import {Scalars} from '@gen/common/graphql';

import {unique} from '@modules/utils';

import useLocalStorage from '@components/hooks/useLocalStorage';

export interface CurrentInhabitantsContextType {
	currentInhabitants: Scalars['ID'][];
	addCurrentInhabitant: (currentInhabitantId: Scalars['ID']) => void;
	removeCurrentInhabitant: (currentInhabitantId: Scalars['ID']) => void;
	emptyCurrentInhabitantList: () => void;
	resetCurrentInhabitantListToDefault: () => void;
}

export const CurrentInhabitantsContext = React.createContext<CurrentInhabitantsContextType>({
	currentInhabitants: [],
	addCurrentInhabitant: (currentInhabitantId) => {},
	removeCurrentInhabitant: (currentInhabitantId) => {},
	emptyCurrentInhabitantList: () => {},
	resetCurrentInhabitantListToDefault: () => {},
});

const InhabitantsProvider: React.FC = (props) => {
	const [currentInhabitants, setInhabitants, deleteInhabitants] = useLocalStorage('currentInhabitants', [
		'Filbert',
		'Octavian',
		'Phoebe',
		'Flora',
		'Peck',
		'Fauna',
		'Tom',
		'Judy',
		'Marina',
		'Julian',
	]);

	const addCurrentInhabitant: CurrentInhabitantsContextType['addCurrentInhabitant'] = (villagerId) => {
		setInhabitants(unique(currentInhabitants.concat([villagerId])));
	};

	const removeCurrentInhabitant: CurrentInhabitantsContextType['removeCurrentInhabitant'] = (villagerId) => {
		setInhabitants(currentInhabitants.filter((a) => a !== villagerId));
	};

	const emptyCurrentInhabitantList: CurrentInhabitantsContextType['emptyCurrentInhabitantList'] = () => {
		setInhabitants([]);
	};

	const resetCurrentInhabitantListToDefault: CurrentInhabitantsContextType['resetCurrentInhabitantListToDefault'] = () => {
		deleteInhabitants();
	};

	return (
		<CurrentInhabitantsContext.Provider
			value={{
				currentInhabitants,
				addCurrentInhabitant,
				removeCurrentInhabitant,
				emptyCurrentInhabitantList,
				resetCurrentInhabitantListToDefault,
			}}
		>
			{props.children}
		</CurrentInhabitantsContext.Provider>
	);
};

export default InhabitantsProvider;
