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
	const {currentInhabitants} = React.useContext(CurrentInhabitantsContext);
	const {pastInhabitants} = React.useContext(PastInhabitantsContext);
	const {pastCampers} = React.useContext(PastCampersContext);

	return (
		<div className="p-4">
			<h2 className="text-green-900 font-bold text-4xl p-8 bg-green-500 text-center rounded-lg">Current Inhabitants</h2>
			<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
				{currentInhabitants.map((inhabitantId) => (
					<LoadedVillagerCard key={inhabitantId} villagerId={inhabitantId} />
				))}
			</ul>
			<h2 className="text-green-900 font-bold text-4xl p-8 bg-green-500 text-center rounded-lg">Past Inhabitants</h2>
			<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
				{pastInhabitants.map((pastInhabitantId) => (
					<LoadedVillagerCard key={pastInhabitantId} villagerId={pastInhabitantId} />
				))}
			</ul>
			<h2 className="text-green-900 font-bold text-4xl p-8 bg-green-500 text-center rounded-lg">Past Campers</h2>
			<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
				{pastCampers.map((pastCamperId) => (
					<LoadedVillagerCard key={pastCamperId} villagerId={pastCamperId} />
				))}
			</ul>
		</div>
	);
};

export default MyVillagers;
