import {Resolvers} from '@gen/server/graphql';

import data from '@data/islands.json';

const getAllIds = () => {
	return data.map((elm) => elm.id);
};

const getOne = (key: string) => {
	return data.find((elm) => elm.id === key);
};

const resolverMap: Resolvers<any> = {
	Query: {
		island(_, {islandId}) {
			return getOne(islandId);
		},
		islands(_, {search}) {
			return getAllIds().map(getOne);
		},
	},
};

export default resolverMap;
