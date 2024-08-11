import { Environment, Network, RecordSource, Store } from "relay-runtime";

const graphqlEndpoint =
  process.env.GRAPHQL_ENDPOINT || "http://localhost:3321/graphql";

async function fetchQuery(operation: { text: any }, variables: any) {
  const accessToken = window.localStorage.getItem("access_token");
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
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery);
const store = new Store(new RecordSource());
const environment = new Environment({
  network,
  store,
});

export default environment;
