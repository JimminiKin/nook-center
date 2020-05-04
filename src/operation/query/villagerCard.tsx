import * as Types from '../../generated/common/graphql';

import {VillagerCardFragment} from '../fragment/villagerCard';
import gql from 'graphql-tag';
import {VillagerCardFragmentDoc} from '../fragment/villagerCard';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type VillagerCardQueryVariables = {
	villagerId: Types.Scalars['ID'];
};

export type VillagerCardQuery = {__typename: 'Query'} & {
	villager?: Types.Maybe<{__typename: 'Villager'} & Pick<Types.Villager, 'id'> & VillagerCardFragment>;
};

export const VillagerCardDocument = gql`
	query villagerCard($villagerId: ID!) {
		villager(villagerId: $villagerId) {
			id
			...VillagerCard
		}
	}
	${VillagerCardFragmentDoc}
`;

/**
 * __useVillagerCardQuery__
 *
 * To run a query within a React component, call `useVillagerCardQuery` and pass it any options that fit your needs.
 * When your component renders, `useVillagerCardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVillagerCardQuery({
 *   variables: {
 *      villagerId: // value for 'villagerId'
 *   },
 * });
 */
export function useVillagerCardQuery(
	baseOptions?: ApolloReactHooks.QueryHookOptions<VillagerCardQuery, VillagerCardQueryVariables>,
) {
	return ApolloReactHooks.useQuery<VillagerCardQuery, VillagerCardQueryVariables>(VillagerCardDocument, baseOptions);
}
export function useVillagerCardLazyQuery(
	baseOptions?: ApolloReactHooks.LazyQueryHookOptions<VillagerCardQuery, VillagerCardQueryVariables>,
) {
	return ApolloReactHooks.useLazyQuery<VillagerCardQuery, VillagerCardQueryVariables>(
		VillagerCardDocument,
		baseOptions,
	);
}
export type VillagerCardQueryHookResult = ReturnType<typeof useVillagerCardQuery>;
export type VillagerCardLazyQueryHookResult = ReturnType<typeof useVillagerCardLazyQuery>;
export type VillagerCardQueryResult = ApolloReactCommon.QueryResult<VillagerCardQuery, VillagerCardQueryVariables>;
