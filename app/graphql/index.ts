import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "localhost:3000/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
});

export default client;