import "graphql-import-node";
import { merge } from "lodash";
import { makeExecutableSchema } from "graphql-tools";
import * as typeDefs from "../../schema/schema.graphql";
import { GraphQLSchema } from "graphql";

import VillagerResolver from "./resolvers/VillagerStuff";
import IslandResolver from "./resolvers/Island";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers: merge(VillagerResolver, IslandResolver),
});

export default schema;
