import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import { RelayProps, withRelay } from "relay-nextjs";
import Layout from "../../components/MainPage/Layout";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import Loading from "../../components/v2/Loading";
import { fetchEnvVariables } from "../../lib/fetchEnvVariables";
import { IApiKeys } from "../../components/ApiKeysProvider";
import { useUpdateApiKeys } from "../../lib/hooks/useUpdateApiKeys";
import AttendeeSidebar from "../../components/shared/AttendeeSidebar";
import { profile_Query } from "../../artifacts/profile_Query.graphql";
import ProfileScene from "../../scenes/attendees/ProfileScene";
import AuthGuard from "../../components/shared/AuthGuard";

const Query = graphql`
  query profile_Query {
    currentUser {
      ...Layout_CurrentUserFragment
      ...AttendeeSidebar_CurrentUserFragment
      status
      account {
        ...ProfileScene_AccountFragment
      }
    }
  }
`;

interface Props {
  apiKeys: IApiKeys;
}

const Profile = ({
  preloadedQuery,
  apiKeys,
  CSN,
}: RelayProps<Props, profile_Query>) => {
  const data = usePreloadedQuery(Query, preloadedQuery);
  useUpdateApiKeys(apiKeys);

  return (
    <Layout currentUserFragment={data.currentUser} CSN={CSN}>
      <AuthGuard accessible={Boolean(data.currentUser.status === "active")}>
        <AttendeeSidebar currentUserFragmentRef={data.currentUser}>
          <ProfileScene accountFragmentRef={data.currentUser.account} />
        </AttendeeSidebar>
      </AuthGuard>
    </Layout>
  );
};

export default withRelay(Profile, Query, {
  // Fallback to render while the page is loading.
  // This property is optional.
  fallback: <Loading />,
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
      "../../lib/serverEnvironment"
    );

    return createServerEnvironment(req!.headers.cookie);
  },
});
