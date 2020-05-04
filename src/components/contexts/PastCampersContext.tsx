import React from 'react';
import {Scalars} from '@gen/common/graphql';

import {unique} from '@modules/utils';
import useLocalStorage from '@components/hooks/useLocalStorage';

export interface PastCampersContextType {
	pastCampers: Scalars['ID'][];
	addPastCamper: (pastCamperId: Scalars['ID']) => void;
	removePastCamper: (pastCamperId: Scalars['ID']) => void;
	emptyPastCamperList: () => void;
	resetPastCamperListToDefault: () => void;
}

export const PastCampersContext = React.createContext<PastCampersContextType>({
	pastCampers: [],
	addPastCamper: (pastCamperId) => {},
	removePastCamper: (pastCamperId) => {},
	emptyPastCamperList: () => {},
	resetPastCamperListToDefault: () => {},
});

const PastCampersProvider: React.FC = (props) => {
	const [pastCampers, setPastCampers, deletePastCampers] = useLocalStorage('pastCampers', [
		'Tank',
		'Olaf',
		'Frank',
		'Ken',
		'Bubbles',
		'Cally',
		'Lionel',
		'Leopold',
		'Lopez',
		'Shep',
		'Klaus',
		'Chops',
		'Clay',
		'Iggly',
		'Boomer',
		'Hans',
		'Pudge',
		'Henry',
		'Graham',
		'Marshal',
		'Rodney',
		'Dobie',
		'Keaton',
		'Cousteau',
		'Quillson',
		'Kidd',
		'Deli',
		'Colton',
		'Eugene',
		'Sylvana',
		'Zell',
		'Olive',
		'Beardo',
		'Camofrog',
		'Julian',
	]);

	const addPastCamper: PastCampersContextType['addPastCamper'] = (villagerId) => {
		setPastCampers(unique(pastCampers.concat([villagerId])));
	};

	const removePastCamper: PastCampersContextType['removePastCamper'] = (villagerId) => {
		setPastCampers(pastCampers.filter((a) => a !== villagerId));
	};

	const emptyPastCamperList: PastCampersContextType['emptyPastCamperList'] = () => {
		setPastCampers([]);
	};
	const resetPastCamperListToDefault: PastCampersContextType['resetPastCamperListToDefault'] = () => {
		deletePastCampers();
	};

	return (
		<PastCampersContext.Provider
			value={{pastCampers, addPastCamper, removePastCamper, emptyPastCamperList, resetPastCamperListToDefault}}
		>
			{props.children}
		</PastCampersContext.Provider>
	);
};

export default PastCampersProvider;
