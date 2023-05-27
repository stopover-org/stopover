import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
// import { useRouter } from "next/router";
import { RelayProps, withRelay } from "relay-nextjs";
import Layout from "../../components/MainPage/Layout";
import { Id_Query } from "./__generated__/Id_Query.graphql";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import Loading from "../../components/v2/Loading";
import EventScene from "../../scenes/EventScene";
import { fetchEnvVariables } from "../../lib/fetchEnvVariables";
import ApiKeysProvider, { IApiKeys } from "../../components/ApiKeysProvider";

const Query = graphql`
  query Id_Query($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
    }
    event(id: $id) {
      ...EventScene_EventFragment
    }
  }
`;

interface Props {
  id: number;
  apiKeys: IApiKeys;
}

const Event = ({ preloadedQuery, apiKeys }: RelayProps<Props, Id_Query>) => {
  const { event, currentUser } = usePreloadedQuery(Query, preloadedQuery);
  return (
    <ApiKeysProvider apiKeys={apiKeys}>
      <Layout currentUserFragment={currentUser!}>
        <EventScene eventFragmentRef={event!} />
      </Layout>
    </ApiKeysProvider>
  );
};

export default withRelay(Event, Query, {
  // Fallback to render while the page is loading.
  // This property is optional.
  fallback: <Loading />,
  // Create a Relay environment on the client-side.
  // Note: This function must always return the same value.
  createClientEnvironment: () => getClientEnvironment()!,
  // Gets server side props for the page.
  serverSideProps: async (ctx) => ({
    id: +ctx.query.id!,
    apiKeys: fetchEnvVariables(),
  }),
  // Server-side props can be accessed as the second argument
  // to this function.
  createServerEnvironment: async ({ req }) => {
    const { createServerEnvironment } = await import(
      "../../lib/serverEnvironment"
    );

    return createServerEnvironment(req!.headers.cookie);
  },
});
