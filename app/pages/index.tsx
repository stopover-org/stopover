import { graphql, usePreloadedQuery } from "react-relay";
import { RelayProps, withRelay } from "relay-nextjs";
import { IApiKeys } from "../components/ApiKeysProvider";
import { useUpdateApiKeys } from "../lib/hooks/useUpdateApiKeys";
import Layout from "../components/MainPage/Layout";
import { getClientEnvironment } from "../lib/clientEnvironment";
import { fetchEnvVariables } from "../lib/fetchEnvVariables";
import Loading from "../components/v2/Loading";
import { pages_HomePageQuery } from "../artifacts/pages_HomePageQuery.graphql";
import RootScene from "../scenes/Landings/RootScene";

const Query = graphql`
  query pages_HomePageQuery {
    currentUser {
      ...Layout_CurrentUserFragment
    }
    ...RootScene_QueryFragment
  }
`;

interface Props {
  apiKeys: IApiKeys;
}

const Home = ({
  preloadedQuery,
  apiKeys,
  CSN,
}: RelayProps<Props, pages_HomePageQuery>) => {
  const data = usePreloadedQuery<pages_HomePageQuery>(Query, preloadedQuery);
  useUpdateApiKeys(apiKeys);

  return (
    <Layout currentUserFragment={data.currentUser} CSN={CSN}>
      <RootScene queryFragmentRef={data} />
    </Layout>
  );
};

export default withRelay(Home, Query, {
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
      "../lib/serverEnvironment"
    );

    return createServerEnvironment(req!.headers.cookie);
  },
});
