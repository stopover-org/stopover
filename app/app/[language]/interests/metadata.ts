import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { generateCommonMetadata, notFoundMetadata } from "lib/utils/metadata";
import fetchQuery from "../../../lib/relay/fetchQuery";

export const PAGE_TITLE = "seo.interests.title";
export const getVariables: GetVariablesFn = () => ({});
export const revalidate = 0;
const PageQuery = `
  query PageQuery {
    currentUser {
      serviceUser
    }
  }
`;
export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const response = await fetchQuery(PageQuery, getVariables(props));
  if (!response?.currentUser?.serviceUser) {
    return notFoundMetadata(props.params.language);
  }

  return generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.interests.description",
      keywords: "seo.interests.keywords",
    },
    getVariables,
    props
  );
};
