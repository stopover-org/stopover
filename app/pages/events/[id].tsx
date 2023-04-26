import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
// import { useRouter } from "next/router";
import { RelayProps, withRelay } from "relay-nextjs";
import Layout from "../../components/MainPage/Layout";
import { Id_Query } from "./__generated__/Id_Query.graphql";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import Loading from "../../components/v1/Loading";
import EventScene from "../../scenes/EventScene";

const Query = graphql`
  query Id_Query($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
    }
    event(id: $id) {
      ...EventScene_EventFragment
    }
  }
`;

type Props = {
  id: number;
  googleMapsApiKey: string;
};

const Event = ({
  preloadedQuery /* , ...props */,
}: RelayProps<Props, Id_Query>) => {
  // const router = useRouter();
  // const { date } = router.query;
  const { event, currentUser } = usePreloadedQuery(Query, preloadedQuery);
  return (
    <Layout currentUserFragment={currentUser!}>
      <EventScene eventFragmentRef={event!} />
    </Layout>
  );
};

export default withRelay(Event, Query, {
  // Fallback to render while the page is loading.
  // This property is optional.
  fallback: <Loading />,
  // Create a Relay environment on the client-side.
  // Note: This function must always return the same value.
  createClientEnvironment: () => getClientEnvironment()!,
  // Gets server side props for the page.
  serverSideProps: async (ctx) => ({
    id: +ctx.query.id!,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
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
