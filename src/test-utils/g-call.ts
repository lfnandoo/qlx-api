import 'reflect-metadata';
import { graphql, GraphQLSchema } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { createSchema } from '../shared/graphql/schema';

interface Options {
  source: string;
  variableValues: Maybe<{
    [key: string]: any;
  }>;
}

let schema: GraphQLSchema;

async function gCall(options: Options) {
  if (!schema) {
    schema = await createSchema();
  }

  return graphql({ schema, ...options });
}

export { gCall };
