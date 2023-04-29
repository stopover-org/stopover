import { graphql, useFragment } from "react-relay";
import { Stack } from "@mui/joy";
import React from "react";
import Typography from "../../../components/v2/Typography";
import { Breadcrumbs_EventFragment$key } from "./__generated__/Breadcrumbs_EventFragment.graphql";

export const Breadcrumbs = ({
  eventFragmentRef,
}: {
  eventFragmentRef: Breadcrumbs_EventFragment$key;
}) => {
  const event = useFragment(
    graphql`
      fragment Breadcrumbs_EventFragment on Event {
        interests {
          id
          title
        }
      }
    `,
    eventFragmentRef
  );

  return (
    <Stack flexDirection="row">
      {event?.interests?.map((interest, index) => (
        <Typography key={interest.id} fontSize="20px">
          {index > 0 && <>&nbsp;&gt;&nbsp;</>} {interest.title}
        </Typography>
      ))}
    </Stack>
  );
};

export default React.memo(Breadcrumbs);
