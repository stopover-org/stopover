import React from "react";
import { Card, Divider, Grid, Sheet, Stack, TabPanel, Typography } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import moment from "moment/moment";
import { GeneralInformation_EventFragment$key } from "../../../../../artifacts/GeneralInformation_EventFragment.graphql";
import { getCurrencyFormat } from "../../../../../lib/utils/currencyFormatter";
import Tag from "../../../../../components/v2/Tag/Tag";
import { dateFormat, dateTimeFormat } from "../../../../../lib/utils/dates";
import Checkbox from "../../../../../components/v2/Checkbox";
import ImagesPreview from "../../../../../components/shared/ImagesPreview";
import CancellationsSection from "./CancellationsSection";
import Section from "../../../../../components/v2/Section";

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
        city
        country
        description
        durationTime
        endDate
        eventType
        fullAddress
        houseNumber
        id
        images
        latitude
        longitude
        maxAttendees
        minAttendees
        recurringDaysWithTime
        region
        requiresCheckIn
        requiresContract
        requiresPassport
        singleDaysWithTime
        street
        title
        depositAmount {
          cents
          currency {
            name
          }
        }
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
        firm {
          paymentTypes
        }
        ...CancellationsSection_EventFragment
      }
    `,
    eventFragmentRef
  );

  return (
    <TabPanel value={index} size="sm" sx={{ paddingTop: "20px" }}>
      <Sheet>
        <Section>
          <Grid container xs={12}>
            <Grid xs={2} >
              <Typography level='title-lg'>
                Title
              </Typography>
            </Grid>
            <Grid xs={10} >{event.title}</Grid>

            <Grid xs={12} >
              <Stack direction="row">
                <ImagesPreview images={event.images as string[]} readonly />
              </Stack>
            </Grid>

            <Grid xs={2} >
              <Typography level='title-lg'>Description
              </Typography></Grid>
            <Grid xs={10} >{event.description}</Grid>

            <Grid xs={12} p={5}>
              <Divider />
            </Grid>

            <Grid xs={2} >
              <Typography level='title-lg'>Event Type
              </Typography></Grid>
            <Grid xs={10} >{event.eventType}</Grid>

            <Grid xs={2} >
              <Typography level='title-lg'>You get</Typography></Grid>
            <Grid xs={10} >
              {getCurrencyFormat(
                event.organizerPricePerUom?.cents,
                event.organizerPricePerUom?.currency.name
              )}
            </Grid>

            <Grid xs={2} >
              <Typography level='title-lg'>They pay</Typography></Grid>
            <Grid xs={10} >
              {getCurrencyFormat(
                event.attendeePricePerUom?.cents,
                event.attendeePricePerUom?.currency.name
              )}
            </Grid>

            {event.firm.paymentTypes.includes("cash") && (
              <>
                <Grid xs={2} >
              <Typography level='title-lg'>For Cash Payment requires deposit</Typography></Grid>
                <Grid xs={10} >
                  {getCurrencyFormat(
                    event.depositAmount?.cents,
                    event.depositAmount?.currency.name
                  )}
                </Grid>
              </>
            )}

            <Grid xs={2} >
              <Typography level='title-lg'>Recurring Dates</Typography></Grid>
            <Grid xs={10} >
              {event.recurringDaysWithTime.map((date, index) => (
                <Tag
                  link={false}
                  sx={{ whiteSpace: "nowrap", marginBottom: "2px" }}
                  key={`recurring_date-${date}-${index}`}
                >
                  {date}
                </Tag>
              ))}
            </Grid>

            <Grid xs={2} >
              <Typography level='title-lg'>Single Dates</Typography></Grid>
            <Grid xs={10} >
              {event.singleDaysWithTime.map((date) => (
                <Tag
                  link={false}
                  sx={{ whiteSpace: "nowrap", marginBottom: "2px" }}
                  key={`single_date-${date}-${index}`}
                >
                  {moment(date).format(dateTimeFormat)}
                </Tag>
              ))}
            </Grid>

            <Grid xs={2} >
              <Typography level='title-lg'>Duration Time</Typography></Grid>
            <Grid xs={10} >{event.durationTime}</Grid>

            <Grid xs={2} >
              <Typography level='title-lg'>Address</Typography></Grid>
            <Grid xs={10} >
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

            <Grid xs={2} >
              <Typography level='title-lg'>Require Check In</Typography></Grid>
            <Grid xs={10} >
              <Checkbox
                checked={Boolean(event.requiresCheckIn)}
                color="primary"
                readOnly
                label=""
              />
            </Grid>

            <Grid xs={2} >
              <Typography level='title-lg'>Require Passport</Typography></Grid>
            <Grid xs={10} >
              <Checkbox
                checked={Boolean(event.requiresPassport)}
                color="primary"
                readOnly
                label=""
              />
            </Grid>

            <Grid xs={2} >
              <Typography level='title-lg'>Require Contract signing</Typography></Grid>
            <Grid xs={10} >
              <Checkbox
                checked={Boolean(event.requiresContract)}
                color="primary"
                readOnly
                label=""
              />
            </Grid>

            <Grid xs={2} >
              <Typography level='title-lg'>Max / Min Attendees</Typography></Grid>
            <Grid xs={10} >
              {event.maxAttendees || "N/A"} / {event.minAttendees || "N/A"}
            </Grid>

            <Grid xs={2} >
              <Typography level='title-lg'>End Date</Typography>
              </Grid>
            <Grid xs={10} >
              {event.endDate ? moment(event.endDate).format(dateFormat) : "N/A"}
            </Grid>
          </Grid>
        </Section>
        <CancellationsSection eventFragmentRef={event} />
      </Sheet>
    </TabPanel>
  );
};
export default React.memo(GeneralInformation);
