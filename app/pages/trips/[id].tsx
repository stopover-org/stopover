import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import { RelayProps, withRelay } from "relay-nextjs";
import Layout from "../../components/MainPage/Layout";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import { Id_TripsQuery } from "./__generated__/Id_TripsQuery.graphql";
import TripScene from "../../scenes/attendees/trips/TripScene";
import { IApiKeys } from "../../components/ApiKeysProvider";
import { fetchEnvVariables } from "../../lib/fetchEnvVariables";
import { useUpdateApiKeys } from "../../lib/hooks/useUpdateApiKeys";

const Query = graphql`
  query Id_TripsQuery($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        trip(tripId: $id) {
          ...TripScene_TripFragment
        }
      }
    }
  }
`;

interface Props {
  apiKeys: IApiKeys;
}
const Trip = ({
  preloadedQuery,
  apiKeys,
}: RelayProps<Props, Id_TripsQuery>) => {
  const data = usePreloadedQuery<Id_TripsQuery>(Query, preloadedQuery);
  useUpdateApiKeys(apiKeys);
  return (
    <Layout currentUserFragment={data.currentUser!}>
      <TripScene tripFragmentRef={data.currentUser?.account?.trip!} />
    </Layout>
  );
};

export default withRelay(Trip, Query, {
  // Fallback to render while the page is loading.
  // This property is optional.
  fallback: null,
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

    return createServerEnvironment(req!.headers.cookie!);
  },
});
