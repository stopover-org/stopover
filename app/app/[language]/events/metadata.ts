import { parseValue } from "lib/hooks/useQuery";
import { GetVariablesFn } from "components/shared/relay/PreloadedQueryWrapper";
import moment, { Moment } from "moment";
import { EventsFilter } from "artifacts/scene_EventsPage_Query.graphql";
import { Metadata } from "next";
import { generateCommonMetadata } from "lib/utils/metadata";

export const filterParsers: Record<
  string,
  (value: string, key?: string) => any
> = {
  query: (value: string): EventsFilter["query"] => parseValue(value),
  interests: (value: string): EventsFilter["interests"] => parseValue(value),
  minPrice: (value: string): EventsFilter["minPrice"] => parseInt(value, 10),
  maxPrice: (value: string): EventsFilter["maxPrice"] => parseInt(value, 10),
  city: (value: string): EventsFilter["city"] => parseValue(value),
  endDate: (value: string): EventsFilter["endDate"] => {
    const dates = parseValue(value);
    if (Array.isArray(dates) && dates.length === 2) {
      return dates[1];
    }
    return undefined;
  },
  startDate: (value: string): EventsFilter["startDate"] => {
    const dates = parseValue(value);
    if (Array.isArray(dates) && dates.length === 2) {
      return dates[0];
    }
    return undefined;
  },
};
export const PAGE_TITLE = "seo.events.title";
export const getVariables: GetVariablesFn = ({ params, searchParams }) => {
  const query = Object.entries(searchParams).reduce(
    (acc: EventsFilter, entry: [string, any]) => {
      try {
        if (entry[0] === "dates") {
          const dates = filterParsers
            .startDate(entry[1])
            .map((val: string) => moment(val))
            .filter((dt: Moment) => dt.isValid());

          if (params.humanReadable) {
            if (dates[1]) {
              acc.startDate = acc.startDate.calendar();
            }
            if (dates[0]) {
              acc.endDate = acc.endDate.calendar();
            }
          } else {
            if (dates[1]) {
              acc.startDate = acc.startDate.toISOString();
            }
            if (dates[0]) {
              acc.endDate = acc.endDate.toISOString();
            }
          }
        } else {
          const key: keyof EventsFilter = entry[0] as keyof EventsFilter;
          const value = entry[1];
          const parser = filterParsers[key];
          if (parser) {
            acc[key] = parser(value);
          }
        }
        return acc;
      } catch (error) {
        console.warn(error);
        return acc;
      }
    },
    {}
  );
  return { filters: query };
};

export const revalidate = 0;

export const generateMetadata = async (props: {
  searchParams: Record<string, string>;
  params: { language: string };
}): Promise<Metadata> => {
  const defaultVariables = {
    city: "Serbia",
    startDate: moment().calendar(),
    endDate: moment().calendar(),
    categories: [].join(" "),
  };
  return generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.events.description",
      keywords: "seo.events.keywords",
    },
    getVariables,
    { ...props, humanReadable: true },
    true,
    defaultVariables
  );
};
