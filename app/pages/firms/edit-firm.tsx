import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import { withRelay } from "relay-nextjs";
import Layout from "../../components/MainPage/Layout";
import FirmEditForm from "../../scenes/FirmScene/components/FirmEditForm";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import { editFirm_FirmQuery } from "./__generated__/editFirm_FirmQuery.graphql";

const Query = graphql`
  query editFirm_FirmQuery {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        firm {
          ...FirmEditForm_FirmFragment
        }
      }
    }
  }
`;

const EditFirm = ({ preloadedQuery }: any) => {
  const data = usePreloadedQuery<editFirm_FirmQuery>(Query, preloadedQuery);
  return (
    <Layout currentUserFragment={data.currentUser!}>
      <FirmEditForm firmFragmentRef={data.currentUser?.account?.firm!} />
    </Layout>
  );
};

export default withRelay(EditFirm, Query, {
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
