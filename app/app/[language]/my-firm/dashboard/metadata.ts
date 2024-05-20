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
import moment from "moment";
import fetchQuery from "../../../../lib/relay/fetchQuery";

/**
 * The page title for the SEO dashboard of myFirm.
 *
 * @type {string}
 * @name PAGE_TITLE
 * @description This variable stores the page title string for the SEO dashboard of myFirm.
 *              The value is set to "seo.myFirm.dashboard.title".
 */
export const PAGE_TITLE: string = "seo.myFirm.dashboard.title";
/**
 * A function that returns an object containing filter variables.
 * @typedef {object} GetVariablesFn
 * @returns {{ bookingsFilter: object, schedulesFilter: object }}
 */
export const getVariables: GetVariablesFn = () => ({
  bookingsFilter: { bookedFor: moment().startOf("minute").toDate() },
  schedulesFilter: { scheduledFor: moment().startOf("minute").toDate() },
});
/**
 * Represents the revalidate flag.
 *
 * @type {number}
 * @description The revalidate flag indicates whether revalidation is required.
 *              A value of 0 indicates revalidation is not required.
 */
export const revalidate: number = 0;
const PageQuery = `
  query PageQuery {
   currentUser {
     account {
        firm {
          status
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

  return generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.myFirm.dashboard.description",
      keywords: "seo.myFirm.dashboard.keywords",
    },
    getVariables,
    props,
    true
  );
};
