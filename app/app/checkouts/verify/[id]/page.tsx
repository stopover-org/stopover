import React from "react";
import scene_VerifyCheckout_QueryNode, {
  scene_VerifyCheckout_Query,
} from "artifacts/scene_VerifyCheckout_Query.graphql";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { merge } from "lodash";
import defaultMetadata, { translate } from "lib/utils/defaultMetadata";
import QueryWrapper from "./query";

const Page = async ({ params }: { params: Record<string, string> }) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_VerifyCheckout_QueryNode,
    scene_VerifyCheckout_Query
  >(scene_VerifyCheckout_QueryNode.params, { id: unescape(params.id) });

  return (
    <QueryWrapper
      preloadedQuery={preloadedQuery}
      cookies={cookies().getAll()}
    />
  );
};

export default Page;

export const revalidate = 0;

export const generateMetadata = async (): Promise<Metadata> => {
  const title = await translate("models.payment.plural");
  return merge(defaultMetadata, {
    title,
    openGraph: {
      title,
    },
  });
};
