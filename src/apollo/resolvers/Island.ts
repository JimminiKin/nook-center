import {
  Gender,
  Species,
  Personality,
  StarSign,
  Villager,
  RelationshipQuality,
  Island,
} from "@gen/common/graphql";

import { Resolvers } from "@gen/server/graphql";

import data from "@data/islands.json";

const islandDataToReturn = (src: typeof data[number]): Island => {
  if (!src || !src.id) {
    throw new Error("Missing Island ID");
  }

  return {
    __typename: "Island",
    ...src,
  };
};

const cleanData = data
  .map(islandDataToReturn)
  .filter((a) => a !== null) as Island[];

const getOne = (islandId: string): Island => {
  const res = cleanData.find((elm) => elm && elm.id === islandId);
  if (res === undefined || res === null) {
    throw new Error(`Can not find Island : ${islandId}`);
  }
  return res;
};

const resolverMap: Resolvers<any> = {
  Query: {
    island(_, { islandId }) {
      return getOne(islandId);
    },
    islands(_, { search }) {
      return cleanData;
    },
  },
};

export default resolverMap;
