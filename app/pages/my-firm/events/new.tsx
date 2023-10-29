import { RelayProps, withRelay } from "relay-nextjs";
import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import CreateEventScene from "../../../scenes/firms/events/CreateEventScene";
import { getClientEnvironment } from "../../../lib/clientEnvironment";
import Layout from "../../../components/MainPage/Layout";
import SidebarContent from "../../../components/shared/SidebarContent";
import { IApiKeys } from "../../../components/ApiKeysProvider";
import { fetchEnvVariables } from "../../../lib/fetchEnvVariables";
import { useUpdateApiKeys } from "../../../lib/hooks/useUpdateApiKeys";
import AuthGuard from "../../../components/shared/AuthGuard";
import { new_FirmEventsNewQuery } from "../../../artifacts/new_FirmEventsNewQuery.graphql";

const Query = graphql`
  query new_FirmEventsNewQuery {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        ...SidebarContent_AccountFragment
        firm {
          id
          ...CreateEventScene_FirmFragment
        }
      }
    }
  }
`;

interface Props {
  apiKeys: IApiKeys;
}

const New = ({
  preloadedQuery,
  apiKeys,
  CSN,
}: RelayProps<Props, new_FirmEventsNewQuery>) => {
  const { currentUser } = usePreloadedQuery<new_FirmEventsNewQuery>(
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
          <CreateEventScene firmFragmentRef={currentUser.account.firm!} />
        </SidebarContent>
      </AuthGuard>
    </Layout>
  );
};

export default withRelay(New, Query, {
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
