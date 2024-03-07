import React from "react";
import scene_AttendeeInterest_QueryNode, {
  scene_AttendeeInterest_Query,
} from "artifacts/scene_AttendeeInterest_Query.graphql";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import defaultMetadata, {
  sharedEmails,
  sharedImages,
  sharedPhones,
  translate,
} from "lib/utils/defaultMetadata";
import { merge } from "lodash";
import fetchQuery from "lib/relay/fetchQuery";
import { Metadata } from "next";
import QueryWrapper from "./query";

const Page = async ({ params }: { params: Record<string, string> }) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_AttendeeInterest_QueryNode,
    scene_AttendeeInterest_Query
  >(scene_AttendeeInterest_QueryNode.params, {
    id: unescape(params.id),
    filters: { interests: [unescape(params.id)] },
  });

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
    interest(id: $id) {
      title
      slug
      preview
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
  const defaultTitle = await translate(
    "models.interest.singular",
    {},
    language
  );

  return merge(defaultMetadata, {
    title: response?.interest?.title || defaultTitle,
    description: response?.interest?.description?.replace(/<[^>]*>?/gm, ""),
    openGraph: {
      type: "profile",
      title: response?.interest?.title || defaultTitle,
      phoneNumbers: sharedPhones,
      emails: sharedEmails,
      images: [response?.interest?.preview, ...sharedImages],
    },
  });
};
