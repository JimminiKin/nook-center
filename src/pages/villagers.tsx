import React from 'react';
import Head from 'next/head';
import {NextPage} from 'next';
import Link from 'next/link';
import InfiniteScroller from 'react-infinite-scroller';

import {withApollo, createApolloClient} from '@apollo/client';

import {ucfirst} from '@modules/utils';

import VillagerCard from '@components/Villager/VillagerCard';

import {useVillagersSearchQuery, VillagersSearchDocument} from '@query/villagersSearch';

import {Gender, Personality, StarSign, Species} from '@gen/common/graphql';

export const getStaticProps = async ({params}) => {
	const apolloClient = createApolloClient();
	await apolloClient.query({
		query: VillagersSearchDocument,
		variables: {
			start: 30,
			search: {
				gender: undefined,
				personality: undefined,
				species: undefined,
				starSign: undefined,
				text: undefined,
			},
		},
	});
	return {
		props: {
			apolloState: apolloClient.cache.extract(),
		},
	};
};

const VillagerIndex: NextPage = (props) => {
	const [gender, setGender] = React.useState<string>('');
	const [personality, setPersonality] = React.useState<string>('');
	const [species, setSpecies] = React.useState<string>('');
	const [starSign, setStarSign] = React.useState<string>('');
	const [searchText, setSearchText] = React.useState<string>('');

	const {loading, error, data, fetchMore} = useVillagersSearchQuery({
		variables: {
			start: 30,
			search: {
				gender: Gender[gender] || undefined,
				personality: Personality[personality] || undefined,
				species: Species[species] || undefined,
				starSign: StarSign[starSign] || undefined,
				text: searchText || undefined,
			},
		},
	});

	if (error) {
		throw error;
	}

	return (
		<>
			<Head>
				<title>Villager Search - Nook Center</title>
			</Head>
			<div className="p-4 lg:flex lg:justify-evenly">
				<input
					aria-label="Text Search"
					type="text"
					className="inline-block p-2 px-3 rounded m-4"
					value={searchText || ''}
					onChange={(event) => setSearchText(event.target.value)}
					placeholder="Text Search"
				/>

				<select
					aria-label="Select Gender"
					value={gender || ''}
					className="inline-block p-2 m-4 rounded"
					onChange={(event) => setGender(event.target.value)}
				>
					<option value="">Gender</option>
					{Object.keys(Gender).map((key) => {
						return (
							<option key={key} value={key}>
								{ucfirst(Gender[key])}
							</option>
						);
					})}
				</select>
				<select
					aria-label="Select Species"
					value={species || ''}
					className="inline-block p-2 m-4 rounded"
					onChange={(event) => setSpecies(event.target.value || '')}
				>
					<option value="">Species</option>
					{Object.keys(Species).map((key) => (
						<option key={key} value={key}>
							{ucfirst(Species[key])}
						</option>
					))}
				</select>
				<select
					aria-label="Select Star Sign"
					value={starSign || ''}
					className="inline-block p-2 m-4 rounded"
					onChange={(event) => setStarSign(event.target.value || '')}
				>
					<option value="">Star Sign</option>
					{Object.keys(StarSign).map((key) => (
						<option key={key} value={key}>
							{ucfirst(StarSign[key])}
						</option>
					))}
				</select>
				<select
					aria-label="Select Personality"
					value={personality || ''}
					className="inline-block p-2 m-4 rounded"
					onChange={(event) => setPersonality(event.target.value || '')}
				>
					<option value="">Personality</option>
					{Object.keys(Personality).map((key) => (
						<option key={key} value={key}>
							{ucfirst(Personality[key])}
						</option>
					))}
				</select>
				<button
					className="inline-block bg-green-900 text-gray-100 p-2 px-3 rounded m-4"
					onClick={() => {
						setGender(undefined);
						setPersonality(undefined);
						setSpecies(undefined);
						setStarSign(undefined);
						setSearchText(undefined);
					}}
				>
					Reset
				</button>
			</div>
			{loading ? (
				<main className="items-center flex justify-around p-56">
					<h4>Loading Page ...</h4>
				</main>
			) : (
				<InfiniteScroller
					element="ul"
					className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
					hasMore={data && data.villagers ? data.villagers.pageInfo.hasNextPage : false}
					loadMore={() => {
						fetchMore({
							variables: {
								after: data.villagers.pageInfo.endCursor,
							},
							updateQuery: (prev, {fetchMoreResult}) => {
								if (!fetchMoreResult) return prev;
								return {
									villagers: {
										edges: [...prev.villagers.edges, ...fetchMoreResult.villagers.edges],
										pageInfo: fetchMoreResult.villagers.pageInfo,
										__typename: prev.villagers.__typename,
									},
									__typename: prev.__typename,
								};
							},
						});
					}}
					loader={
						<li key="loader" className="items-center flex justify-center p-20">
							<h4>Loading More ...</h4>
						</li>
					}
				>
					{data.villagers.edges.map((edge) => {
						const {node: villager} = edge;
						return <VillagerCard key={villager.id} villager={villager} />;
					})}
				</InfiniteScroller>
			)}
		</>
	);
};

export default withApollo(VillagerIndex, {ssr: false});
