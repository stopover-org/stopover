import { Environment, Network, RecordSource, Store } from "relay-runtime";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const graphqlEndpoint =
  process.env.GRAPHQL_ENDPOINT || "http://localhost:3321/graphql";

function fetchQuery(cookies: ReadonlyRequestCookies) {
  return async function fetchData(operation: { text: any }, variables: any) {
    const accessToken = cookies.get("access_token")?.value;
    const response = await fetch(graphqlEndpoint, {
      method: "POST",
      headers: {
        // Add authentication and other headers here
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    });

    return response.json();
  };
}

let environment: Environment | null = null;

export function getEnvironment(cookies: ReadonlyRequestCookies) {
  if (environment) {
    return environment;
  }

  environment = new Environment({
    network: Network.create(fetchQuery(cookies)),
    store: new Store(new RecordSource()),
  });

  return environment;
}

export default getEnvironment;
