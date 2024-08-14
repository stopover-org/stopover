"use client";

import { graphql, useLazyLoadQuery } from "react-relay";
import { memo } from "react";

const Scene = () => {
  const data = useLazyLoadQuery(
    graphql`
      query page_SchedulingsConnection_Query {
        schedulings {
          edges {
            node {
              id
              name
              nextScheduleTime
              status
              adapterType
            }
          }
        }
      }
    `,
    {},
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
                  <tr className="border-b border-neutral-200 dark:border-white/10" />
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
