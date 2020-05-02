import "graphql-import-node";
import { merge } from "lodash";
import { makeExecutableSchema } from "graphql-tools";
import * as typeDefs from "../../schema/schema.graphql";
import { GraphQLSchema } from "graphql";

import CommonResolver from "./resolvers/Common";
import VillagerResolver from "./resolvers/VillagerResolver";
import IslandResolver from "./resolvers/IslandResolver";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers: merge(VillagerResolver, IslandResolver, CommonResolver),
});

export default schema;
