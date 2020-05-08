import React from 'react';
import Link from 'next/link';

import VillagerCard from '@components/Villager/VillagerCard';

import {CurrentInhabitantsContext} from '@contexts/CurrentInhabitantsContext';
import {PastInhabitantsContext} from '@contexts/PastInhabitantsContext';
import {PastCampersContext} from '@contexts/PastCampersContext';
import {FullVillager} from '@src/types';

const MyVillagers: React.FC<{
	villagers: {[key: string]: FullVillager};
}> = ({villagers}) => {
	const {currentInhabitants, emptyCurrentInhabitantList, resetCurrentInhabitantListToDefault} = React.useContext(
		CurrentInhabitantsContext,
	);
	const {pastInhabitants, emptyPastInhabitantList, resetPastInhabitantListToDefault} = React.useContext(
		PastInhabitantsContext,
	);
	const {pastCampers, emptyPastCamperList, resetPastCamperListToDefault} = React.useContext(PastCampersContext);

	return (
		<div className="p-4">
			<div className="flex flex-wrap justify-evenly">
				<button
					className="block bg-green-900 text-gray-100 p-2 px-3 m-4 rounded"
					onClick={() => {
						emptyCurrentInhabitantList();
						emptyPastInhabitantList();
						emptyPastCamperList();
					}}
				>
					Remove Current Data
				</button>
				<button
					className="block bg-green-900 text-gray-100 p-2 px-3 m-4 rounded"
					onClick={() => {
						resetCurrentInhabitantListToDefault();
						resetPastInhabitantListToDefault();
						resetPastCamperListToDefault();
					}}
				>
					Restore Demo Data
				</button>
			</div>
			<h2 className="text-green-900 font-bold text-4xl p-8 bg-green-500 text-center rounded-lg my-6">
				Current Inhabitants
			</h2>
			{currentInhabitants.length ? (
				<ul className="flex flex-wrap justify-evenly p-4">
					{currentInhabitants.map((inhabitantId) => (
						<VillagerCard key={inhabitantId} villager={villagers[inhabitantId]} villagers={villagers} />
					))}
				</ul>
			) : (
				<p className="p-4 text-xl">
					You have no recorded current villager. To add some,{' '}
					<Link href="/villagers">
						<a className="font-bold">search for your villagers</a>
					</Link>{' '}
					and click on the <span className="whitespace-no-wrap bg-green-600 p-1 rounded">🏠 ➕</span> icon in the
					villager card.
				</p>
			)}
			<h2 className="text-green-900 font-bold text-4xl p-8 bg-green-500 text-center rounded-lg my-6">
				Past Inhabitants
			</h2>

			{currentInhabitants.length ? (
				<ul className="flex flex-wrap justify-evenly p-4">
					{pastInhabitants.map((pastInhabitantId) => (
						<VillagerCard key={pastInhabitantId} villager={villagers[pastInhabitantId]} villagers={villagers} />
					))}
				</ul>
			) : (
				<p className="p-4 text-xl">
					You have no recorded past villager. To add some,{' '}
					<Link href="/villagers">
						<a className="font-bold">search for your past villagers</a>
					</Link>{' '}
					and click on the <span className="whitespace-no-wrap bg-green-600 p-1 rounded">🏠 ➕</span> icon in the
					villager card.
				</p>
			)}

			<h2 className="text-green-900 font-bold text-4xl p-8 bg-green-500 text-center rounded-lg my-6">Past Campers</h2>

			{currentInhabitants.length ? (
				<ul className="flex flex-wrap justify-evenly p-4">
					{pastCampers.map((pastCamperId) => (
						<VillagerCard key={pastCamperId} villager={villagers[pastCamperId]} villagers={villagers} />
					))}
				</ul>
			) : (
				<p className="p-4 text-xl">
					You have no recorded campsite visitors. To add some,{' '}
					<Link href="/villagers">
						<a className="font-bold">search for your past campers</a>
					</Link>{' '}
					and click on the <span className="whitespace-no-wrap bg-green-600 p-1 rounded">🏠 ➕</span> icon in the
					villager card.
				</p>
			)}
		</div>
	);
};

export default MyVillagers;
