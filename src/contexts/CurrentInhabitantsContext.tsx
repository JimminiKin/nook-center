import React from 'react';

import {unique} from '@modules/utils';

import useLocalStorage from '@hooks/useLocalStorage';

export interface CurrentInhabitantsContextType {
	currentInhabitants: string[];
	addCurrentInhabitant: (currentInhabitantId: string) => void;
	removeCurrentInhabitant: (currentInhabitantId: string) => void;
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
