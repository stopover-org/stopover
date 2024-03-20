import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { generateCommonMetadata } from "lib/utils/metadata";
import fetchQuery from "lib/relay/fetchQuery";

export const PAGE_TITLE = "seo.interests.title";
export const getVariables: GetVariablesFn = () => ({});
export const revalidate = 0;

const PageQuery = `
  query PageQuery($id: ID!) {
    interest(id: $id) {
      seoMetadatum {
        title
        description
        keywords
        featuredImages
      }
    }
  }
`;
export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const response = await fetchQuery(PageQuery, getVariables(props));
  const translateParams = {
    title: response?.interest?.seoMetadatum?.title,
    description: response?.interest?.seoMetadatum?.description,
    keywords: response?.interest?.seoMetadatum?.keywords,
  };
  return generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.interests.id.description",
      keywords: "seo.interests.id.keywords",
    },
    getVariables,
    props,
    false,
    translateParams
  );
};
