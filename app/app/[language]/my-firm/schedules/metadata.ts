import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { generateCommonMetadata } from "lib/utils/metadata";
import { parseValue } from "lib/hooks/useQuery";
import { SchedulesFilter } from "artifacts/SchedulesSceneFirmFragment.graphql";

const filterParsers = {
  eventIds: (value: string) => parseValue(value),
  scheduledFor: (value: string) => parseValue(value),
};
export const PAGE_TITLE = "seo.myFirm.schedules.title";
export const getVariables: GetVariablesFn = ({ searchParams }) => {
  const query = Object.entries(searchParams).reduce(
    (acc: SchedulesFilter, entry: [string, any]) => {
      // @ts-ignore
      const parser = filterParsers[entry[0]];
      if (parser) {
        acc[entry[0] as keyof SchedulesFilter] = parser(entry[1]);
      }
      return acc;
    },
    {}
  );

  return { filters: query };
};
export const revalidate = 0;
export const generateMetadata = async (props: PageProps): Promise<Metadata> =>
  generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.myFirm.schedules.description",
      keywords: "seo.myFirm.schedules.keywords",
    },
    getVariables,
    props,
    true
  );
