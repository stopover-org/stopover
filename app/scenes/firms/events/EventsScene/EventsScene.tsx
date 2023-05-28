import React from "react";
import { graphql, usePaginationFragment } from "react-relay";
import Table from "../../../../components/v2/Table";
import useEdges from "../../../../lib/hooks/useEdges";
import { TableBodyCellValue } from "../../../../components/v2/Table/components/TableBody";

interface EventsSceneProps {
  firmFragmentRef: any;
}

const EventsScene = ({ firmFragmentRef }: EventsSceneProps) => {
  const { data, hasPrevious, hasNext, loadPrevious, loadNext } =
    usePaginationFragment(
      graphql`
        fragment EventsScene_EventsFirmPaginationFragment on Firm
        @refetchable(queryName: "EventsSceneFirmPaginationQuery")
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 30 }
          cursor: { type: "String", defaultValue: "" }
        ) {
          events(first: $count, after: $cursor)
            @connection(key: "EventsScene_query_events") {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      `,
      firmFragmentRef
    );
  const [currentPage, setCurrentPage] = React.useState(1);
  const events = useEdges<TableBodyCellValue>(data.events).slice(
    (currentPage - 1) * 30,
    currentPage * 30
  );

  return (
    <Table
      headers={[
        {
          key: "title",
          label: "Title",
        },
      ]}
      data={events}
      withPagination
      paginationProps={{
        page: currentPage,
        canPrev: hasPrevious,
        canNext: hasNext,
        onNextPage: () => {
          if (hasNext) {
            loadNext(30, {
              onComplete: () => setCurrentPage(currentPage + 1),
            });
          }
        },
        onPrevPage: () => {
          if (hasPrevious) {
            loadPrevious(30, {
              onComplete: () => setCurrentPage(currentPage - 1),
            });
          }
        },
      }}
    />
  );
};

export default React.memo(EventsScene);
