import React from "react";
import { RelayProps, withRelay } from "relay-nextjs";
import { graphql, usePreloadedQuery } from "react-relay";
import FirmScene from "../../scenes/CreateFirmScene";
import Layout from "../../components/MainPage/Layout";
import Loading from "../../components/v1/Loading";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import { new_NewFirmQuery } from "./__generated__/new_NewFirmQuery.graphql";

const Query = graphql`
  query new_NewFirmQuery {
    currentUser {
      ...Layout_CurrentUserFragment
    }
  }
`;

interface Props {}

const NewFirm = ({ preloadedQuery }: RelayProps<Props, new_NewFirmQuery>) => {
  const { currentUser } = usePreloadedQuery(Query, preloadedQuery);
  return (
    <Layout currentUserFragment={currentUser!} showRegisterFirm={false}>
      <FirmScene />
    </Layout>
  );
};

export default withRelay(NewFirm, Query, {
  // Fallback to render while the page is loading.
  // This property is optional.
  fallback: <Loading />,
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

    return createServerEnvironment(req!.headers.cookie);
  },
});
