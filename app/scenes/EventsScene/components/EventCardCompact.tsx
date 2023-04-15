import React from "react";
import {AspectRatio, Card, CardOverflow, Grid, Box, Stack, IconButton} from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Typography from "../../../components/v2/Typography";
import {EventCardCompacts_EventFragment$key} from "./__generated__/EventCardCompacts_EventFragment.graphql";
import Rating from "../../../components/v2/Rating/Rating";
import Link from "../../../components/v2/Link";
import {getCurrencyFormat} from "../../../lib/utils/currencyFormatter";
import Button from "../../../components/v2/Button";
import {Favorite} from "@mui/icons-material";
import Tag from "../../../components/v2/Tag";

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
        attendeePricePerUom {
          cents
          currency {
            name
          }
        }
        tags {
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
            <Box
              sx={{
                position: 'absolute',
                zIndex: 2,
                right: '1rem',
                top: '1rem',
              }}
            >
              {event.tags.map((tag) => (
                <Tag key={tag.id} href={`/events?tag=${tag.id}`}>
                  {tag.title}
                </Tag>
              ))}
            </Box>
          </CardOverflow>
          <Link href={`/events/${event.id}`}>
            <Typography sx={{ fontSize: 'xl' }}>
              {event.title}
            </Typography>
          </Link>
          <Box sx={{ paddingBottom: '5px' }}>
            <Typography level="h4" sx={{ fontSize: 'md', mt: 2 }}>
              {event.interests.map((interest) =>
                <React.Fragment key={interest.id}>
                  <Link primary href={`/events?interests=${interest.id}`}>
                    {interest.title}
                  </Link>
                  &nbsp;
                </React.Fragment>
              )}
            </Typography>
          </Box>
          <Rating
            rating={event.averageRating}
            label={`(${event.averageRating} of 5)`}
          />
          <Stack flexDirection={'row'} alignItems={'center'} sx={{ paddingTop: '5px' }}>
            <Typography fontSize={'lg'} paddingRight='10px'>
              {getCurrencyFormat(event?.attendeePricePerUom?.cents, event?.attendeePricePerUom?.currency?.name)}
            </Typography>
            <Button size={'sm'}>
              <AddShoppingCartIcon />
            </Button>
          </Stack>
        </Card>
      </Grid>
  );
};

export default React.memo(EventCardCompact);
