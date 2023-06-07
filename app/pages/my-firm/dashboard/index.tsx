import { graphql, usePreloadedQuery } from "react-relay";
import { RelayProps, withRelay } from "relay-nextjs";
import DashboardScene from "../../../scenes/DashboardScene";
import Layout from "../../../components/MainPage/Layout";
import SidebarContent from "../../../lib/shared/SidebarContent";
import { IApiKeys } from "../../../components/ApiKeysProvider";
import { getClientEnvironment } from "../../../lib/clientEnvironment";
import { fetchEnvVariables } from "../../../lib/fetchEnvVariables";
import { dashboard_DashboardQuery } from "./__generated__/dashboard_DashboardQuery.graphql";
import AuthGuard from "../../../lib/shared/AuthGuard";

const Query = graphql`
  query dashboard_DashboardQuery {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        firm {
          ...DashboardScene_FirmFragment
          id
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
}: RelayProps<Props, dashboard_DashboardQuery>) => {
  const { currentUser } = usePreloadedQuery(Query, preloadedQuery);
  return (
    <Layout currentUserFragment={currentUser!}>
      <AuthGuard
        accessible={Boolean(currentUser?.account?.firm?.id)}
        redirectTo="#"
      >
        <SidebarContent>
          <DashboardScene firmFragmentRef={currentUser?.account?.firm!} />
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
      "../../../lib/serverEnvironment"
    );

    return createServerEnvironment(req!.headers.cookie!);
  },
});
