import React from "react";
import { AspectRatio, Box, Card, CardOverflow, Grid, Stack } from "@mui/joy";
import { graphql, useFragment, useMutation } from "react-relay";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import moment from "moment";
import Typography from "../../../components/v2/Typography";
import Rating from "../../../components/v2/Rating/Rating";
import Link from "../../../components/v2/Link";
import { getCurrencyFormat } from "../../../lib/utils/currencyFormatter";
import Button from "../../../components/v2/Button";
import Tag from "../../../components/v2/Tag";
import { EventCardCompacts_ScheduleFragment$key } from "./__generated__/EventCardCompacts_ScheduleFragment.graphql";
import { getDate, getHumanDateTime } from "../../../lib/utils/dates";
import { EventCardCompact_BookEventMutation } from "./__generated__/EventCardCompact_BookEventMutation.graphql";

interface Props {
  scheduleReference: EventCardCompacts_ScheduleFragment$key;
}

const EventCardCompact = ({ scheduleReference }: Props) => {
  const schedule = useFragment(
    graphql`
      fragment EventCardCompacts_ScheduleFragment on Schedule {
        id
        scheduledFor
        event {
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
          myBookings {
            bookedFor
          }
        }
      }
    `,
    scheduleReference
  );

  const [mutation] = useMutation<EventCardCompact_BookEventMutation>(graphql`
    mutation EventCardCompact_BookEventMutation($input: BookEventInput!) {
      bookEvent(input: $input) {
        accessToken
        booking {
          id
          event {
            id
          }
        }
      }
    }
  `);

  const bookEvent = (eventId: string, bookedFor: Date) => {
    mutation({
      variables: {
        input: {
          eventId,
          bookedFor,
          attendeesCount: 1,
        },
      },
    });
  };
  const { event } = schedule;
  const alreadyBooked = event.myBookings.find((booking) =>
    moment(booking.bookedFor).isSame(schedule.scheduledFor, "day")
  );

  return (
    <Grid sx={{ minWidth: "290px", width: "calc(30% + 20px)" }} padding="10px">
      <Card variant="outlined" sx={{ width: "100%", minWidth: "270px" }}>
        <CardOverflow>
          <AspectRatio ratio="2">
            <img src={event.images[0]} loading="lazy" alt="" />
          </AspectRatio>
          <Box
            sx={{
              position: "absolute",
              zIndex: 2,
              right: "1rem",
              top: "1rem",
            }}
          >
            {event.tags.slice(0, 2).map((tag) => (
              <Tag key={tag.id} href={`/events?tag=${tag.id}`} primary>
                {tag.title}
              </Tag>
            ))}
            <Tag
              key={schedule.id}
              href={`/events?date=${getDate(moment(schedule.scheduledFor))}`}
              primary
            >
              {getHumanDateTime(moment(schedule.scheduledFor))}
            </Tag>
          </Box>
        </CardOverflow>
        <Link href={`/events/${event.id}`}>
          <Typography sx={{ fontSize: "xl" }}>{event.title}</Typography>
        </Link>
        <Box sx={{ paddingBottom: "5px" }}>
          <Typography level="body3" sx={{ fontSize: "md" }}>
            {event.interests.map((interest) => (
              <React.Fragment key={interest.id}>
                <Link primary href={`/events?interests=${interest.id}`}>
                  {interest.title}
                </Link>
                &nbsp;
              </React.Fragment>
            ))}
          </Typography>
        </Box>
        <Rating
          rating={event.averageRating}
          label={`(${event.averageRating || 0} of 5)`}
        />
        <Stack
          flexDirection="row"
          alignItems="center"
          sx={{ paddingTop: "5px" }}
        >
          <Typography fontSize="lg" paddingRight="10px">
            {getCurrencyFormat(
              event?.attendeePricePerUom?.cents,
              event?.attendeePricePerUom?.currency?.name
            )}
          </Typography>
          {alreadyBooked && (
            <Link href="/trips">
              <Button
                size="sm"
                onClick={() => bookEvent(event.id, schedule.scheduledFor)}
              >
                <AddShoppingCartIcon />
                My Trips
              </Button>
            </Link>
          )}
          {!alreadyBooked && (
            <Button
              size="sm"
              onClick={() => bookEvent(event.id, schedule.scheduledFor)}
            >
              <AddShoppingCartIcon />
              Add
            </Button>
          )}
        </Stack>
      </Card>
    </Grid>
  );
};

export default React.memo(EventCardCompact);
