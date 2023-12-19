import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import { RelayProps, withRelay } from "relay-nextjs";
import Layout from "../../components/MainPage/Layout";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import Loading from "../../components/v2/Loading";
import EventsScene from "../../scenes/attendees/events/EventsScene";
import { fetchEnvVariables } from "../../lib/fetchEnvVariables";
import { IApiKeys } from "../../components/ApiKeysProvider";
import { useUpdateApiKeys } from "../../lib/hooks/useUpdateApiKeys";
import { events_Query } from "../../artifacts/events_Query.graphql";
import { useQuery } from "../../lib/hooks/useQuery";
import { EventsFilter } from "../../artifacts/EventsScenePaginationQuery.graphql";

export const Query = graphql`
  query events_Query($filters: EventsFilter!) {
    currentUser {
      ...Layout_CurrentUserFragment
    }
    ...EventsScene_EventsPaginationFragment
    ...EventsScene_InterestsFragment
  }
`;

interface Props {
  apiKeys: IApiKeys;
  filters: EventsFilter;
}

const Events = ({
  preloadedQuery,
  apiKeys,
  CSN,
}: RelayProps<Props, events_Query>) => {
  const queryRef = usePreloadedQuery(Query, preloadedQuery);
  useUpdateApiKeys(apiKeys);

  useQuery("interests", []);

  useQuery("query");

  return (
    <Layout currentUserFragment={queryRef.currentUser} CSN={CSN}>
      <EventsScene eventsFragmentRef={queryRef} />
    </Layout>
  );
};

export default withRelay(Events, Query, {
  // Fallback to render while the page is loading.
  // This property is optional.
  fallback: <Loading />,
  // Create a Relay environment on the client-side.
  // Note: This function must always return the same value.
  createClientEnvironment: () => getClientEnvironment()!,
  // Gets server side props for the page.
  serverSideProps: async (ctx) => {
    // @ts-ignore
    ctx.query.filters = {};

    // @ts-ignore
    ctx.query.filters.interests = [ctx.query.interests as string].filter(
      Boolean
    );

    // @ts-ignore
    ctx.query.filters.query = (ctx.query.query as string) || "";

    return {
      apiKeys: fetchEnvVariables(),
    };
  },
  // Server-side props can be accessed as the second argument
  // to this function.
  createServerEnvironment: async ({ req }) => {
    const { createServerEnvironment } = await import(
      "../../lib/serverEnvironment"
    );

    return createServerEnvironment(req!.headers.cookie);
  },
});
