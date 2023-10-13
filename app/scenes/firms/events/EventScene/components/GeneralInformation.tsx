import React from "react";
import { Divider, Grid, Sheet, Stack, TabPanel } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import moment from "moment/moment";
import { useTranslation } from "react-i18next";
import { GeneralInformation_EventFragment$key } from "../../../../../artifacts/GeneralInformation_EventFragment.graphql";
import { getCurrencyFormat } from "../../../../../lib/utils/currencyFormatter";
import Tag from "../../../../../components/v2/Tag/Tag";
import { dateFormat, dateTimeFormat } from "../../../../../lib/utils/dates";
import Checkbox from "../../../../../components/v2/Checkbox";
import ImagesPreview from "../../../../../components/shared/ImagesPreview";
import CancellationsSection from "./CancellationsSection";
import Section from "../../../../../components/v2/Section";
import Typography from "../../../../../components/v2/Typography/Typography";

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
  const { t } = useTranslation();

  return (
    <TabPanel
      value={index}
      size="sm"
      sx={{ paddingTop: "20px", minWidth: "600px" }}
    >
      <Sheet>
        <Section>
          <Grid container xs={12} spacing={2}>
            <Grid xs={2}>
              <Typography level="title-lg">
                {t("models.event.attributes.title")}
              </Typography>
            </Grid>
            <Grid xs={10}>{event.title}</Grid>

            <Grid xs={12}>
              <Stack direction="row">
                <ImagesPreview images={event.images as string[]} readonly />
              </Stack>
            </Grid>

            <Grid xs={2}>
              <Typography level="title-lg">
                {t("models.event.attributes.description")}
              </Typography>
            </Grid>
            <Grid xs={10}>
              <Typography>{event.description}</Typography>
            </Grid>

            <Grid xs={12} p={5}>
              <Divider />
            </Grid>

            <Grid xs={2}>
              <Typography level="title-lg">
                {t("models.event.attributes.eventType")}
              </Typography>
            </Grid>
            <Grid xs={10}>
              {t(`models.event.enums.eventType.${event.eventType}`)}
            </Grid>

            <Grid xs={2}>
              <Typography level="title-lg">
                {t("models.event.attributes.organizerPricePerUom")}
              </Typography>
            </Grid>
            <Grid xs={10}>
              {getCurrencyFormat(
                event.organizerPricePerUom?.cents,
                event.organizerPricePerUom?.currency.name
              )}
            </Grid>

            <Grid xs={2}>
              <Typography level="title-lg">
                {t("models.event.attributes.attendeePricePerUom")}
              </Typography>
            </Grid>
            <Grid xs={10}>
              {getCurrencyFormat(
                event.attendeePricePerUom?.cents,
                event.attendeePricePerUom?.currency.name
              )}
            </Grid>

            {event.firm.paymentTypes.includes("cash") && (
              <Grid xs={2}>
                <Typography level="title-lg">
                  {t("models.event.attributes.depositAmount")}
                </Typography>
              </Grid>
            )}
            {event.firm.paymentTypes.includes("cash") && (
              <Grid xs={10}>
                {getCurrencyFormat(
                  event.depositAmount?.cents,
                  event.depositAmount?.currency.name
                )}
              </Grid>
            )}

            <Grid xs={2}>
              <Typography level="title-lg">
                {t("models.event.attributes.recurringDaysWithTime")}
              </Typography>
            </Grid>
            <Grid xs={10}>
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

            <Grid xs={2}>
              <Typography level="title-lg">
                {t("models.event.attributes.singleDaysWithTime")}
              </Typography>
            </Grid>
            <Grid xs={10}>
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

            <Grid xs={2}>
              <Typography level="title-lg">
                {t("models.event.attributes.durationTime")}
              </Typography>
            </Grid>
            <Grid xs={10}>{event.durationTime}</Grid>

            <Grid xs={2}>
              <Typography level="title-lg">{t("address.title")}</Typography>
            </Grid>
            <Grid xs={10}>
              {event.fullAddress}
              <br />
              {t("address.country")}: {event.country}
              <br />
              {t("address.region")}: {event.region}
              <br />
              {t("address.city")}: {event.city}
              <br />
              {t("address.street")}: {event.street}
              <br />
              {t("address.houseNumber")}: {event.houseNumber}
              <br />
              {t("address.latitude")}/{t("address.longitude")}:{" "}
              {event.latitude || t("general.noData")} /{" "}
              {event.longitude || t("general.noData")}
            </Grid>

            <Grid xs={2}>
              <Typography level="title-lg">
                {t("models.event.attributes.requiresCheckIn")}
              </Typography>
            </Grid>
            <Grid xs={10}>
              <Checkbox
                checked={Boolean(event.requiresCheckIn)}
                color="primary"
                readOnly
                label=""
              />
            </Grid>

            <Grid xs={2}>
              <Typography level="title-lg">
                {t("models.event.attributes.requiresPassport")}
              </Typography>
            </Grid>
            <Grid xs={10}>
              <Checkbox
                checked={Boolean(event.requiresPassport)}
                color="primary"
                readOnly
                label=""
              />
            </Grid>

            <Grid xs={2}>
              <Typography level="title-lg">
                {t("models.event.attributes.requiresContract")}
              </Typography>
            </Grid>
            <Grid xs={10}>
              <Checkbox
                checked={Boolean(event.requiresContract)}
                color="primary"
                readOnly
                label=""
              />
            </Grid>

            <Grid xs={2}>
              <Typography level="title-lg">
                {t("models.event.attributes.minAttendees")} -{" "}
                {t("models.event.attributes.maxAttendees")}
              </Typography>
            </Grid>
            <Grid xs={10}>
              {event.minAttendees || t("general.noData")} -{" "}
              {event.maxAttendees || t("general.noData")}
            </Grid>

            <Grid xs={2}>
              <Typography level="title-lg">
                {t("models.event.attributes.endDate")}
              </Typography>
            </Grid>
            <Grid xs={10}>
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
