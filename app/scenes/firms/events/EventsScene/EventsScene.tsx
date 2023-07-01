import React from "react";
import { graphql, useFragment } from "react-relay";
import EventsTable from "../../../../components/shared/tables/EventsTable";
import { EventsScene_FirmFragment$key } from "./__generated__/EventsScene_FirmFragment.graphql";

interface EventsSceneProps {
  firmFragmentRef: EventsScene_FirmFragment$key;
}

const EventsScene = ({ firmFragmentRef }: EventsSceneProps) => {
  const firm = useFragment(
    graphql`
      fragment EventsScene_FirmFragment on Firm {
        ...EventsTable_FirmFragment
      }
    `,
    firmFragmentRef
  );

  return <EventsTable firmFragmentRef={firm} withPagination />;
};

export default React.memo(EventsScene);
