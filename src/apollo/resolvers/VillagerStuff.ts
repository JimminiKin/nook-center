import { Resolvers } from "@gen/server/graphql";

import { createConnectionFromFullNodeEdgeList } from "@apollo/resolvers/Common";
import { VillagerResolver } from "@apollo/resolvers/VillagerResolver";
import { getAllIds } from "@apollo/loaders/VillagerBaseLoader";

const asyncFilter = async <T>(
  arr: T[],
  predicate: (value: T, index: number, array: T[]) => unknown
): Promise<T[]> => {
  const results = await Promise.all(arr.map(predicate));
  return arr.filter((_v, index) => results[index]);
};

const resolverMap: Resolvers<any> = {
  Query: {
    villager(_, { villagerId }) {
      return new VillagerResolver(villagerId);
    },
    async villagers(_, { search, start, after }) {
      const ids = getAllIds();

      return createConnectionFromFullNodeEdgeList(
        await asyncFilter<VillagerResolver>(
          ids.map((id) => new VillagerResolver(id)),
          async (villagerResolver) => {
            let keep = true;

            if (search.text) {
              if (
                (await villagerResolver.name())
                  .toUpperCase()
                  .includes(search.text.toUpperCase()) ||
                (await villagerResolver.frName())
                  .toUpperCase()
                  .includes(search.text.toUpperCase())
              ) {
                keep = keep && true;
              } else {
                return false;
              }
            }

            if (search.gender) {
              if (search.gender === (await villagerResolver.gender())) {
                keep = keep && true;
              } else {
                return false;
              }
            }

            if (search.personality) {
              if (
                search.personality === (await villagerResolver.personality())
              ) {
                keep = keep && true;
              } else {
                return false;
              }
            }

            if (search.species) {
              if (search.species === (await villagerResolver.species())) {
                keep = keep && true;
              } else {
                return false;
              }
            }

            if (search.starSign) {
              if (search.starSign === (await villagerResolver.starSign())) {
                keep = keep && true;
              } else {
                return false;
              }
            }
            return keep;
          }
        ),
        start,
        after
      );
    },
  },
};

export default resolverMap;
