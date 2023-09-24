import React from "react";
import { AspectRatio, Box, Card, CardOverflow, Grid, Stack } from "@mui/joy";
import { graphql, useFragment, useMutation } from "react-relay";
import moment from "moment";
import { Moment } from "moment/moment";
import { useRouter } from "next/router";
import { stringify } from "qs";
import Typography from "../../../../../components/v2/Typography";
import Rating from "../../../../../components/v2/Rating/Rating";
import Link from "../../../../../components/v2/Link";
import { getCurrencyFormat } from "../../../../../lib/utils/currencyFormatter";
import Button from "../../../../../components/v2/Button";
import Tag from "../../../../../components/v2/Tag";
import { EventCardCompact_BookEventMutation } from "../../../../../artifacts/EventCardCompact_BookEventMutation.graphql";
import { EventCardWide_EventFragment$key } from "../../../../../artifacts/EventCardWide_EventFragment.graphql";
import SubmitButton from "../../../../../components/shared/SubmitButton";
import DateAutocomplete from "./DateAutocomplete";

interface Props {
  eventFragmentRef: EventCardWide_EventFragment$key;
}

const EventCardCompact = ({ eventFragmentRef }: Props) => {
  const router = useRouter();
  const event = useFragment<EventCardWide_EventFragment$key>(
    graphql`
      fragment EventCardWide_EventFragment on Event {
        id
        title
        images
        interests {
          id
          title
          slug
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
        availableDates
        averageRating
        myBookings {
          bookedFor
          trip {
            id
          }
        }
        ...DateAutocomplete_Event
      }
    `,
    eventFragmentRef
  );

  const [mutation, submitting] =
    useMutation<EventCardCompact_BookEventMutation>(graphql`
      mutation EventCardWide_BookEventMutation($input: BookEventInput!) {
        bookEvent(input: $input) {
          accessToken
          booking {
            id
            event {
              id
              ...EventCardCompacts_EventFragment
              ...EventCardWide_EventFragment
              ...DateAutocomplete_Event
            }
          }
        }
      }
    `);

  const [date, setDate] = React.useState<Moment | null>(
    event.myBookings?.[0]?.bookedFor
      ? moment(event.myBookings?.[0]?.bookedFor)
      : null
  );

  const booking = React.useMemo(
    () => event.myBookings.find((b) => moment(b.bookedFor).isSame(date)),
    [date, event]
  );

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

  return (
    <Grid width="720px" padding="10px">
      <Card variant="outlined" sx={{ width: "700px" }} orientation="horizontal">
        <CardOverflow>
          <AspectRatio
            minHeight="200px"
            maxHeight="500px"
            ratio="2"
            sx={{ width: "310px" }}
            objectFit="cover"
          >
            <img src={event.images[0]} loading="lazy" alt="" />
          </AspectRatio>
          <Box
            sx={{
              position: "absolute",
              zIndex: 2,
              right: "1rem",
              top: "1rem",
            }}
          />
        </CardOverflow>
        <Stack paddingLeft="10px" width="100%">
          <Link href={`/events/${event.id}`}>
            <Typography sx={{ fontSize: "xl" }}>{event.title}</Typography>
          </Link>
          <Box sx={{ paddingBottom: "5px" }}>
            <Typography level="body3" sx={{ fontSize: "md" }}>
              {event.interests.map((interest) => {
                const q = { ...router.query };
                const rawInterests = (
                  Array.isArray(q["interests[]"])
                    ? q["interests[]"]
                    : [q["interests[]"]]
                ).filter(Boolean) as string[];

                q.interests = [...rawInterests, interest.slug]
                  .filter(
                    (value, index, array) => array.indexOf(value) === index
                  )
                  .filter(Boolean);

                delete q["interests[]"];

                const url = `/events?${stringify(q, {
                  arrayFormat: "brackets",
                  encode: false,
                })}`;

                return (
                  <React.Fragment key={interest.id}>
                    <Link primary href={url}>
                      {interest.title}
                    </Link>
                    &nbsp;
                  </React.Fragment>
                );
              })}
            </Typography>
          </Box>
          <Rating
            rating={event.averageRating}
            label={`(${event.averageRating || 0} of 5)`}
          />
          <Stack flexDirection="row" paddingTop="10px">
            {event.tags.slice(0, 2).map((tag) => (
              <Tag key={tag.id} href={`/events?tag=${tag.id}`} primary>
                {tag.title}
              </Tag>
            ))}
          </Stack>
          <br />
          <br />
          <Stack flexDirection="row" justifyContent="flex-end">
            <Typography fontSize="lg" paddingRight="10px">
              {getCurrencyFormat(
                event?.attendeePricePerUom?.cents,
                event?.attendeePricePerUom?.currency?.name
              )}
            </Typography>
            <DateAutocomplete
              value={date}
              onChange={setDate}
              eventFragmentRef={event}
            />
            {date?.isValid() && !booking && (
              <SubmitButton
                submitting={submitting}
                size="sm"
                onClick={() => bookEvent(event.id, date.toDate())}
              >
                Book
              </SubmitButton>
            )}
            {booking && (
              <Link href={`/trips/${booking.trip.id}`} underline={false}>
                <Button size="sm">Trip</Button>
              </Link>
            )}
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );
};

export default React.memo(EventCardCompact);
