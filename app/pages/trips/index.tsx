import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import { RelayProps, withRelay } from "relay-nextjs";
import Layout from "../../components/MainPage/Layout";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import Loading from "../../components/v2/Loading";
import TripsScene from "../../scenes/attendees/trips/TripsScene";
import { fetchEnvVariables } from "../../lib/fetchEnvVariables";
import { IApiKeys } from "../../components/ApiKeysProvider";
import { useUpdateApiKeys } from "../../lib/hooks/useUpdateApiKeys";
import { trips_Query } from "../../artifacts/trips_Query.graphql";
import AttendeeSidebar from "../../components/shared/AttendeeSidebar";

const Query = graphql`
  query trips_Query {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        ...TripsScene_AccountFragment
      }
    }
  }
`;

interface Props {
  apiKeys: IApiKeys;
}
const Trips = ({
  preloadedQuery,
  apiKeys,
  CSN,
}: RelayProps<Props, trips_Query>) => {
  const data = usePreloadedQuery(Query, preloadedQuery);
  useUpdateApiKeys(apiKeys);

  return (
    <Layout currentUserFragment={data.currentUser} CSN={CSN}>
      <AttendeeSidebar>
        <TripsScene accountFragmentRef={data.currentUser.account} />
      </AttendeeSidebar>
    </Layout>
  );
};

export default withRelay(Trips, Query, {
  // Fallback to render while the page is loading.
  // This property is optional.
  fallback: <Loading />,
  // Create a Relay environment on the client-side.
  // Note: This function must always return the same value.
  createClientEnvironment: () => getClientEnvironment()!,
  // Gets server side props for the page.
  serverSideProps: async () => ({
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
