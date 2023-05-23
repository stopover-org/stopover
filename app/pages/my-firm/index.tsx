import React from "react";
import { withRelay } from "relay-nextjs";
import { graphql, usePreloadedQuery } from "react-relay";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import { myFirm_FirmQuery } from "./__generated__/myFirm_FirmQuery.graphql";
import Layout from "../../components/MainPage/Layout";
import FirmScene from "../../scenes/FirmScene";

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

const Index = ({ preloadedQuery }: any) => {
  const data = usePreloadedQuery<myFirm_FirmQuery>(Query, preloadedQuery);

  return (
    <Layout currentUserFragment={data.currentUser!}>
      <FirmScene firmFragmentRef={data.currentUser?.account?.firm!} />
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
  serverSideProps: async () => ({}),
  // Server-side props can be accessed as the second argument
  // to this function.
  createServerEnvironment: async ({ req }) => {
    const { createServerEnvironment } = await import(
      "../../lib/serverEnvironment"
    );

    return createServerEnvironment(req!.headers.cookie!);
  },
});
