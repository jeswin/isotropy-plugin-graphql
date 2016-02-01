/* @flow */
import Router from "isotropy-router";
import graphqlHTTP from 'isotropy-graphql';

import type { HttpMethodRouteOptionsType, HttpMethodRouteArgsType } from "isotropy-router";

export type GraphqlAppType = {
  schema: Object,
  type: string,
  path: string
}

export type GraphqlConfigType = {
  graphiql?: boolean
}

const getDefaults = function(val: Object = {}) : GraphqlAppType {
  return {
    type: val.type || "graphql",
    schema: val.schema,
    path: val.path || "/graphql"
  };
};


const setup = async function(appConfig: GraphqlAppType, router: Router, config: GraphqlConfigType) : Promise {
    const graphqlFn = graphqlHTTP({
      schema: appConfig.schema,
      graphiql: config.graphiql
    });

  router.when(() => true, async (req, res) => {
    await graphqlFn(req, res);
  });
};


export default {
  getDefaults,
  setup
};
