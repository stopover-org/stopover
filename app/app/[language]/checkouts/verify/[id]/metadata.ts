import { GetVariablesFn } from "components/shared/relay/PreloadedQueryWrapper";
import defaultMetadata, { translate } from "lib/utils/defaultMetadata";
import { merge } from "lodash";
import { GenerateMetadataFn } from "lib/utils/metadata";
import fetchQuery from "lib/relay/fetchQuery";

export const PAGE_TITLE = "seo.checkouts.verify.id.title";
export const getVariables: GetVariablesFn = ({ params }) => ({
  id: unescape(params.id),
});
export const revalidate = 0;

const PageQuery = `
  query PageQuery($id: ID!) {
    booking(id: $id) {
      event {
        title
      }
    }
  }
`;
export const generateMetadata: GenerateMetadataFn = async ({ params }) => {
  const response = await fetchQuery(PageQuery, getVariables(params));
  const title = await translate(
    PAGE_TITLE,
    { title: response?.booking?.event?.title },
    params.language
  );
  return merge(defaultMetadata, {
    title,
    openGraph: {
      locale: params.language,
      title,
    },
  });
};
