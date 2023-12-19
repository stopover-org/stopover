import { graphql, usePreloadedQuery } from "react-relay";
import { RelayProps, withRelay } from "relay-nextjs";
import { IApiKeys } from "../../../components/ApiKeysProvider";
import { Id_AttendeeFirmQuery } from "../../../artifacts/Id_AttendeeFirmQuery.graphql";
import { useUpdateApiKeys } from "../../../lib/hooks/useUpdateApiKeys";
import AuthGuard from "../../../components/shared/AuthGuard";
import Layout from "../../../components/MainPage/Layout";
import { getClientEnvironment } from "../../../lib/clientEnvironment";
import { fetchEnvVariables } from "../../../lib/fetchEnvVariables";
import FirmScene from "../../../scenes/attendees/firms/FirmScene";

const Query = graphql`
  query Id_AttendeeFirmQuery($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
    }
    firm(id: $id) {
      id
      ...FirmScene_CurrentFirmFragment
    }
  }
`;

interface Props {
  apiKeys: IApiKeys;
}

const Firm = ({
  preloadedQuery,
  apiKeys,
  CSN,
}: RelayProps<Props, Id_AttendeeFirmQuery>) => {
  const { currentUser, firm } = usePreloadedQuery<Id_AttendeeFirmQuery>(
    Query,
    preloadedQuery
  );

  useUpdateApiKeys(apiKeys);

  return (
    <Layout currentUserFragment={currentUser} CSN={CSN}>
      <AuthGuard accessible={Boolean(firm?.id)} redirectTo="/my-firm/events">
        <FirmScene firmFragmentRef={firm} />
      </AuthGuard>
    </Layout>
  );
};

export default withRelay(Firm, Query, {
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
      "../../../lib/serverEnvironment"
    );

    return createServerEnvironment(req!.headers.cookie!);
  },
});
