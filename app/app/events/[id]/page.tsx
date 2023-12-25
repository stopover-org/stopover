import React from "react";
import { graphql, useFragment, usePreloadedQuery } from "react-relay";
import { RelayProps, withRelay } from "relay-nextjs";
import Layout from "../../../components/MainPage/Layout";
import { getClientEnvironment } from "../../../lib/clientEnvironment";
import Loading from "../../../components/v2/Loading";
import EventScene from "../../../scenes/attendees/events/EventScene";
import { fetchEnvVariables } from "../../../lib/fetchEnvVariables";
import { IApiKeys } from "../../../components/ApiKeysProvider";
import { useUpdateApiKeys } from "../../../lib/hooks/useUpdateApiKeys";
import { page_EventPage_EventFragment$key } from "../../../artifacts/page_EventPage_EventFragment.graphql";
import { page_EventPage_Query } from "../../../artifacts/page_EventPage_Query.graphql";

const Query = graphql`
  query page_EventPage_Query($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
    }
    event(id: $id) {
      ...page_EventPage_EventFragment
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
}: RelayProps<Props, page_EventPage_Query>) => {
  const { event, currentUser } = usePreloadedQuery(Query, preloadedQuery);
  useUpdateApiKeys(apiKeys);

  const eventFragment = useFragment<page_EventPage_EventFragment$key>(
    graphql`
      fragment page_EventPage_EventFragment on Event {
        title
      }
    `,
    event
  );

  return (
    <Layout currentUserFragment={currentUser} title={eventFragment?.title}>
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
      "../../../lib/serverEnvironment"
    );

    return createServerEnvironment(req!.headers.cookie);
  },
});
