import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { generateCommonMetadata } from "lib/utils/metadata";
import moment from "moment";

export const PAGE_TITLE = "seo.myFirm.dashboard.title";
export const getVariables: GetVariablesFn = () => ({
  bookingsFilter: { bookedFor: moment().toDate() },
  schedulesFilter: { scheduledFor: moment().toDate() },
});
export const revalidate = 0;
export const generateMetadata = async (props: PageProps): Promise<Metadata> =>
  generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.myFirm.dashboard.description",
      keywords: "seo.myFirm.dashboard.keywords",
    },
    getVariables,
    props,
    true
  );
