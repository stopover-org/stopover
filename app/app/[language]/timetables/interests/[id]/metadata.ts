import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { generateCommonMetadata } from "lib/utils/metadata";
import moment from "moment";
import fetchQuery from "lib/relay/fetchQuery";
import { sharedImages } from "lib/utils/defaultMetadata";

export const PAGE_TITLE = "seo.timetable.firms.id.title";
export const getVariables: GetVariablesFn = (props: PageProps) => ({
  id: unescape(props.params.id),
  filters: {
    firmId: unescape(props.params.id),
    startDate: moment().startOf("day").toISOString(),
    endDate: moment().endOf("day").toISOString(),
  },
});
export const revalidate = 0;
const PageQuery = `
  query PageQuery($id: ID!) {
    interest(id: $id) {
      title
      preview
    }
  }
`;
export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const response = await fetchQuery(PageQuery, getVariables(props));
  return generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.timetable.interests.id.description",
      keywords: "seo.timetable.interests.id.keywords",
    },
    getVariables,
    props,
    true,
    { interest: response?.interest?.title, date: moment().calendar() },
    {
      openGraph: {
        images: [response?.interest?.preview, ...sharedImages],
      },
    }
  );
};
