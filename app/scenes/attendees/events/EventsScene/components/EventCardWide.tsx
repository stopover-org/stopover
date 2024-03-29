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
import moment from "moment";
import { Moment } from "moment/moment";
import { useTranslation } from "react-i18next";
import Typography from "components/v2/Typography";
import Link from "components/v2/Link";
import { getCurrencyFormat } from "lib/utils/currencyFormatter";
import Button from "components/v2/Button";
import { EventCardCompact_BookEventMutation } from "artifacts/EventCardCompact_BookEventMutation.graphql";
import { EventCardWide_EventFragment$key } from "artifacts/EventCardWide_EventFragment.graphql";
import SubmitButton from "components/shared/SubmitButton";
import { useUpdateQuery } from "lib/hooks/useQuery";
import DateAutocomplete from "./DateAutocomplete";

interface Props {
  eventFragmentRef: EventCardWide_EventFragment$key;
}

const EventCardCompact = ({ eventFragmentRef }: Props) => {
  const { t } = useTranslation();
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
        availableDates
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
  const updateInterest = useUpdateQuery("interests");

  return (
    <Grid width="720px">
      <Card
        variant="outlined"
        sx={{ width: "800px", margin: "0px" }}
        orientation="horizontal"
      >
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
        <CardContent sx={{ position: "relative" }}>
          <Link href={`/events/${event.id}`}>
            <Typography sx={{ fontSize: "xl" }}>{event.title}</Typography>
          </Link>
          <Box>
            <Typography level="body-md" sx={{ fontSize: "md" }}>
              {event.interests.map((interest) => (
                <React.Fragment key={interest.id}>
                  <Typography
                    color="primary"
                    underline
                    onClick={() => updateInterest([interest.slug])}
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
            sx={{
              position: "absolute",
              bottom: 0,
            }}
          >
            <Typography fontSize="lg">
              {event?.attendeePricePerUom?.cents === 0
                ? t("general.free")
                : getCurrencyFormat(
                    event?.attendeePricePerUom?.cents,
                    event?.attendeePricePerUom?.currency?.name
                  )}
            </Typography>
            {event.availableDates?.length > 0 ? (
              <DateAutocomplete
                value={date}
                onChange={setDate}
                eventFragmentRef={event}
                sx={{ width: "150px" }}
              />
            ) : (
              t("general.noData")
            )}
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
                <Button size="sm" fullWidth>
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
