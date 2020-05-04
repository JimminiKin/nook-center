import React from 'react';
import {VillageStateInput} from '@gen/common/graphql';
import {useCampsiteProbabilityQuery} from '@query/campsiteProbability';

import {CurrentInhabitantsContext} from '@components/contexts/CurrentInhabitantsContext';
import {PastInhabitantsContext} from '@components/contexts/PastInhabitantsContext';
import {PastCampersContext} from '@components/contexts/PastCampersContext';

const VillagerStateToggles: React.FC<{
	villagerId: string;
}> = ({villagerId}) => {
	const {currentInhabitants, addCurrentInhabitant, removeCurrentInhabitant} = React.useContext(
		CurrentInhabitantsContext,
	);
	const {pastInhabitants, addPastInhabitant, removePastInhabitant} = React.useContext(PastInhabitantsContext);
	const {pastCampers, addPastCamper, removePastCamper} = React.useContext(PastCampersContext);

	let villageState: VillageStateInput = {
		currentVillagers: currentInhabitants,
		pastVillagers: pastInhabitants,
		pastCampers,
	};

	const isPastCamper = pastCampers.includes(villagerId);
	const isPastInhabitant = pastInhabitants.includes(villagerId);
	const isCurrentInhabitant = currentInhabitants.includes(villagerId);

	return (
		<div className="flex justify-evenly p-2">
			{isPastCamper ? (
				<div className="tooltip m-2">
					<button
						type="button"
						className="whitespace-no-wrap bg-red-600 p-1 rounded"
						onClick={() => {
							removePastCamper(villagerId);
						}}
					>
						<span className="mr-1">⛺ ➖</span>
					</button>
					<span className="tooltip-text bg-green-200 rounded -ml-8 mt-8">
						<span>Unmark as past campsite visitors</span>
					</span>
				</div>
			) : (
				<div className="tooltip m-2">
					<button
						type="button"
						className="whitespace-no-wrap bg-green-600 p-1 rounded"
						onClick={() => {
							addPastCamper(villagerId);
						}}
					>
						<span className="mr-1">⛺ ➕</span>
					</button>
					<span className="tooltip-text bg-green-200 rounded -ml-8 mt-8">
						<span>Mark as past campsite visitors</span>
					</span>
				</div>
			)}
			{isPastInhabitant ? (
				<div className="tooltip m-2">
					<button
						type="button"
						className="whitespace-no-wrap bg-red-600 p-1 rounded"
						onClick={() => {
							removePastInhabitant(villagerId);
						}}
					>
						<span className="mr-1">📦 ➖</span>
					</button>
					<span className="tooltip-text bg-green-200 rounded -ml-8  mt-8">
						<span>Unmark as past island inhabitant</span>
					</span>
				</div>
			) : (
				<div className="tooltip m-2">
					<button
						type="button"
						className="whitespace-no-wrap bg-green-600 p-1 rounded"
						onClick={() => {
							addPastInhabitant(villagerId);
						}}
					>
						<span className="mr-1">📦 ➕</span>
					</button>
					<span className="tooltip-text bg-green-200 rounded -ml-8  mt-8">
						<span>Mark as past island inhabitant</span>
					</span>
				</div>
			)}
			{isCurrentInhabitant ? (
				<div className="tooltip m-2">
					<button
						type="button"
						className="whitespace-no-wrap bg-red-600 p-1 rounded"
						onClick={() => {
							removeCurrentInhabitant(villagerId);
						}}
					>
						<span className="mr-1">🏠 ➖</span>
					</button>
					<span className="tooltip-text bg-green-200 rounded -ml-8 mt-8">
						<span>Unmark as current island inhabitant</span>
					</span>
				</div>
			) : (
				<div className="tooltip m-2">
					<button
						type="button"
						className="whitespace-no-wrap bg-green-600 p-1 rounded"
						onClick={() => {
							addCurrentInhabitant(villagerId);
						}}
					>
						<span className="mr-1">🏠 ➕</span>
					</button>
					<span className="tooltip-text bg-green-200 rounded -ml-8 mt-8">
						<span>Mark as current island inhabitant</span>
					</span>
				</div>
			)}
		</div>
	);
};

export default VillagerStateToggles;
