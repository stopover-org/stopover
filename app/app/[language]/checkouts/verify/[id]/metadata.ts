import { GetVariablesFn } from "components/shared/relay/PreloadedQueryWrapper";
import {
  generateCommonMetadata,
  GenerateMetadataFn,
  notFoundMetadata,
} from "lib/utils/metadata";
import fetchQuery from "lib/relay/fetchQuery";
import moment from "moment";

export const PAGE_TITLE = "seo.checkouts.verify.id.title";
export const getVariables: GetVariablesFn = ({ params }) => ({
  id: unescape(params.id),
});
export const revalidate = 0;

const PageQuery = `
  query PageQuery($id: ID!) {
    booking(id: $id) {
      id
      event {
        title
      }
    }
  }
`;
export const generateMetadata: GenerateMetadataFn = async (props) => {
  const response = await fetchQuery(PageQuery, getVariables(props));
  const translateParams = {
    title: response?.booking?.event?.title,
    date: moment(response?.booking?.bookedFor).calendar(),
  };

  if (!response?.booking?.id) {
    return notFoundMetadata(props.params.language);
  }

  const metadata = generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.checkouts.verify.id.description",
      keywords: "seo.checkouts.verify.id.keywords",
    },
    getVariables,
    props,
    false,
    translateParams
  );

  return metadata;
};
