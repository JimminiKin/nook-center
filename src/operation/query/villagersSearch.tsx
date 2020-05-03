import * as Types from '../../generated/common/graphql';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type VillagersSearchQueryVariables = {
  search: Types.VillagerSearchInput;
  start?: Types.Maybe<Types.Scalars['Int']>;
  after?: Types.Maybe<Types.Scalars['String']>;
};


export type VillagersSearchQuery = (
  { __typename: 'Query' }
  & { villagers: (
    { __typename: 'VillagersResultConnection' }
    & { edges: Array<(
      { __typename: 'VillagersResultEdge' }
      & Pick<Types.VillagersResultEdge, 'cursor'>
      & { node: (
        { __typename: 'Villager' }
        & Pick<Types.Villager, 'id' | 'name' | 'frName' | 'gender' | 'nookiPediaPage' | 'species' | 'personality' | 'starSign' | 'description' | 'saying' | 'birthday' | 'randomIslandSpawnProbability'>
        & { picture?: Types.Maybe<(
          { __typename: 'Picture' }
          & Pick<Types.Picture, 'thumb' | 'medium' | 'full'>
        )> }
      ) }
    )>, pageInfo: (
      { __typename: 'PageInfo' }
      & Pick<Types.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor' | 'count'>
    ) }
  ) }
);


export const VillagersSearchDocument = gql`
    query villagersSearch($search: VillagerSearchInput!, $start: Int = 20, $after: String) {
  villagers(search: $search, start: $start, after: $after) @connection(key: "villagers", filter: ["search"]) {
    __typename
    edges {
      cursor
      node {
        id
        name
        frName
        gender
        picture {
          thumb
          medium
          full
        }
        nookiPediaPage
        species
        personality
        starSign
        description
        saying
        birthday
        randomIslandSpawnProbability
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
      count
    }
  }
}
    `;

/**
 * __useVillagersSearchQuery__
 *
 * To run a query within a React component, call `useVillagersSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useVillagersSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVillagersSearchQuery({
 *   variables: {
 *      search: // value for 'search'
 *      start: // value for 'start'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useVillagersSearchQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<VillagersSearchQuery, VillagersSearchQueryVariables>) {
        return ApolloReactHooks.useQuery<VillagersSearchQuery, VillagersSearchQueryVariables>(VillagersSearchDocument, baseOptions);
      }
export function useVillagersSearchLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<VillagersSearchQuery, VillagersSearchQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<VillagersSearchQuery, VillagersSearchQueryVariables>(VillagersSearchDocument, baseOptions);
        }
export type VillagersSearchQueryHookResult = ReturnType<typeof useVillagersSearchQuery>;
export type VillagersSearchLazyQueryHookResult = ReturnType<typeof useVillagersSearchLazyQuery>;
export type VillagersSearchQueryResult = ApolloReactCommon.QueryResult<VillagersSearchQuery, VillagersSearchQueryVariables>;