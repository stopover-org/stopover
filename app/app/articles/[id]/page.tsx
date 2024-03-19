import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { merge } from "lodash";
import defaultMetadata, {
  sharedEmails,
  sharedImages,
  sharedPhones,
  translate,
} from "lib/utils/defaultMetadata";
import scene_SingleArticle_QueryNode, {
  scene_SingleArticle_Query,
} from "artifacts/scene_SingleArticle_Query.graphql";
import fetchQuery from "lib/relay/fetchQuery";
import PreloadedQueryWrapper, {
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import Scene from "./scene";
import { getVariables } from "./metadata";

const Page = async (props: PageProps) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_SingleArticle_QueryNode,
    scene_SingleArticle_Query
  >(
    scene_SingleArticle_QueryNode.params,
    getVariables<scene_SingleArticle_Query>(props)
  );

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
    article(id: $id) {
      title
      publishedAt
      image
      language
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
  const defaultTitle = await translate("models.article.singular", {}, language);

  return merge(defaultMetadata, {
    title: response?.article?.seoMetadatum?.title || defaultTitle,
    description: response?.article?.seoMetadatum?.description?.replace(
      /<[^>]*>?/gm,
      ""
    ),
    keywords: response?.article?.seoMetadatum?.keywords,
    openGraph: {
      locale: response?.article?.language || language,
      type: "article",
      title: response?.article?.seoMetadatum?.title || defaultTitle,
      phoneNumbers: sharedPhones,
      emails: sharedEmails,
      images: [response?.article?.image, ...sharedImages],
    },
  });
};
