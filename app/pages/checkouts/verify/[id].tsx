import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import { RelayProps, withRelay } from "relay-nextjs";
import { Id_VerifyCheckoutQuery } from "../../../artifacts/Id_VerifyCheckoutQuery.graphql";
import AuthGuard from "../../../components/shared/AuthGuard";
import { IApiKeys } from "../../../components/ApiKeysProvider";
import { useUpdateApiKeys } from "../../../lib/hooks/useUpdateApiKeys";
import Layout from "../../../components/MainPage/Layout";
import Loading from "../../../components/v2/Loading";
import { getClientEnvironment } from "../../../lib/clientEnvironment";
import { fetchEnvVariables } from "../../../lib/fetchEnvVariables";
import VerifyBookingScene from "../../../scenes/attendees/bookings/VerifyBookingScene";

const Query = graphql`
  query Id_VerifyCheckoutQuery($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        id
      }
    }
    booking(id: $id) {
      id
      account {
        id
      }
      ...VerifyBookingScene_BookingFragment
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
}: RelayProps<Props, Id_VerifyCheckoutQuery>) => {
  const { currentUser, booking } = usePreloadedQuery(Query, preloadedQuery);
  useUpdateApiKeys(apiKeys);

  return (
    <Layout currentUserFragment={currentUser} CSN={CSN}>
      <AuthGuard
        accessible={Boolean(currentUser.account.id === booking?.account?.id)}
        redirectTo="/trips"
      >
        <VerifyBookingScene bookingFragmentRef={booking!} />
      </AuthGuard>
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
