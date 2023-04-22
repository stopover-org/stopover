import React from "react";
import { Stack } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import { BookEvent_EventFragment$key } from "./__generated__/BookEvent_EventFragment.graphql";

interface BookEventProps {
  eventFragmentRef: BookEvent_EventFragment$key;
}

const BookEvent = ({ eventFragmentRef }: BookEventProps) => {
  const event = useFragment(
    graphql`
      fragment BookEvent_EventFragment on Event {
        id
        availableDates
      }
    `,
    eventFragmentRef
  );
  return (
    <Stack>
      <div>asdfjkl</div>
    </Stack>
  );
};

export default React.memo(BookEvent);
