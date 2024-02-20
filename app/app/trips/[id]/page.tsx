import React from "react";
import scene_Trip_QueryNode, {
  scene_Trip_Query,
} from "artifacts/scene_Trip_Query.graphql";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { merge } from "lodash";
import fetchQuery from "lib/relay/fetchQuery";
import defaultMetadata, {
  sharedEmails,
  sharedImages,
  sharedPhones,
  translate,
} from "lib/utils/defaultMetadata";
import QueryWrapper from "./query";

const Page = async ({ params }: { params: Record<string, string> }) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_Trip_QueryNode,
    scene_Trip_Query
  >(scene_Trip_QueryNode.params, { id: unescape(params.id) });

  return (
    <QueryWrapper
      preloadedQuery={preloadedQuery}
      cookies={cookies().getAll()}
    />
  );
};

export default Page;

export const revalidate = 0;

const PageQuery = `
  query PageQuery($id: ID!) {
    currentUser {
      account {
        primaryPhone
        primaryEmail
        trip(tripId: $id) {
          cities
          bookings {
            event {
              images
            }
          }
        }
      }
    }
  }
`;

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const response = await fetchQuery(PageQuery, { id: unescape(params.id) });
  const defaultTitle = await translate("models.trip.singular");
  const images = response?.currentUser?.account?.trip?.bookings
    ?.map((booking: any) => booking?.event.images)
    ?.flat();

  return merge(defaultMetadata, {
    title: response?.firm?.title || defaultTitle,
    description: response?.currentUser?.account?.trip?.cities?.join(", "),
    openGraph: {
      type: "profile",
      title: defaultTitle,
      description: response?.currentUser?.account?.trip?.cities?.join(", "),
      phoneNumbers: [
        response?.currentUser?.account?.primaryPhone,
        ...sharedPhones,
      ],
      emails: [response?.currentUser?.account?.primaryEmail, ...sharedEmails],
      images: [...images, ...sharedImages],
      countryName: response?.firm?.address.country,
    },
  });
};
