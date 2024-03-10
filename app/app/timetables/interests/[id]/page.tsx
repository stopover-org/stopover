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
      title
      preview
      originalTitle
      description
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
  const defaultFirmTitle = await translate(
    "models.interest.singular",
    {},
    language
  );

  const defaultScheduleTitle = await translate(
    "models.schedule.plural",
    {},
    language
  );
  const defaultTitle = `${defaultFirmTitle} (${defaultScheduleTitle})`;

  return merge(defaultMetadata, {
    title:
      `${response?.interest?.title} - ${defaultScheduleTitle}` || defaultTitle,
    description: response?.interest?.description?.replace(/<[^>]*>?/gm, ""),
    openGraph: {
      type: "profile",
      title:
        `${response?.firm?.title} - ${defaultScheduleTitle}` || defaultTitle,
      description: response?.firm?.description?.replace(/<[^>]*>?/gm, ""),
      phoneNumbers: [response?.firm?.primaryPhone, ...sharedPhones],
      emails: [response?.firm?.primaryEmail, ...sharedEmails],
      images: [response?.firm?.image, ...sharedImages],
      countryName: response?.firm?.address?.country,
    },
  });
};
