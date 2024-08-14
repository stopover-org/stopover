import { memo } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import Scene from "./scene";

const Page = () => (
  <div className="flex flex-col justify-start">
    <div className="flex items-start justify-start p-6 lg:px-8">
      <div className="min-w-0 pr-2">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Scheduler
        </h2>
      </div>
      <div className="mt-0 flex lg:ml-4">
        <span className="block">
          <a
            href="/scheduler/new"
            className="inline-flex bg-amber-500 text-white items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-transparent hover:bg-amber-600"
          >
            <PlusIcon className="h-6 w-6" />
            New Scheduling
          </a>
        </span>
      </div>
    </div>
    <Scene />
  </div>
);

export default memo(Page);
