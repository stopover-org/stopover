import { GetVariablesFn } from "components/shared/relay/PreloadedQueryWrapper";
import { GenerateMetadataFn } from "lib/utils/metadata";
import defaultMetadata, { translate } from "lib/utils/defaultMetadata";
import { merge } from "lodash";

export const PAGE_TITLE = "scenes.signInScene.signInAction";
export const getVariables: GetVariablesFn = () => ({});
export const revalidate = 0;
export const generateMetadata: GenerateMetadataFn = async ({ params }) => {
  const title = await translate(PAGE_TITLE, {}, params.language);
  return merge(defaultMetadata, {
    title,
    openGraph: {
      title,
    },
  });
};
