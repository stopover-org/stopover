import { Metadata } from "next";
import { merge } from "lodash";
import fetchQuery from "lib/relay/fetchQuery";
import defaultMetadata, {
  sharedEmails,
  sharedImages,
  sharedPhones,
} from "lib/utils/defaultMetadata";
import { GetVariablesFn } from "components/shared/relay/PreloadedQueryWrapper";

export const PAGE_TITLE = "general.404";
export const getVariables: GetVariablesFn = ({ params }) => ({
  id: unescape(params.id),
});
export const revalidate = 0;
const PageQuery = `
  query PageQuery($id: ID!) {
    firm(id: $id) {
      title
      image
      primaryEmail
      primaryPhone
      description
      address {
        country
      }
      seoMetadatum {
        title
        description
        keywords
        featuredImages
      }
    }
  }
`;

export const generateMetadata = async ({
  params,
}: {
  params: { id: string; language: string };
}): Promise<Metadata> => {
  const response = await fetchQuery(PageQuery, getVariables(params));

  return merge(defaultMetadata, {
    title: response?.firm?.seoMetadatum?.title,
    description: response?.firm?.seoMetadatum?.description,
    keywords: response?.firm?.seoMetadatum?.keywords,
    openGraph: {
      locale: params.language,
      type: "profile",
      title: response?.firm?.seoMetadatum?.title,
      description: response?.firm?.seoMetadatum?.description,
      phoneNumbers: [response?.firm?.primaryPhone, ...sharedPhones],
      emails: [response?.firm?.primaryEmail, ...sharedEmails],
      images: [
        ...(response?.firm?.seoMetadatum?.featuredImages || []),
        ...sharedImages,
      ],
      countryName: response?.firm?.address?.country,
    },
  });
};
