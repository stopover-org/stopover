import { RelayProps, withRelay } from "relay-nextjs";
import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import CreateEventScene from "../../../scenes/CreateEventScene";
import { getClientEnvironment } from "../../../lib/clientEnvironment";
import Layout from "../../../components/MainPage/Layout";
import SidebarContent from "../../../components/MainPage/SidebarContent";
import { new_FirmEventsNewQuery } from "./__generated__/new_FirmEventsNewQuery.graphql";
import { IApiKeys } from "../../../components/ApiKeysProvider";
import { fetchEnvVariables } from "../../../lib/fetchEnvVariables";
import { useUpdateApiKeys } from "../../../lib/hooks/useUpdateApiKeys";

const Query = graphql`
  query new_FirmEventsNewQuery {
    currentUser {
      ...Layout_CurrentUserFragment
    }
  }
`;

interface Props {
  apiKeys: IApiKeys;
}

const New = ({
  preloadedQuery,
  apiKeys,
}: RelayProps<Props, new_FirmEventsNewQuery>) => {
  const data = usePreloadedQuery<new_FirmEventsNewQuery>(Query, preloadedQuery);
  useUpdateApiKeys(apiKeys);
  return (
    <Layout currentUserFragment={data.currentUser!}>
      <SidebarContent>
        <CreateEventScene />
      </SidebarContent>
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
