import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import {
  generateCommonMetadata,
  notFoundMetadata,
  redirectMetadata,
} from "lib/utils/metadata";
import fetchQuery from "lib/relay/fetchQuery";

export const PAGE_TITLE = "seo.myFirm.events.id.edit.title";
export const getVariables: GetVariablesFn = (props: PageProps) => ({
  id: unescape(props.params.id),
});
export const revalidate = 0;
const PageQuery = `
  query PageQuery($id: ID!) {
   currentUser {
     account {
        firm {
          event(id: $id) {
            seoMetadatum {
              title
              description
              keywords
            }
          }
        }
      }
    }
  }
`;
export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const response = await fetchQuery(PageQuery, getVariables(props));

  if (!response?.currentUser?.account?.firm) {
    return notFoundMetadata(props.params.language);
  }

  if (response?.currentUser?.account?.firm?.status === "removed") {
    return redirectMetadata(
      `${props.params.language}/firms/new`,
      props.params.language
    );
  }

  const translateParams = {
    title: response?.currentUser?.account?.firm?.event?.seoMetadatum?.title,
    description:
      response?.currentUser?.account?.firm?.event?.seoMetadatum?.description,
    keywords:
      response?.currentUser?.account?.firm?.event?.seoMetadatum?.keywords,
  };

  return generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.myFirm.events.id.edit.description",
      keywords: "seo.myFirm.events.id.edit.keywords",
    },
    getVariables,
    props,
    true,
    translateParams
  );
};
