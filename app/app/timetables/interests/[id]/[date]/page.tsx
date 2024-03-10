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
import scene_DateInterestTimetable_QueryNode, {
  scene_DateInterestTimetable_Query,
} from "artifacts/scene_DateInterestTimetable_Query.graphql";
import moment from "moment";
import { urlSafeDateFormat } from "lib/utils/dates";
import QueryWrapper from "./query";

const Page = async ({ params }: { params: Record<string, string> }) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_DateInterestTimetable_QueryNode,
    scene_DateInterestTimetable_Query
  >(scene_DateInterestTimetable_QueryNode.params, {
    id: unescape(params.id),
    filters: {
      interests: [unescape(params.id)],
      startDate: moment(params.date, urlSafeDateFormat)
        .startOf("day")
        .toISOString(),
      endDate: moment(params.dateurlSafeDateFormat).endOf("day").toISOString(),
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
  params: { id: string; date: string };
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
  const defaultTitle = `${defaultFirmTitle} (${defaultScheduleTitle} - ${params.date})`;

  return merge(defaultMetadata, {
    title:
      `${response?.interest?.title} - ${defaultScheduleTitle} - ${params.date}` ||
      defaultTitle,
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
