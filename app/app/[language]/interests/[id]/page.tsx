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
import PreloadedQueryWrapper from "components/shared/relay/PreloadedQueryWrapper";
import Scene from "./scene";

const Page = async ({ params }: { params: Record<string, string> }) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_AttendeeInterest_QueryNode,
    scene_AttendeeInterest_Query
  >(scene_AttendeeInterest_QueryNode.params, {
    id: unescape(params.id),
    filters: { interests: [unescape(params.id)] },
  });

  return (
    <PreloadedQueryWrapper
      preloadedQuery={preloadedQuery}
      cookies={cookies().getAll()}
    >
      <Scene />
    </PreloadedQueryWrapper>
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
