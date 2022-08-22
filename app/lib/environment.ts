import { Environment, Network, RecordSource, Store } from "relay-runtime";

async function fetchGraphQL(text: string, variables: any) {
  // Fetch data from GitHub's GraphQL API:
  const response = await fetch(
    process.env.GRAPHQL_API_URL || "http://localhost:8080/graphql",
    {
      method: "POST",
      headers: {
        // Authorization: `bearer ${REACT_APP_GITHUB_AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: text,
        variables,
      }),
    }
  );

  // Get the response as JSON
  return response.json();
}

async function fetchRelay(params: any, variables: any) {
  console.log(
    `fetching query ${params.name} with ${JSON.stringify(variables)}`
  );
  return fetchGraphQL(params.text, variables);
}

// Export a singleton instance of Relay Environment configured with our network function:
export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});
