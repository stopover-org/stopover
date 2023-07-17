import { graphql, usePreloadedQuery } from "react-relay";
import { RelayProps, withRelay } from "relay-nextjs";
import Layout from "../../../../components/MainPage/Layout";
import BookingScene from "../../../../scenes/firms/bookings/BookingScene";
import { getClientEnvironment } from "../../../../lib/clientEnvironment";
import { fetchEnvVariables } from "../../../../lib/fetchEnvVariables";
import { IApiKeys } from "../../../../components/ApiKeysProvider";
import { useUpdateApiKeys } from "../../../../lib/hooks/useUpdateApiKeys";
import SidebarContent from "../../../../components/shared/SidebarContent";
import AuthGuard from "../../../../components/shared/AuthGuard";
import { Id_FirmBookingQuery } from "../../../../artifacts/Id_FirmBookingQuery.graphql";

const Query = graphql`
  query Id_FirmBookingQuery($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        firm {
          booking(id: $id) {
            id
            ...BookingScene_FirmBookingFragment
          }
        }
      }
    }
  }
`;

interface Props {
  apiKeys: IApiKeys;
}

const Index = ({
  preloadedQuery,
  apiKeys,
}: RelayProps<Props, Id_FirmBookingQuery>) => {
  const { currentUser } = usePreloadedQuery<Id_FirmBookingQuery>(
    Query,
    preloadedQuery
  );

  useUpdateApiKeys(apiKeys);

  return (
    <Layout currentUserFragment={currentUser!}>
      <AuthGuard
        accessible={Boolean(currentUser?.account?.firm?.booking?.id)}
        redirectTo="/my-firm/events"
      >
        <SidebarContent>
          <BookingScene
            bookingFragmentRef={currentUser?.account?.firm?.booking!}
          />
        </SidebarContent>
      </AuthGuard>
    </Layout>
  );
};
export default withRelay(Index, Query, {
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
      "../../../../lib/serverEnvironment"
    );

    return createServerEnvironment(req!.headers.cookie!);
  },
});
