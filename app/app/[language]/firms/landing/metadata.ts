import { GetVariablesFn } from "components/shared/relay/PreloadedQueryWrapper";
import defaultMetadata, { translate } from "lib/utils/defaultMetadata";
import { merge } from "lodash";
import { Metadata } from "next";

export const PAGE_TITLE = "";
export const getVariables: GetVariablesFn = () => ({});
export const revalidate = 0;
export const generateMetadata = async ({
  params: { language },
}: {
  params: { language: string };
}): Promise<Metadata> => {
  const title = await translate(
    "scenes.firms.firmLandingScene.subtitle",
    {},
    language
  );

  const description = await translate(
    "scenes.firms.firmLandingScene.points",
    {},
    language
  );

  return merge(defaultMetadata, {
    title,
    description,
    openGraph: {
      locale: language,
      title,
      description,
    },
  });
};
