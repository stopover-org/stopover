import React from "react";
import { AspectRatio, Card, CardOverflow, Grid } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import Typography from "../../../components/v2/Typography";
import {EventCardCompacts_EventFragment$key} from "./__generated__/EventCardCompacts_EventFragment.graphql";
import Rating from "../../../components/v2/Rating/Rating";
import Link from "../../../components/v2/Link";

interface Props {
  eventReference: EventCardCompacts_EventFragment$key;
}

const EventCardCompact = ({ eventReference }: Props) => {
  const event = useFragment(
    graphql`
      fragment EventCardCompacts_EventFragment on Event {
        id
        title
        images
        interests {
          id
          title
        }
        averageRating
      }
    `,
    eventReference
  );

  return (
    <Grid width="330px" padding="10px">
      <Card variant="outlined" sx={{ width: "310px" }}>
        <CardOverflow>
          <AspectRatio ratio="2">
            <img src={event.images[0]} loading="lazy" alt="" />
          </AspectRatio>
        </CardOverflow>
        <Typography sx={{ fontSize: 'xl', mt: 2 }}>
          {event.title}
        </Typography><Typography level="h4" sx={{ fontSize: 'md', mt: 2 }}>
          {event.interests.map((interest) =>
            <React.Fragment key={interest.id}>
              <Link primary href={`/events?interests=${interest.id}`}>
                {interest.title}
              </Link>
              &nbsp;
            </React.Fragment>
          )}
        </Typography>
        <Rating rating={event.averageRating} label={`(${event.averageRating} of 5)`} />
      </Card>
    </Grid>
  );
};

export default React.memo(EventCardCompact);
