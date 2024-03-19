import { GetVariablesFn } from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import fetchQuery from "lib/relay/fetchQuery";
import {
  sharedEmails,
  sharedImages,
  sharedPhones,
} from "lib/utils/defaultMetadata";
import { generateCommonMetadata, GenerateMetadataFn } from "lib/utils/metadata";

export const PAGE_TITLE = "seo.events.id.title";
export const getVariables: GetVariablesFn = ({ params }) => ({
  id: unescape(params.id),
});
export const revalidate = 1800;

const PageQuery = `
  query PageQuery($id: ID!) {
    event(id: $id) {
      title
      description
      images
      availableDates
      firm {
        primaryPhone
        primaryEmail
      }
      address {
        country
      }
      seoMetadatum {
        title
        description
        keywords
        language
        featuredImages
      }
    }
  }
`;
export const generateMetadata: GenerateMetadataFn = async (
  props
): Promise<Metadata> => {
  const response = await fetchQuery(PageQuery, getVariables(props));
  const translateParams = {
    title: response?.event?.seoMetadatum?.title,
    description: response?.event?.seoMetadatum?.description,
    keywords: response?.event?.seoMetadatum?.keywords,
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
        phoneNumbers: [response?.event?.firm?.primaryPhone, ...sharedPhones],
        emails: [response?.event?.firm?.primaryEmail, ...sharedEmails],
        images: [
          ...(response?.event?.seoMetadatum?.featuredImages || []),
          ...sharedImages,
        ],
        countryName: response?.event?.address?.country,
      },
    }
  );

  return metadata;
};
