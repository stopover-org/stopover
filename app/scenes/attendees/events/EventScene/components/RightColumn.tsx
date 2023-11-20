import { graphql, useFragment } from "react-relay";
import { Box, Stack } from "@mui/joy";
import React from "react";
import Typography from "../../../../../components/v2/Typography";
import { RightColumn_EventFragment$key } from "../../../../../artifacts/RightColumn_EventFragment.graphql";
import BookEvent from "./BookEvent";
import Description from "../../../../../components/v2/Description";

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
    <Stack sx={{ position: "sticky", top: "0", right: "0" }}>
      <Box>
        <Description html={event.description} />
      </Box>
      <Box>
        <BookEvent eventFragmentRef={event} />
      </Box>
    </Stack>
  );
};

export default React.memo(RightColumn);
