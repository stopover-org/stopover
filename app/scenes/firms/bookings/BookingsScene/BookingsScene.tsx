import React from "react";
import { graphql, useFragment } from "react-relay";
import BookingsFirmTable from "../../../../components/shared/tables/BookingsFirmTable";

interface EventsSceneProps {
  firmFragmentRef: any;
}

const BookingsScene = ({ firmFragmentRef }: EventsSceneProps) => {
  const firm = useFragment(
    graphql`
      fragment BookingsScene_FirmFragment on Firm {
        ...BookingsFirmTable_BookingsFirmPaginationFragment
      }
    `,
    firmFragmentRef
  );

  return <BookingsFirmTable firmFragmentRef={firm} withPagination />;
};

export default React.memo(BookingsScene);
