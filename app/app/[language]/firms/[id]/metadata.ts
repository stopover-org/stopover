import { Metadata } from "next";
import fetchQuery from "lib/relay/fetchQuery";
import {
  sharedEmails,
  sharedImages,
  sharedPhones,
} from "lib/utils/defaultMetadata";
import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { generateCommonMetadata } from "../../../../lib/utils/metadata";

export const PAGE_TITLE = "seo.firms.id.title";
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

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const response = await fetchQuery(PageQuery, getVariables(props));
  const translateParams = {
    title: response?.firm?.seoMetadatum?.title,
    description: response?.firm?.seoMetadatum?.description,
    keywords: response?.firm?.seoMetadatum?.keywords,
  };

  const metadata = generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.events.id.description",
      keywords: "seo.events.id.keywords",
    },
    getVariables,
    props,
    false,
    translateParams,
    {
      openGraph: {
        type: "profile",
        phoneNumbers: [response?.firm?.primaryPhone, ...sharedPhones],
        emails: [response?.firm?.primaryEmail, ...sharedEmails],
        images: [
          ...(response?.firm?.seoMetadatum?.featuredImages || []),
          ...sharedImages,
        ],
        countryName: response?.firm?.address?.country,
      },
    }
  );

  return metadata;
};
