import { buildSchema, BuildSchemaOptions } from 'type-graphql';
import { advertisementResolvers } from '../../../modules/advertisements/infra/graphql/advertisement.resolvers';

function createSchema() {
  return buildSchema({
    resolvers: [...advertisementResolvers],
  } as unknown as BuildSchemaOptions);
}

export { createSchema };
