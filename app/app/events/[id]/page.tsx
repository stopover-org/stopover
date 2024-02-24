import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import scene_EventPage_QueryNode, {
  scene_EventPage_Query,
} from "artifacts/scene_EventPage_Query.graphql";
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
    typeof scene_EventPage_QueryNode,
    scene_EventPage_Query
  >(scene_EventPage_QueryNode.params, { id: unescape(params.id) });

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
    event(id: $id) {
      title
      description
      images
      availableDates
      firm {
        title
        address {
          country
          city
          street
        }
      }
      address {
        country
        city
        street
      }
    }
  }
`;

export const generateMetadata = async ({
  params,
  searchParams: { language },
}: {
  params: { id: string };
  searchParams: { language?: string };
}): Promise<Metadata> => {
  const response = await fetchQuery(PageQuery, { id: unescape(params.id) });
  const defaultTitle = await translate("models.event.singular", {}, language);
  const keywords = [
    response?.event?.title,
    response?.event?.firm?.title,
    response?.event?.firm?.address?.country,
    response?.event?.firm?.address?.city,
    response?.event?.firm?.address?.street,
    response?.event?.address?.country,
    response?.event?.address?.city,
    response?.event?.address?.street,
    ...(response?.event?.availableDates as string[]),
  ];

  return merge(defaultMetadata, {
    title: response?.event?.title || defaultTitle,
    description: response?.event?.description?.replace(/<[^>]*>?/gm, ""),
    keywords,
    openGraph: {
      keywords,
      title: response?.event?.title || defaultTitle,
      description: response?.event?.description?.replace(/<[^>]*>?/gm, ""),
      phoneNumbers: [response?.event?.firm?.primaryPhone, ...sharedPhones],
      emails: [response?.event?.firm?.primaryEmail, ...sharedEmails],
      images: [...(response?.event?.images || []), ...sharedImages],
      countryName: response?.event?.address?.country,
    },
  });
};
