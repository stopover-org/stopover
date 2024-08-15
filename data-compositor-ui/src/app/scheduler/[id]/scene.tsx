"use client";

import { memo } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
import { useParams } from "next/navigation";
import { scene_Scheduling_Query } from "@/app/scheduler/[id]/__generated__/scene_Scheduling_Query.graphql";
import NoAccess from "@/components/NoAccess";

const Scene = () => {
  const params = useParams();
  const { scheduling } = useLazyLoadQuery<scene_Scheduling_Query>(
    graphql`
      query scene_Scheduling_Query($id: ID!) {
        scheduling(id: $id) {
          id
          name
          status
          nextScheduleTime
          adapterType
          configuration
        }
      }
    `,
    { id: params.id as string },
  );

  if (!scheduling) {
    return <NoAccess />;
  }

  return (
    <div className="flex items-start justify-start p-6 lg:px-8">
      <div className="min-w-0 w-[100%] pr-2">
        <div className="flex w-[100%] flex-col">
          <div className="flex justify-between w-[100%]">
            <div className="flex justify-start items-center">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight flex items-center">
                Scheduling {scheduling.name}
              </h2>
              <span className="ml-2 py-1 px-2 text-xs rounded-2 inline-block whitespace-nowrap text-center bg-amber-200 text-amber-700 align-baseline font-bold uppercase leading-none">
                {scheduling.status}
              </span>
              <span className="ml-2 py-1 px-2 text-xs rounded-2 inline-block whitespace-nowrap text-center bg-amber-200 text-amber-700 align-baseline font-bold uppercase leading-none">
                {scheduling.adapterType}
              </span>
            </div>
            <div className="flex">
              <div className="pl-2">Toggle</div>
              <div className="pl-2">Schedule Now</div>
              <div className="pl-2">Delete</div>
            </div>
          </div>
          <div className="text-2sm">{scheduling.id}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(Scene);
