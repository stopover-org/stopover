import {Environment, GraphQLResponse, Network, RecordSource, Store} from "relay-runtime";
import {withHydrateDatetime} from "relay-nextjs/date";
import {getRelaySerializedState} from "relay-nextjs";

export function createClientNetwork() {
  return Network.create(async (params, variables) => {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: params.text,
        variables,
      }),
    });

    const json = await response.text();
    return JSON.parse(json, withHydrateDatetime);
  });
}

let clientEnv: Environment | undefined;
export function getClientEnvironment() {
  if (typeof window === 'undefined') return null;

  if (clientEnv == null) {
    clientEnv = new Environment({
      network: createClientNetwork(),
      store: new Store(new RecordSource(getRelaySerializedState()?.records)),
      isServer: false,
    });
  }

  return clientEnv;
}

const makeGraphQLRequest = (text: any, variables: any) => {
  return fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  })
}

export function createServerNetwork() {
  return Network.create(async (text, variables) => {
    // const context = {
    //   token,
    //   // More context variables here
    // };

    const results = await makeGraphQLRequest(text, variables);
    console.log(results)

    const data = JSON.parse(
      JSON.stringify(results),
      withHydrateDatetime
    ) as GraphQLResponse;

    return data;
  });
}

export function createServerEnvironment() {
  return new Environment({
    network: createServerNetwork(),
    store: new Store(new RecordSource()),
    isServer: true,
  });
}