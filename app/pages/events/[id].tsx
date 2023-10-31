import React from "react";
import { graphql, useFragment, usePreloadedQuery } from "react-relay";
import { RelayProps, withRelay } from "relay-nextjs";
import Layout from "../../components/MainPage/Layout";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import Loading from "../../components/v2/Loading";
import EventScene from "../../scenes/attendees/events/EventScene";
import { fetchEnvVariables } from "../../lib/fetchEnvVariables";
import { IApiKeys } from "../../components/ApiKeysProvider";
import { useUpdateApiKeys } from "../../lib/hooks/useUpdateApiKeys";
import { Id_Query } from "../../artifacts/Id_Query.graphql";
import { Id_EventFragment$key } from "../../artifacts/Id_EventFragment.graphql";

const Query = graphql`
  query Id_Query($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
    }
    event(id: $id) {
      ...Id_EventFragment
      ...EventScene_EventFragment
    }
  }
`;

interface Props {
  id: number;
  apiKeys: IApiKeys;
}

const Event = ({
  preloadedQuery,
  apiKeys,
  CSN,
}: RelayProps<Props, Id_Query>) => {
  const { event, currentUser } = usePreloadedQuery(Query, preloadedQuery);
  useUpdateApiKeys(apiKeys);

  const eventFragment = useFragment<Id_EventFragment$key>(
    graphql`
      fragment Id_EventFragment on Event {
        title
      }
    `,
    event
  );

  return (
    <Layout
      currentUserFragment={currentUser}
      CSN={CSN}
      title={eventFragment?.title}
    >
      <EventScene eventFragmentRef={event!} />
    </Layout>
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
