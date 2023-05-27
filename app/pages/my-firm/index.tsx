import React from "react";
import { RelayProps, withRelay } from "relay-nextjs";
import { graphql, usePreloadedQuery } from "react-relay";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import { myFirm_FirmQuery } from "./__generated__/myFirm_FirmQuery.graphql";
import Layout from "../../components/MainPage/Layout";
import FirmScene from "../../scenes/FirmScene";
import SidebarContent from "../../components/MainPage/SidebarContent";
import ApiKeysProvider, { IApiKeys } from "../../components/ApiKeysProvider";

const Query = graphql`
  query myFirm_FirmQuery {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        firm {
          ...FirmScene_FirmFragment
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
}: RelayProps<Props, myFirm_FirmQuery>) => {
  const data = usePreloadedQuery<myFirm_FirmQuery>(Query, preloadedQuery);

  return (
    <ApiKeysProvider apiKeys={apiKeys}>
      <Layout currentUserFragment={data.currentUser!}>
        <SidebarContent>
          <FirmScene firmFragmentRef={data.currentUser?.account?.firm!} />
        </SidebarContent>
      </Layout>
    </ApiKeysProvider>
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
    apiKeys: { googleMaps: process.env.GOOGLE_MAPS_API_KEY },
  }),
  // Server-side props can be accessed as the second argument
  // to this function.
  createServerEnvironment: async ({ req }) => {
    const { createServerEnvironment } = await import(
      "../../lib/serverEnvironment"
    );

    return createServerEnvironment(req!.headers.cookie!);
  },
});
