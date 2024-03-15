import React from "react";
import scene_AttendeesFirm_QueryNode, {
  scene_AttendeesFirm_Query,
} from "artifacts/scene_AttendeesFirm_Query.graphql";
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
    typeof scene_AttendeesFirm_QueryNode,
    scene_AttendeesFirm_Query
  >(scene_AttendeesFirm_QueryNode.params, { id: unescape(params.id) });

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
    firm(id: $id) {
      title
      image
      primaryEmail
      primaryPhone
      description
      address {
        country
      }
      seoMetadatum {
        title
        description
        keywords
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
  const defaultTitle = await translate("models.firm.singular", {}, language);

  return merge(defaultMetadata, {
    title: response?.firm?.seoMetadatum?.title || defaultTitle,
    description: response?.firm?.seoMetadatum?.description?.replace(
      /<[^>]*>?/gm,
      ""
    ),
    keywords: response?.firm?.seoMetadatum?.keywords,
    openGraph: {
      locale: language,
      type: "profile",
      title: response?.firm?.seoMetadatum?.title || defaultTitle,
      description: response?.firm?.seoMetadatum?.description?.replace(
        /<[^>]*>?/gm,
        ""
      ),
      phoneNumbers: [response?.firm?.primaryPhone, ...sharedPhones],
      emails: [response?.firm?.primaryEmail, ...sharedEmails],
      images: [response?.firm?.image, ...sharedImages],
      countryName: response?.firm?.address?.country,
    },
  });
};
