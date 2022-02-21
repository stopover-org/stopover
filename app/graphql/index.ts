import { ApolloClient, InMemoryCache, FetchPolicy } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
  defaultOptions: {
    mutate: {
      fetchPolicy: 'no-cache'
    }
  }
});

export default client;