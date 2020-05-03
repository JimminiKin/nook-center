import * as Types from '../../generated/common/graphql';

import gql from 'graphql-tag';

export type VillagerCardFragment = {__typename: 'Villager'} & Pick<
	Types.Villager,
	'id' | 'name' | 'gender' | 'species' | 'personality' | 'starSign' | 'birthday'
> & {picture?: Types.Maybe<{__typename: 'Picture'} & Pick<Types.Picture, 'medium'>>};

export const VillagerCardFragmentDoc = gql`
	fragment VillagerCard on Villager {
		id
		name
		gender
		picture {
			medium
		}
		species
		personality
		starSign
		birthday
	}
`;
