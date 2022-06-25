import {Environment, Network, RecordSource, Store} from 'relay-runtime';

async function fetchGraphQL(text: string, variables: object) {
  const GRAPHQL_API_URL = process.env.GRAPHQL_API_URL;
  if (!GRAPHQL_API_URL) {
    throw new Error("Graphql url wasn't specified")
  }

  // Fetch data from GitHub's GraphQL API:
  const response = await fetch(GRAPHQL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // Get the response as JSON
  return await response.json();
}

// Relay passes a "params" object with the query name and text. So we define a helper function
// to call our fetchGraphQL utility with params.text.
async function fetchRelay(params: any, variables: any) {
  console.log(`fetching query ${params.name} with ${JSON.stringify(variables)}`);
  return fetchGraphQL(params.text, variables);
}

// Export a singleton instance of Relay Environment configured with our network function:
export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});