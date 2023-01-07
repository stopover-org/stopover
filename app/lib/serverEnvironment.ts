import { withHydrateDatetime } from "relay-nextjs/date";
import {
  Environment,
  GraphQLResponse,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from "relay-runtime";

import { fetchGraphQLRaw } from "./fetchGraphQL";

export function createServerNetwork(cookie?: string) {
  return Network.create(
    async (params: RequestParameters, variables: Variables) => {
      const results = await fetchGraphQLRaw(params.text!, variables, cookie);
      const text = await results.json();
      const data: GraphQLResponse = JSON.parse(
        JSON.stringify(text),
        withHydrateDatetime
      );

      return data;
    }
  );
}

export function createServerEnvironment(cookie?: string) {
  return new Environment({
    network: createServerNetwork(cookie),
    store: new Store(new RecordSource()),
    isServer: true,
  });
}
