import React from "react";
import scene_FirmSchedules_QueryNode, {
  scene_FirmSchedules_Query,
} from "artifacts/scene_FirmSchedules_Query.graphql";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import { parseValue } from "lib/hooks/useQuery";
import { SchedulesFilter } from "artifacts/SchedulesSceneFirmFragment.graphql";
import QueryWrapper from "./query";

const filterParsers = {
  eventIds: (value: string) => parseValue(value),
  scheduledFor: (value: string) => parseValue(value),
};

const Page = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const filters: SchedulesFilter = React.useMemo(() => {
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
    return query;
  }, [searchParams]);

  const preloadedQuery = await loadSerializableQuery<
    typeof scene_FirmSchedules_QueryNode,
    scene_FirmSchedules_Query
  >(scene_FirmSchedules_QueryNode.params, { filters });

  return (
    <QueryWrapper
      preloadedQuery={preloadedQuery}
      cookies={cookies().getAll()}
    />
  );
};

export default Page;

export const revalidate = 0;

export const generateMetadata = () => ({
  title: "Schedules",
});
