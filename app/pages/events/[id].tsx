import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import { useRouter } from "next/router";
import { RelayProps, withRelay } from "relay-nextjs";
import Layout from "../../components/MainPage/Layout";
import { Id_Query } from "./__generated__/Id_Query.graphql";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import Loading from "../../components/Loading";
import EventCard from "../../components/EventCard";

const Query = graphql`
  query Id_Query($id: ID!) {
    event(id: $id) {
      id
      ...Breadcrumbs_Fragment
      ...MainInformation_Fragment
    }
  }
`;

type Props = {
  id: number;
  googleMapsApiKey: string;
};

const Event = ({ preloadedQuery, ...props }: RelayProps<Props, Id_Query>) => {
  const router = useRouter();
  const { date } = router.query;
  const { event } = usePreloadedQuery(Query, preloadedQuery);
  return (
    <Layout>
      <EventCard
        event={event}
        date={date}
        googleMapsApiKey={props.googleMapsApiKey}
      />
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
  createServerEnvironment: async () => {
    const { createServerEnvironment } = await import(
      "../../lib/serverEnvironment"
    );
    return createServerEnvironment();
  },
});
