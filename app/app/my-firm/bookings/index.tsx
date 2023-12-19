import React from "react";
import { RelayProps, withRelay } from "relay-nextjs";
import { graphql, usePreloadedQuery } from "react-relay";
import Layout from "../../../components/MainPage/Layout";
import AuthGuard from "../../../components/shared/AuthGuard";
import SidebarContent from "../../../components/shared/SidebarContent";
import { getClientEnvironment } from "../../../lib/clientEnvironment";
import { IApiKeys } from "../../../components/ApiKeysProvider";
import { fetchEnvVariables } from "../../../lib/fetchEnvVariables";
import { useUpdateApiKeys } from "../../../lib/hooks/useUpdateApiKeys";
import BookingsScene from "../../../scenes/firms/bookings/BookingsScene";
import { bookings_FirmBookingsQuery } from "../../../artifacts/bookings_FirmBookingsQuery.graphql";

const Query = graphql`
  query bookings_FirmBookingsQuery {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        ...SidebarContent_AccountFragment
        firm {
          id
          ...BookingsScene_FirmFragment
        }
      }
    }
  }
`;

interface Props {
  apiKeys: IApiKeys;
}

const Bookings = ({
  preloadedQuery,
  apiKeys,
  CSN,
}: RelayProps<Props, bookings_FirmBookingsQuery>) => {
  const { currentUser } = usePreloadedQuery<bookings_FirmBookingsQuery>(
    Query,
    preloadedQuery
  );

  useUpdateApiKeys(apiKeys);
  return (
    <Layout currentUserFragment={currentUser} CSN={CSN}>
      <AuthGuard
        accessible={Boolean(currentUser.account.firm?.id)}
        redirectTo="/firms/new"
      >
        <SidebarContent accountFragmentRef={currentUser.account}>
          <BookingsScene firmFragmentRef={currentUser.account.firm!} />
        </SidebarContent>
      </AuthGuard>
    </Layout>
  );
};

export default withRelay(Bookings, Query, {
  // Fallback to render while the page is loading.
  // This property is optional.
  fallback: null,
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
      "../../../lib/serverEnvironment"
    );

    return createServerEnvironment(req!.headers.cookie!);
  },
});
