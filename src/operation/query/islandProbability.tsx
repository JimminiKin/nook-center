import * as Types from '../../generated/common/graphql';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type IslandProbabilityQueryVariables = {
	villagerId: Types.Scalars['ID'];
	villageState?: Types.Maybe<Types.VillageStateInput>;
};

export type IslandProbabilityQuery = {__typename: 'Query'} & {
	villager?: Types.Maybe<{__typename: 'Villager'} & Pick<Types.Villager, 'id' | 'islandProbability'>>;
};

export const IslandProbabilityDocument = gql`
	query islandProbability($villagerId: ID!, $villageState: VillageStateInput) {
		villager(villagerId: $villagerId) {
			id
			islandProbability(villageState: $villageState)
		}
	}
`;

/**
 * __useIslandProbabilityQuery__
 *
 * To run a query within a React component, call `useIslandProbabilityQuery` and pass it any options that fit your needs.
 * When your component renders, `useIslandProbabilityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIslandProbabilityQuery({
 *   variables: {
 *      villagerId: // value for 'villagerId'
 *      villageState: // value for 'villageState'
 *   },
 * });
 */
export function useIslandProbabilityQuery(
	baseOptions?: ApolloReactHooks.QueryHookOptions<IslandProbabilityQuery, IslandProbabilityQueryVariables>,
) {
	return ApolloReactHooks.useQuery<IslandProbabilityQuery, IslandProbabilityQueryVariables>(
		IslandProbabilityDocument,
		baseOptions,
	);
}
export function useIslandProbabilityLazyQuery(
	baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IslandProbabilityQuery, IslandProbabilityQueryVariables>,
) {
	return ApolloReactHooks.useLazyQuery<IslandProbabilityQuery, IslandProbabilityQueryVariables>(
		IslandProbabilityDocument,
		baseOptions,
	);
}
export type IslandProbabilityQueryHookResult = ReturnType<typeof useIslandProbabilityQuery>;
export type IslandProbabilityLazyQueryHookResult = ReturnType<typeof useIslandProbabilityLazyQuery>;
export type IslandProbabilityQueryResult = ApolloReactCommon.QueryResult<
	IslandProbabilityQuery,
	IslandProbabilityQueryVariables
>;
