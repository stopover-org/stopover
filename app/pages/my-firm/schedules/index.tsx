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
import { schedules_FirmSchedulesQuery } from "./__generated__/schedules_FirmSchedulesQuery.graphql";
import SchedulesScene from "../../../scenes/firms/schedules/SchedulesScene";

const Query = graphql`
  query schedules_FirmSchedulesQuery {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        firm {
          id
          ...SchedulesScene_FirmFragment
        }
      }
    }
  }
`;

interface Props {
  apiKeys: IApiKeys;
}

const Schedules = ({
  preloadedQuery,
  apiKeys,
}: RelayProps<Props, schedules_FirmSchedulesQuery>) => {
  const { currentUser } = usePreloadedQuery<schedules_FirmSchedulesQuery>(
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
          <SchedulesScene firmFragmentRef={currentUser?.account?.firm!} />
        </SidebarContent>
      </AuthGuard>
    </Layout>
  );
};

export default withRelay(Schedules, Query, {
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
