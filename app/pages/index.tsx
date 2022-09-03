import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import { RelayProps, withRelay } from "relay-nextjs";
import Layout from "../components/MainPage/Layout";
import EventsList from "../components/Events/List";
import { getClientEnvironment } from "../lib/clientEnvironment";
import { pages_Query } from "./__generated__/pages_Query.graphql";
import Loading from "../components/Loading";

const Query = graphql`
  query pages_Query {
    currentUser {
      id
    }
    events {
      id
      eventType
      title
      description
      country
      city
      status
      eventOptions {
        id
        relayId
      }
      interests {
        id
        title
      }
      achievements {
        title
      }
    }
  }
`;

const Home = ({ preloadedQuery }: RelayProps<{}, pages_Query>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const query = usePreloadedQuery(Query, preloadedQuery);

  return (
    <Layout>
      <EventsList />
    </Layout>
  );
};

export default withRelay(Home, Query, {
  // Fallback to render while the page is loading.
  // This property is optional.
  fallback: <Loading />,
  // Create a Relay environment on the client-side.
  // Note: This function must always return the same value.
  createClientEnvironment: () => getClientEnvironment()!,
  // Gets server side props for the page.
  serverSideProps: async () => ({}),
  // Server-side props can be accessed as the second argument
  // to this function.
  createServerEnvironment: async () => {
    const { createServerEnvironment } = await import(
      "../lib/serverEnvironment"
    );
    return createServerEnvironment();
  },
});
