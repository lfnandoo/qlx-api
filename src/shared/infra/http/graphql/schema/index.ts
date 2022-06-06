import { BuildSchemaOptions, buildSchemaSync } from 'type-graphql';
import { advertisementResolvers } from '../../../../../modules/advertisements/useCases';

const resolvers = [...advertisementResolvers];

const schema = buildSchemaSync({ resolvers } as unknown as BuildSchemaOptions);

export { schema };
