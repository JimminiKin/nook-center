import * as Types from '../../generated/common/graphql';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type VillagerQueryVariables = {
  villagerId: Types.Scalars['ID'];
};


export type VillagerQuery = (
  { __typename: 'Query' }
  & { villager: Types.Maybe<(
    { __typename: 'Villager' }
    & Pick<Types.Villager, 'id' | 'name' | 'frName' | 'gender' | 'nookiPediaPage' | 'species' | 'personality' | 'starSign' | 'description' | 'saying' | 'randomIslandSpawnProbability'>
    & { picture: Types.Maybe<(
      { __typename: 'Picture' }
      & Pick<Types.Picture, 'small' | 'big'>
    )> }
  )> }
);


export const VillagerDocument = gql`
    query villager($villagerId: ID!) {
  villager(villagerId: $villagerId) {
    id
    name
    frName
    gender
    picture {
      small
      big
    }
    nookiPediaPage
    species
    personality
    starSign
    description
    saying
    randomIslandSpawnProbability
  }
}
    `;

/**
 * __useVillagerQuery__
 *
 * To run a query within a React component, call `useVillagerQuery` and pass it any options that fit your needs.
 * When your component renders, `useVillagerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVillagerQuery({
 *   variables: {
 *      villagerId: // value for 'villagerId'
 *   },
 * });
 */
export function useVillagerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<VillagerQuery, VillagerQueryVariables>) {
        return ApolloReactHooks.useQuery<VillagerQuery, VillagerQueryVariables>(VillagerDocument, baseOptions);
      }
export function useVillagerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<VillagerQuery, VillagerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<VillagerQuery, VillagerQueryVariables>(VillagerDocument, baseOptions);
        }
export type VillagerQueryHookResult = ReturnType<typeof useVillagerQuery>;
export type VillagerLazyQueryHookResult = ReturnType<typeof useVillagerLazyQuery>;
export type VillagerQueryResult = ApolloReactCommon.QueryResult<VillagerQuery, VillagerQueryVariables>;