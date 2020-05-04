import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import {NextPage} from 'next';
import Link from 'next/link';
import InfiniteScroller from 'react-infinite-scroller';

import {withApollo} from '@apollo/client';

import {ucfirst} from '@modules/utils';

import VillagerCard from '@components/Villager/VillagerCard';
import {useVillagerCardQuery, VillagerCardQuery} from '@query/villagerCard';

import {CurrentInhabitantsContext} from '@components/contexts/CurrentInhabitantsContext';
import {PastInhabitantsContext} from '@components/contexts/PastInhabitantsContext';
import {PastCampersContext} from '@components/contexts/PastCampersContext';
import useLocalStorage from '@components/hooks/useLocalStorage';

const LoadedVillagerCard: React.FC<{villagerId: string}> = ({villagerId}) => {
	const {loading, error, data} = useVillagerCardQuery({
		variables: {
			villagerId,
		},
	});

	if (error) {
		throw error;
	}

	if (loading) {
		return <li>Loading</li>;
	}

	return <VillagerCard villager={data.villager}></VillagerCard>;
};

const MyVillagers: React.FC = () => {
	const {currentInhabitants, emptyCurrentInhabitantList, resetCurrentInhabitantListToDefault} = React.useContext(
		CurrentInhabitantsContext,
	);
	const {pastInhabitants, emptyPastInhabitantList, resetPastInhabitantListToDefault} = React.useContext(
		PastInhabitantsContext,
	);
	const {pastCampers, emptyPastCamperList, resetPastCamperListToDefault} = React.useContext(PastCampersContext);

	return (
		<div className="p-4">
			<div className="flex justify-around p-4">
				<div>
					<button
						className="inline-block bg-green-900 text-gray-100 p-2 px-3 rounded"
						onClick={() => {
							emptyCurrentInhabitantList();
							emptyPastInhabitantList();
							emptyPastCamperList();
						}}
					>
						Remove Current Data
					</button>
				</div>
				<div>
					<button
						className="inline-block bg-green-900 text-gray-100 p-2 px-3 rounded"
						onClick={() => {
							resetCurrentInhabitantListToDefault();
							resetPastInhabitantListToDefault();
							resetPastCamperListToDefault();
						}}
					>
						Restore Demo Data
					</button>
				</div>
			</div>
			<h2 className="text-green-900 font-bold text-4xl p-8 bg-green-500 text-center rounded-lg my-6">
				Current Inhabitants
			</h2>
			{currentInhabitants.length ? (
				<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
					{currentInhabitants.map((inhabitantId) => (
						<LoadedVillagerCard key={inhabitantId} villagerId={inhabitantId} />
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
				<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
					{pastInhabitants.map((pastInhabitantId) => (
						<LoadedVillagerCard key={pastInhabitantId} villagerId={pastInhabitantId} />
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
				<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
					{pastCampers.map((pastCamperId) => (
						<LoadedVillagerCard key={pastCamperId} villagerId={pastCamperId} />
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
