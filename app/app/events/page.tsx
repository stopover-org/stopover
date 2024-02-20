import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import moment, { Moment } from "moment";
import scene_EventsPage_QueryNode, {
  EventsFilter,
  scene_EventsPage_Query,
} from "artifacts/scene_EventsPage_Query.graphql";
import { parseValue } from "lib/hooks/useQuery";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { merge } from "lodash";
import defaultMetadata, { translate } from "lib/utils/defaultMetadata";
import QueryWrapper from "./query";

const filterParsers = {
  query: (value: string) => parseValue(value),
  interests: (value: string) => parseValue(value),
  minPrice: (value: string) => parseInt(value, 10),
  maxPrice: (value: string) => parseInt(value, 10),
};

const Page = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const filters: EventsFilter = React.useMemo(() => {
    const query = Object.entries(searchParams).reduce(
      (acc: EventsFilter, entry: [string, any]) => {
        // @ts-ignore
        const parser = filterParsers[entry[0]];
        if (parser) {
          acc[entry[0] as keyof EventsFilter] = parser(entry[1]);
        }
        return acc;
      },
      {}
    );

    if (searchParams.dates) {
      const dates = parseValue(searchParams.dates)
        .map((val: string) => moment(val))
        .filter((dt: Moment) => dt.isValid());

      if (dates.length === 2) {
        // eslint-disable-next-line prefer-destructuring
        query.startDate = dates[0].toISOString();

        // eslint-disable-next-line prefer-destructuring
        query.endDate = dates[1].toISOString();
      }
    }
    return query;
  }, [searchParams]);

  const preloadedQuery = await loadSerializableQuery<
    typeof scene_EventsPage_QueryNode,
    scene_EventsPage_Query
  >(scene_EventsPage_QueryNode.params, {
    filters,
  });

  return (
    <QueryWrapper
      preloadedQuery={preloadedQuery}
      cookies={cookies().getAll()}
    />
  );
};

export default Page;

export const revalidate = 0;

export const generateMetadata = async (): Promise<Metadata> => {
  const title = await translate("models.event.plural");
  return merge(defaultMetadata, {
    title,
    openGraph: {
      title,
    },
  });
};
