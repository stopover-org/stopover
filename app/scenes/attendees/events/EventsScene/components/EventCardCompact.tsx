import React from "react";
import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  CardOverflow,
  Grid,
  Stack,
} from "@mui/joy";
import { graphql, useFragment, useMutation } from "react-relay";
import moment, { Moment } from "moment";
import { useTranslation } from "react-i18next";
import Typography from "../../../../../components/v2/Typography";
import Link from "../../../../../components/v2/Link";
import { getCurrencyFormat } from "../../../../../lib/utils/currencyFormatter";
import { EventCardCompact_BookEventMutation } from "../../../../../artifacts/EventCardCompact_BookEventMutation.graphql";
import { EventCardCompacts_EventFragment$key } from "../../../../../artifacts/EventCardCompacts_EventFragment.graphql";
import SubmitButton from "../../../../../components/shared/SubmitButton/SubmitButton";
import DateAutocomplete from "./DateAutocomplete";
import Button from "../../../../../components/v2/Button/Button";
import { useUpdateQuery } from "../../../../../lib/hooks/useQuery";

interface Props {
  eventFragmentRef: EventCardCompacts_EventFragment$key;
}

const EventCardCompact = ({ eventFragmentRef }: Props) => {
  const { t } = useTranslation();
  const event = useFragment(
    graphql`
      fragment EventCardCompacts_EventFragment on Event {
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
        availableDates
        averageRating
        myBookings {
          id
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
      mutation EventCardCompact_BookEventMutation($input: BookEventInput!) {
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
  const changeInterest = useUpdateQuery("interests");

  return (
    <Grid
      width={{
        lg: "calc(33% - 20px)",
        md: "calc(50% - 20px)",
        sm: "calc(100% - 20px)",
        xs: "calc(100% - 20px)",
      }}
      padding="10px"
    >
      <Card variant="outlined" sx={{ width: "100%" }}>
        <CardOverflow>
          <AspectRatio ratio="2">
            <img src={event.images[0]} loading="lazy" alt="" />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Link href={`/events/${event.id}`}>
            <Typography sx={{ fontSize: "xl" }}>{event.title}</Typography>
          </Link>
          <Box>
            <Typography level="body-md" sx={{ fontSize: "md" }}>
              {event.interests.map((interest) => (
                <React.Fragment key={interest.id}>
                  <Typography
                    underline
                    color="primary"
                    onClick={() => changeInterest([interest.slug])}
                  >
                    {interest.title}
                  </Typography>
                  &nbsp;
                </React.Fragment>
              ))}
            </Typography>
          </Box>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={1}
            useFlexGap
          >
            <Typography fontSize="lg">
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
                {t("event.book")}
              </SubmitButton>
            )}
            {booking && (
              <Link
                href={`/trips/${booking.trip.id}#${booking.id}`}
                underline={false}
              >
                <Button size="sm">
                  {t("scenes.attendees.events.eventsScene.details")}
                </Button>
              </Link>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default React.memo(EventCardCompact);
