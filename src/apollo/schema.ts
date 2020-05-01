import "graphql-import-node";
import { merge } from "lodash";
import { makeExecutableSchema } from "graphql-tools";
import * as typeDefs from "../../schema/schema.graphql";
import { GraphQLSchema } from "graphql";

import VillagerResolver from "./resolvers/Villager";
import IslandResolver from "./resolvers/Island";

// console.log("YAYAYA", typeDefs);

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers: merge(VillagerResolver, IslandResolver),
});

export default schema;
