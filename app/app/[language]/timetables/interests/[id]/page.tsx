import React from "react";
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
import scene_InterestTimetable_QueryNode, {
  scene_InterestTimetable_Query,
} from "artifacts/scene_InterestTimetable_Query.graphql";
import moment from "moment";
import QueryWrapper from "./query";

const Page = async ({ params }: { params: Record<string, string> }) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_InterestTimetable_QueryNode,
    scene_InterestTimetable_Query
  >(scene_InterestTimetable_QueryNode.params, {
    id: unescape(params.id),
    filters: {
      interests: [unescape(params.id)],
      startDate: moment().startOf("day").toISOString(),
      endDate: moment().endOf("day").toISOString(),
    },
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
      seoMetadatum {
        title
        description
        keywords
        language
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
  const defaultTitle = await translate(
    "models.interest.singular",
    {},
    language
  );

  return merge(defaultMetadata, {
    title: response?.interest?.seoMetadatum?.title || defaultTitle,
    description: response?.interest?.seoMetadatum?.description?.replace(
      /<[^>]*>?/gm,
      ""
    ),
    keywords: response?.interest?.seoMetadatum?.keywords,
    openGraph: {
      locale: language,
      type: "profile",
      title: response?.interest?.seoMetadatum?.title || defaultTitle,
      phoneNumbers: sharedPhones,
      emails: sharedEmails,
      images: [response?.interest?.preview, ...sharedImages],
    },
  });
};
