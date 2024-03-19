import { GetVariablesFn } from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { merge } from "lodash";
import fetchQuery from "lib/relay/fetchQuery";
import defaultMetadata, {
  sharedEmails,
  sharedImages,
  sharedPhones,
  translate,
} from "lib/utils/defaultMetadata";
import { GenerateMetadataFn } from "lib/utils/metadata";

export const PAGE_TITLE = "models.event.singular";
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
export const generateMetadata: GenerateMetadataFn = async ({
  params,
}): Promise<Metadata> => {
  const response = await fetchQuery(PageQuery, { id: unescape(params.id) });
  const defaultTitle = await translate(PAGE_TITLE, {}, params.language);

  return merge(defaultMetadata, {
    title: response?.event?.seoMetadatum?.title || defaultTitle,
    description: response?.event?.seoMetadatum?.description,
    keywords: response?.event?.seoMetadatum?.keywords,
    openGraph: {
      locale: params.language,
      title: response?.event?.seoMetadatum?.title || defaultTitle,
      keywords: response?.event?.seoMetadatum?.keywords,
      description: response?.event?.seoMetadatum?.description,
      phoneNumbers: [response?.event?.firm?.primaryPhone, ...sharedPhones],
      emails: [response?.event?.firm?.primaryEmail, ...sharedEmails],
      images: [
        ...(response?.event?.seoMetadatum?.featuredImages || []),
        ...sharedImages,
      ],
      countryName: response?.event?.address?.country,
    },
  });
};
