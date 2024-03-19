import { parseValue } from "lib/hooks/useQuery";
import { GetVariablesFn } from "components/shared/relay/PreloadedQueryWrapper";
import moment, { Moment } from "moment";
import { EventsFilter } from "artifacts/scene_EventsPage_Query.graphql";
import { Metadata } from "next";
import { merge } from "lodash";
import defaultMetadata, { translate } from "../../../lib/utils/defaultMetadata";

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
export const PAGE_TITLE = "models.event.plural";
export const getVariables: GetVariablesFn = ({
  searchParams,
  humanReadable,
}) => {
  const query = Object.entries(searchParams).reduce(
    (acc: EventsFilter, entry: [string, any]) => {
      try {
        if (entry[0] === "dates") {
          const dates = filterParsers
            .startDate(entry[1])
            .map((val: string) => moment(val))
            .filter((dt: Moment) => dt.isValid());

          if (humanReadable) {
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

export const generateMetadata = async ({
  searchParams,
  params: { language },
}: any): Promise<Metadata> => {
  let variables = getVariables({ searchParams, humanReadable: true });
  const defaultVariables = {
    city: "Serbia",
    startDate: moment().calendar(),
    endDate: moment().calendar(),
    categories: [].join(" "),
  };

  variables = merge(defaultVariables, variables);

  const title = await translate("seo.events.title", variables, language);
  const description = await translate(
    "seo.events.description",
    variables,
    language
  );
  const keywords = await translate("seo.events.keywords", variables, language);

  return merge(defaultMetadata, {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      keywords,
    },
  });
};
