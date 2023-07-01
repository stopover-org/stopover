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
import { bookings_FirmBookingsQuery } from "./__generated__/bookings_FirmBookingsQuery.graphql";
import BookingsScene from "../../../scenes/firms/bookings/BookingsScene";

const Query = graphql`
  query bookings_FirmBookingsQuery {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        firm {
          id
          ...BookingsScene_BookingsFirmPaginationFragment
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
}: RelayProps<Props, bookings_FirmBookingsQuery>) => {
  const { currentUser } = usePreloadedQuery<bookings_FirmBookingsQuery>(
    Query,
    preloadedQuery
  );

  useUpdateApiKeys(apiKeys);
  return (
    <Layout currentUserFragment={currentUser!}>
      <AuthGuard
        accessible={Boolean(currentUser?.account?.firm?.id)}
        redirectTo="/firms/new"
      >
        <SidebarContent>
          <BookingsScene firmFragmentRef={currentUser?.account.firm!} />
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
