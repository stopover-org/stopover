import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { generateCommonMetadata } from "lib/utils/metadata";
import fetchQuery from "lib/relay/fetchQuery";

export const PAGE_TITLE = "seo.articles.id.title";
export const getVariables: GetVariablesFn = ({ params }) => ({
  id: unescape(params.id),
});
export const revalidate = 0;

const PageQuery = `
  query PageQuery($id: ID!) {
    article(id: $id) {
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
    title: response?.article?.seoMetadatum?.title,
    description: response?.article?.seoMetadatum?.description,
    keywords: response?.article?.seoMetadatum?.keywords,
  };
  return generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.articles.id.description",
      keywords: "seo.articles.id.keywords",
    },
    getVariables,
    props,
    true,
    translateParams
  );
};
