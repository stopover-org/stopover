import React from "react";
import { AspectRatio, Card, CardOverflow, Grid } from "@mui/joy";
import { graphql, useFragment } from "react-relay";

interface Props {
  eventReference: any;
}

const EventCardCompact = ({ eventReference }: Props) => {
  const event = useFragment(
    graphql`
      fragment EventCardCompacts_EventFragment on Event {
        title
        images
      }
    `,
    eventReference
  );

  console.log(event);
  return (
    <Grid width="330px" padding="10px">
      <Card variant="outlined" sx={{ width: "310px" }}>
        <CardOverflow>
          <AspectRatio ratio="2">
            <img src={event.images[0]} loading="lazy" alt="" />
          </AspectRatio>
        </CardOverflow>
      </Card>
    </Grid>
  );
};

export default React.memo(EventCardCompact);
