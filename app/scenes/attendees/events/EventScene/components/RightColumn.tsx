import { graphql, useFragment } from "react-relay";
import { Box, Stack } from "@mui/joy";
import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import Typography from "../../../../../components/v2/Typography";
import { RightColumn_EventFragment$key } from "../../../../../artifacts/RightColumn_EventFragment.graphql";
import BookEvent from "./BookEvent";

interface RightColumnProps {
  eventFragmentRef: RightColumn_EventFragment$key;
}

const RightColumn = ({ eventFragmentRef }: RightColumnProps) => {
  const event = useFragment(
    graphql`
      fragment RightColumn_EventFragment on Event {
        title
        description
        ...BookEvent_EventFragment
      }
    `,
    eventFragmentRef
  );
  return (
    <Stack sx={{position: 'sticky', top: '0', right: '0'}}>
      <Box>
        <Typography level="h3" textAlign="end">
          {event.title}
        </Typography>
      </Box>
      <Box>
        <Typography textAlign="justify">{event.description}</Typography>
      </Box>
      <Box>
        <BookEvent eventFragmentRef={event} />
      </Box>
    </Stack>
  );
};

export default React.memo(RightColumn);
