import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { generateCommonMetadata, redirectMetadata } from "lib/utils/metadata";
import fetchQuery from "lib/relay/fetchQuery";
import {
  sharedEmails,
  sharedImages,
  sharedPhones,
} from "lib/utils/defaultMetadata";

export const PAGE_TITLE = "seo.trips.id.title";
export const getVariables: GetVariablesFn = (props: PageProps) => ({
  id: unescape(props.params.id),
});
export const revalidate = 0;

const PageQuery = `
  query PageQuery($id: ID!) {
    currentUser {
      status
      account {
        primaryPhone
        primaryEmail
        trip(tripId: $id) {
          cities
          bookings {
            event {
              images
            }
          }
        }
      }
    }
  }
`;
export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const response = await fetchQuery(PageQuery, getVariables(props));

  if (!response?.currentUser?.account?.trip) {
    return redirectMetadata(
      `${props.params.language}/trips`,
      props.params.language
    );
  }

  const translateParams = {
    cities: response?.currentUser?.account?.trip?.cities,
    startDate: response?.currentUser?.account?.trip?.startDate,
    endDate: response?.currentUser?.account?.trip?.endDate,
  };

  const images = response?.currentUser?.account?.trip?.bookings
    ?.map((booking: any) => booking?.event.images)
    ?.flat()
    ?.filter(Boolean);
  return generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.trips.id.description",
      keywords: "seo.trips.id.keywords",
    },
    getVariables,
    props,
    true,
    translateParams,
    {
      openGraph: {
        phoneNumbers: [
          response?.currentUser?.account?.primaryPhone,
          ...sharedPhones,
        ]?.filter(Boolean),
        emails: [
          response?.currentUser?.account?.primaryEmail,
          ...sharedEmails,
        ]?.filter(Boolean),
        images: [...images, ...sharedImages]?.filter(Boolean),
      },
    }
  );
};
