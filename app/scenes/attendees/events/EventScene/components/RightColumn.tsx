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
    <Stack>
      <Box>
        <Typography level="h3" textAlign="end">
          {event.title}
        </Typography>
      </Box>
      <Box>
        <Scrollbars style={{ width: "100%", height: "300px" }}>
          <Typography textAlign="justify">{event.description}</Typography>
        </Scrollbars>
      </Box>
      <Box>
        <BookEvent eventFragmentRef={event} />
      </Box>
    </Stack>
  );
};

export default React.memo(RightColumn);
