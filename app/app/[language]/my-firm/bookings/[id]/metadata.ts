import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { generateCommonMetadata } from "lib/utils/metadata";
import fetchQuery from "lib/relay/fetchQuery";

export const PAGE_TITLE = "seo.myFirm.bookings.title";
export const getVariables: GetVariablesFn = ({ params }) => ({
  id: unescape(params.id),
});
export const revalidate = 0;

const PageQuery = `
  query PageQuery($id: ID!) {
    booking(id: $id) {
      event {
        seoMetadatum {
          title
          description
          keywords
          featuredImages
        }
      }
    }
  }
`;
export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const response = await fetchQuery(PageQuery, getVariables(props));
  const translateParams = {
    title: response?.booking?.event?.seoMetadatum?.title,
    description: response?.booking?.event?.seoMetadatum?.description,
    keywords: response?.booking?.event?.seoMetadatum?.keywords,
  };
  return generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.myFirm.bookings.id.description",
      keywords: "seo.myFirm.bookings.id.keywords",
    },
    getVariables,
    props,
    true,
    translateParams
  );
};
