import {merge} from 'lodash';
import {makeExecutableSchema} from 'graphql-tools';
import typeDefs from '@gen/graphql.schema.json';
import {printSchema, buildClientSchema, IntrospectionQuery} from 'graphql/utilities';
import {GraphQLSchema} from 'graphql';

import CommonResolver from './resolvers/Common';
import VillagerResolver from './resolvers/VillagerResolver';
import IslandResolver from './resolvers/IslandResolver';

const schema: GraphQLSchema = makeExecutableSchema({
	typeDefs: printSchema(buildClientSchema((typeDefs as unknown) as IntrospectionQuery)),
	resolvers: merge(VillagerResolver, IslandResolver, CommonResolver),
});

export default schema;
