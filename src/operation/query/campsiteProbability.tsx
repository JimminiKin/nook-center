import * as Types from '../../generated/common/graphql';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type CampsiteProbabilityQueryVariables = {
	villagerId: Types.Scalars['ID'];
	villageState?: Types.Maybe<Types.VillageStateInput>;
};

export type CampsiteProbabilityQuery = {__typename: 'Query'} & {
	villager?: Types.Maybe<{__typename: 'Villager'} & Pick<Types.Villager, 'campsiteProbability'>>;
};

export const CampsiteProbabilityDocument = gql`
	query campsiteProbability($villagerId: ID!, $villageState: VillageStateInput) {
		villager(villagerId: $villagerId) {
			campsiteProbability(villageState: $villageState)
		}
	}
`;

/**
 * __useCampsiteProbabilityQuery__
 *
 * To run a query within a React component, call `useCampsiteProbabilityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampsiteProbabilityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampsiteProbabilityQuery({
 *   variables: {
 *      villagerId: // value for 'villagerId'
 *      villageState: // value for 'villageState'
 *   },
 * });
 */
export function useCampsiteProbabilityQuery(
	baseOptions?: ApolloReactHooks.QueryHookOptions<CampsiteProbabilityQuery, CampsiteProbabilityQueryVariables>,
) {
	return ApolloReactHooks.useQuery<CampsiteProbabilityQuery, CampsiteProbabilityQueryVariables>(
		CampsiteProbabilityDocument,
		baseOptions,
	);
}
export function useCampsiteProbabilityLazyQuery(
	baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CampsiteProbabilityQuery, CampsiteProbabilityQueryVariables>,
) {
	return ApolloReactHooks.useLazyQuery<CampsiteProbabilityQuery, CampsiteProbabilityQueryVariables>(
		CampsiteProbabilityDocument,
		baseOptions,
	);
}
export type CampsiteProbabilityQueryHookResult = ReturnType<typeof useCampsiteProbabilityQuery>;
export type CampsiteProbabilityLazyQueryHookResult = ReturnType<typeof useCampsiteProbabilityLazyQuery>;
export type CampsiteProbabilityQueryResult = ApolloReactCommon.QueryResult<
	CampsiteProbabilityQuery,
	CampsiteProbabilityQueryVariables
>;
