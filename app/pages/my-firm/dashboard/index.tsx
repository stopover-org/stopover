import { graphql, usePreloadedQuery } from "react-relay";
import { RelayProps, withRelay } from "relay-nextjs";
import DashboardScene from "../../../scenes/firms/DashboardScene";
import Layout from "../../../components/MainPage/Layout";
import SidebarContent from "../../../components/shared/SidebarContent";
import { IApiKeys } from "../../../components/ApiKeysProvider";
import { getClientEnvironment } from "../../../lib/clientEnvironment";
import { fetchEnvVariables } from "../../../lib/fetchEnvVariables";
import AuthGuard from "../../../components/shared/AuthGuard";
import { useUpdateApiKeys } from "../../../lib/hooks/useUpdateApiKeys";
import { dashboard_DashboardQuery } from "../../../artifacts/dashboard_DashboardQuery.graphql";

const Query = graphql`
  query dashboard_DashboardQuery {
    currentUser {
      ...Layout_CurrentUserFragment
      ...DashboardScene_CurrentUserFragment
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
  apiKeys,
}: RelayProps<Props, dashboard_DashboardQuery>) => {
  const { currentUser } = usePreloadedQuery(Query, preloadedQuery);

  useUpdateApiKeys(apiKeys);
  return (
    <Layout currentUserFragment={currentUser!}>
      <AuthGuard accessible={Boolean(currentUser?.account?.firm?.id)}>
        <SidebarContent sx={{ paddingLeft: "10px" }}>
          <DashboardScene
            firmFragmentRef={currentUser?.account?.firm!}
            currentUserFragmentRef={currentUser!}
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
      "../../../lib/serverEnvironment"
    );

    return createServerEnvironment(req!.headers.cookie!);
  },
});
