import React from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Sheet,
  Stack,
  TabPanel,
} from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import moment from "moment/moment";
import { useTranslation } from "react-i18next";
import { GeneralInformation_EventFragment$key } from "artifacts/GeneralInformation_EventFragment.graphql";
import { getCurrencyFormat } from "lib/utils/currencyFormatter";
import Tag from "components/v2/Tag/Tag";
import { dateFormat, dateTimeFormat } from "lib/utils/dates";
import Checkbox from "components/v2/Checkbox";
import ImagesPreview from "components/shared/ImagesPreview";
import Section from "components/v2/Section";
import Typography from "components/v2/Typography/Typography";
import Description from "components/v2/Description";
import GoogleMap from "components/shared/GoogleMap/GoogleMap";
import DataRow from "scenes/firms/DashboardScene/components/DataRow";
import EditEventAddress from "components/shared/EditEventAddress";
import CancellationsSection from "./CancellationsSection";
import TourPlanSection from "./TourPlanSection";

interface GeneralInformationProps {
  eventFragmentRef: GeneralInformation_EventFragment$key;
  index: number;
}

const GeneralInformation = ({
  eventFragmentRef,
  index,
}: GeneralInformationProps) => {
  const event = useFragment<GeneralInformation_EventFragment$key>(
    graphql`
      fragment GeneralInformation_EventFragment on Event {
        description
        durationTime
        endDate
        eventType
        id
        images
        maxAttendees
        minAttendees
        recurringDaysWithTime
        requiresCheckIn
        requiresContract
        requiresPassport
        singleDaysWithTime
        title
        featured
        language
        interests {
          title
        }
        address {
          fullAddress
          country
          region
          city
          street
          houseNumber
          latitude
          longitude
        }
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
        statistics {
          name
          value
        }
        ...EditEventAddress_EventFragment
        ...CancellationsSection_EventFragment
        ...TourPlanSection_EventFragment
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
        <Grid lg={6} md={12} sm={12} xs={12}>
          <Card>
            <Typography level="h4">{t("general.statistics")}</Typography>
            <CardContent>
              <Stack direction="row" useFlexGap spacing={2}>
                {event.statistics.map((stat) => (
                  <Box key={stat.name}>
                    {t(`models.event.statistics.${stat.name}`)}: {stat.value}
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Section lg={8} md={12} sm={12} xs={12}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent="space-between">
              <Typography level="h4">{t("models.address.singular")}</Typography>
              <Box>
                <EditEventAddress eventFragmentRef={event} />
              </Box>
            </Stack>
          </Grid>
          <Grid xs={12}>
            {event.address?.fullAddress || t("general.noData")}
          </Grid>
          <Grid xs={12}>
            {event.address?.country} {event.address?.region}{" "}
            {event.address?.city} {event.address?.street}{" "}
            {event.address?.houseNumber}
          </Grid>
          {event.address?.latitude && event.address?.longitude && (
            <Grid xs={12}>
              <GoogleMap
                center={{
                  lat: event.address?.latitude!,
                  lng: event.address?.longitude!,
                }}
                markers={[
                  {
                    lat: event.address?.latitude!,
                    lng: event.address?.longitude!,
                  },
                ]}
              />
            </Grid>
          )}
        </Section>

        <TourPlanSection eventFragmentRef={event} />

        <Section lg={8} md={12} sm={12} xs={12}>
          <Grid container xs={12} spacing={2}>
            <Grid xs={12}>
              <DataRow
                label={t("models.event.attributes.title")}
                value={event.title}
              />
            </Grid>
            <Grid xs={12}>
              <DataRow
                label={t("models.event.attributes.language")}
                value={t(`languages.${event.language}`)}
              />
            </Grid>

            <Grid xs={12}>
              <Stack direction="row" flexWrap="wrap">
                <ImagesPreview images={event.images as string[]} readonly />
              </Stack>
            </Grid>

            <Grid xs={12}>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                alignItems="flex-start"
              >
                <Typography level="title-sm">
                  {t("models.event.attributes.description")}:
                </Typography>
                <Box>
                  <Description html={event.description} />
                </Box>
              </Stack>
            </Grid>

            <Grid xs={12} p={5}>
              <Divider />
            </Grid>

            <Grid xs={12}>
              <DataRow
                label={t("models.event.attributes.eventType")}
                value={t(`models.event.enums.eventType.${event.eventType}`)}
              />
            </Grid>

            <Grid xs={12}>
              <React.Suspense>
                <DataRow
                  label={t("models.interest.plural")}
                  value={event.interests
                    .map((interest) => interest.title)
                    .join(", ")}
                />
              </React.Suspense>
            </Grid>

            <Grid xs={12}>
              <DataRow
                label={t("models.event.attributes.organizerPricePerUom")}
                value={getCurrencyFormat(
                  event.organizerPricePerUom?.cents,
                  event.organizerPricePerUom?.currency.name
                )}
              />
            </Grid>

            <Grid xs={12}>
              <DataRow
                label={t("models.event.attributes.attendeePricePerUom")}
                value={getCurrencyFormat(
                  event.attendeePricePerUom?.cents,
                  event.attendeePricePerUom?.currency.name
                )}
              />
            </Grid>

            {event.firm.paymentTypes.includes("cash") && (
              <Grid xs={12}>
                <DataRow
                  label={t("models.event.attributes.depositAmount")}
                  value={getCurrencyFormat(
                    event.depositAmount?.cents,
                    event.depositAmount?.currency.name
                  )}
                />
              </Grid>
            )}

            <Grid xs={12}>
              <DataRow
                label={t("models.event.attributes.recurringDaysWithTime")}
                value={
                  <>
                    {event.recurringDaysWithTime.map((date, idx) => (
                      <Tag
                        link={false}
                        sx={{ whiteSpace: "nowrap", marginBottom: "2px" }}
                        key={`recurring_date-${date}-${idx}`}
                      >
                        {date}
                      </Tag>
                    ))}
                  </>
                }
              />
            </Grid>

            <Grid xs={12}>
              <DataRow
                label={t("models.event.attributes.singleDaysWithTime")}
                value={
                  <>
                    {event.singleDaysWithTime.map((date, idx) => (
                      <Tag
                        link={false}
                        sx={{ whiteSpace: "nowrap", marginBottom: "2px" }}
                        key={`single_date-${date}-${idx}`}
                      >
                        {moment(date).format(dateTimeFormat)}
                      </Tag>
                    ))}
                  </>
                }
              />
            </Grid>

            <Grid xs={12}>
              <DataRow
                label={t("models.event.attributes.eventType")}
                value={t(`models.event.enums.eventType.${event.eventType}`)}
              />
            </Grid>

            <Grid xs={12}>
              <DataRow
                label={t("models.event.attributes.featured")}
                value={
                  <Checkbox
                    checked={Boolean(event.featured)}
                    color="primary"
                    readOnly
                    label=""
                  />
                }
              />
            </Grid>

            <Grid xs={12}>
              <DataRow
                label={t("models.event.attributes.durationTime")}
                value={event.durationTime}
              />
            </Grid>

            <Grid xs={12}>
              <DataRow
                label={t("models.event.attributes.requiresCheckIn")}
                value={
                  <Checkbox
                    checked={Boolean(event.requiresCheckIn)}
                    color="primary"
                    readOnly
                    label=""
                  />
                }
              />
            </Grid>

            <Grid xs={12}>
              <DataRow
                label={t("models.event.attributes.requiresPassport")}
                value={
                  <Checkbox
                    checked={Boolean(event.requiresPassport)}
                    color="primary"
                    readOnly
                    label=""
                  />
                }
              />
            </Grid>

            <Grid xs={12}>
              <DataRow
                label={t("models.event.attributes.requiresContract")}
                value={
                  <Checkbox
                    checked={Boolean(event.requiresContract)}
                    color="primary"
                    readOnly
                    label=""
                  />
                }
              />
            </Grid>

            <Grid xs={12}>
              <DataRow
                label={
                  <>
                    {t("models.event.attributes.minAttendees")} -{" "}
                    {t("models.event.attributes.maxAttendees")}
                  </>
                }
                value={
                  <>
                    {event.minAttendees || t("general.noData")} -{" "}
                    {event.maxAttendees || t("general.noData")}
                  </>
                }
              />
            </Grid>

            <Grid xs={12}>
              <DataRow
                label={t("models.event.attributes.endDate")}
                value={
                  event.endDate
                    ? moment(event.endDate).format(dateFormat)
                    : "N/A"
                }
              />
            </Grid>
          </Grid>
        </Section>
        <CancellationsSection eventFragmentRef={event} />
      </Sheet>
    </TabPanel>
  );
};
export default React.memo(GeneralInformation);
