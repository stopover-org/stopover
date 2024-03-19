import { GetVariablesFn } from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import defaultMetadata, { translate } from "lib/utils/defaultMetadata";
import { merge } from "lodash";

export const PAGE_TITLE = "scenes.attendees.firms.newFirmScene.title";
export const getVariables: GetVariablesFn = () => ({});
export const revalidate = 0;
export const generateMetadata = async ({
  params: { language },
}: {
  params: { language: string };
}): Promise<Metadata> => {
  const title = await translate(PAGE_TITLE, {}, language);
  return merge(defaultMetadata, {
    title,
    openGraph: {
      title,
    },
  });
};
