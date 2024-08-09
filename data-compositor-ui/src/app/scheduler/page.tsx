import { memo } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

const Page = () => (
  <div className="mx-auto flex max-w-6xl items-center justify-center p-6 lg:px-8">
    <div className="min-w-0">
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Scheduler
      </h2>
    </div>
    <div className="mt-5 flex lg:ml-4 lg:mt-0">
      <span className="hidden sm:block">
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
);

export default memo(Page);
