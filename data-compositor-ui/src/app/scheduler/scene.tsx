"use client";

import { graphql, useLazyLoadQuery, usePaginationFragment } from "react-relay";
import { memo } from "react";
import { truncatedUUID } from "@/utils/truncateUUID";
import { scene_SchedulingsConnection_Query } from "@/app/scheduler/__generated__/scene_SchedulingsConnection_Query.graphql";
import { scene_Schedulings_Fragment$key } from "@/app/scheduler/__generated__/scene_Schedulings_Fragment.graphql";

const Scene = () => {
  const query = useLazyLoadQuery<scene_SchedulingsConnection_Query>(
    graphql`
      query scene_SchedulingsConnection_Query {
        ...scene_Schedulings_Fragment
      }
    `,
    {},
  );

  const {
    data: { schedulings },
  } = usePaginationFragment<
    scene_SchedulingsConnection_Query,
    scene_Schedulings_Fragment$key
  >(
    graphql`
      fragment scene_Schedulings_Fragment on Query
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 10 }
        after: { type: "String", defaultValue: "" }
      )
      @refetchable(queryName: "SchedulingsPaginationQuery") {
        schedulings(first: $first, after: $after)
          @connection(key: "SchedulingsPagination_schedulings") {
          edges {
            node {
              id
              name
              status
              nextScheduleTime
              adapterType
            }
          }
        }
      }
    `,
    query,
  );

  return (
    <div className="mt-0 flex lg:ml-4">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 min-w-[1024px]">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Next Schedule Time
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Adapter Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {schedulings.edges.map(({ node: scheduling }) => (
                    <tr className="border-b border-neutral-200 dark:border-white/10">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {truncatedUUID(scheduling.id)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {scheduling.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {scheduling.nextScheduleTime}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {scheduling.status}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {scheduling.adapterType}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Scene);
