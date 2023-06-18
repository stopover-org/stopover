import React from "react";
import { Card, Grid, Sheet, TabPanel } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import moment from "moment/moment";
import { GeneralInformation_EventFragment$key } from "./__generated__/GeneralInformation_EventFragment.graphql";
import { getCurrencyFormat } from "../../../../../lib/utils/currencyFormatter";
import Tag from "../../../../../components/v2/Tag/Tag";
import { dateTimeFormat } from "../../../../../lib/utils/dates";

interface GeneralInformationProps {
  eventFragmentRef: GeneralInformation_EventFragment$key;
  index: number;
}
const GeneralInformation = ({
  eventFragmentRef,
  index,
}: GeneralInformationProps) => {
  const event = useFragment(
    graphql`
      fragment GeneralInformation_EventFragment on Event {
        title
        organizerPricePerUom {
          cents
          currency {
            name
          }
        }
        attendeePricePerUom {
          cents
          currency {
            name
          }
        }
        recurringDaysWithTime
        singleDaysWithTime
        description
        fullAddress
        country
        region
        city
        street
        houseNumber
        latitude
        longitude
        requiresCheckIn
        requiresContract
        requiresPassport
        eventType
        recurringType
        id
      }
    `,
    eventFragmentRef
  );
  return (
    <TabPanel value={index} size="sm" sx={{ paddingTop: "20px" }}>
      <Sheet>
        <Card sx={{ width: "100%", fontSize: "sm" }} variant="outlined">
          <Grid container xs={12}>
            <Grid xs={2}>Title</Grid>
            <Grid xs={10}>{event.title}</Grid>

            <Grid xs={2}>Description</Grid>
            <Grid xs={10}>{event.description}</Grid>

            <Grid xs={2}>Event Type</Grid>
            <Grid xs={10}>{event.eventType}</Grid>

            <Grid xs={2}>Recurring Type</Grid>
            <Grid xs={10}>{event.recurringType}</Grid>

            <Grid xs={2}>You get</Grid>
            <Grid xs={10}>
              {getCurrencyFormat(
                event.organizerPricePerUom.cents,
                event.organizerPricePerUom.currency.name
              )}
            </Grid>

            <Grid xs={2}>Attendee pay</Grid>
            <Grid xs={10}>
              {getCurrencyFormat(
                event.attendeePricePerUom.cents,
                event.attendeePricePerUom.currency.name
              )}
            </Grid>

            <Grid xs={2}>Recurring Dates</Grid>
            <Grid xs={10}>
              {event.recurringDaysWithTime.map((date) => (
                <Tag
                  level="body3"
                  link={false}
                  sx={{ whiteSpace: "nowrap", marginBottom: "2px" }}
                >
                  {date}
                </Tag>
              ))}
            </Grid>

            <Grid xs={2}>Single Dates</Grid>
            <Grid xs={10}>
              {event.singleDaysWithTime.map((date) => (
                <Tag
                  level="body3"
                  link={false}
                  sx={{ whiteSpace: "nowrap", marginBottom: "2px" }}
                >
                  {moment(date).format(dateTimeFormat)}
                </Tag>
              ))}
            </Grid>

            <Grid xs={2}>Address</Grid>
            <Grid xs={10}>
              {event.fullAddress}
              <br />
              Country: {event.country}
              <br />
              Region: {event.region}
              <br />
              City: {event.city}
              <br />
              Street: {event.street}
              <br />
              House Number: {event.houseNumber}
              <br />
              Lat/Lng: {event.latitude || "N/A"} / {event.longitude || "N/A"}
            </Grid>

            <Grid xs={2}>Require Check In</Grid>
            <Grid xs={10}>{event.requiresCheckIn}</Grid>

            <Grid xs={2}>Require Passport</Grid>
            <Grid xs={10}>{event.reqiuresPassport}</Grid>

            <Grid xs={2}>Require Contract signing</Grid>
            <Grid xs={10}>{event.requiresContract}</Grid>

            <Grid xs={2}>Max / Min Attendees</Grid>
            <Grid xs={10}>
              {event.maxAttendees || "N/A"} / {event.minAttendees || "N/A"}
            </Grid>
          </Grid>
        </Card>
      </Sheet>
    </TabPanel>
  );
};
export default React.memo(GeneralInformation);
