"use client";

import { memo } from "react";
import { graphql, useFragment, useLazyLoadQuery } from "react-relay";
import { useParams } from "next/navigation";
import { scene_Scheduling_Query } from "@/app/scheduler/[id]/__generated__/scene_Scheduling_Query.graphql";
import NoAccess from "@/components/NoAccess";
import { CalendarDaysIcon, TrashIcon } from "@heroicons/react/24/solid";
import ToggleSchedulingForm from "@/forms/ToggleSchedulingForm";
import { scene_SchedulingFragment$key } from "@/app/scheduler/[id]/__generated__/scene_SchedulingFragment.graphql";

const Scene = () => {
  const params = useParams();
  const query = useLazyLoadQuery<scene_Scheduling_Query>(
    graphql`
      query scene_Scheduling_Query($id: ID!) {
        scheduling(id: $id) {
          ...scene_SchedulingFragment
        }
      }
    `,
    { id: params.id as string },
  );

  const scheduling = useFragment<scene_SchedulingFragment$key>(
    graphql`
      fragment scene_SchedulingFragment on Scheduling {
        id
        name
        status
        nextScheduleTime
        adapterType
        configuration
        ...ToggleSchedulingForm_SchedulingFragment
      }
    `,
    query.scheduling,
  );

  if (!scheduling) {
    return <NoAccess signIn={false} />;
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
              <ToggleSchedulingForm fragmentRef={scheduling} />
              <div className="pl-2">
                <button
                  type="button"
                  className="inline-flex bg-amber-500 text-white items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-transparent hover:bg-amber-600"
                >
                  <CalendarDaysIcon className="h-6 w-6" />
                  Schedule Now
                </button>
              </div>
              <div className="pl-2">
                <button
                  type="button"
                  className="inline-flex bg-red-700 text-white items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-transparent hover:bg-red-800"
                >
                  <TrashIcon className="h-6 w-6" />
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="text-2sm">{scheduling.id}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(Scene);
