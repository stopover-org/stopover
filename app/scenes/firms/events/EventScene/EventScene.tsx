import { Box, Chip, Grid, Tab, TabList, Tabs } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { EventScene_FirmEventFragment$key } from "artifacts/EventScene_FirmEventFragment.graphql";
import Typography from "components/v2/Typography";
import Tag from "components/v2/Tag";
import { EventScene_CurrentUserFragment$key } from "artifacts/EventScene_CurrentUserFragment.graphql";
import useStatusColor from "lib/hooks/useStatusColor";
import Link from "components/v2/Link";
import { parseValue, useQuery, useUpdateQuery } from "lib/hooks/useQuery";
import Section from "components/v2/Section/Section";
import BookingsInformation from "./components/BookingsInformation";
import SchedulesInformation from "./components/SchedulesInformation";
import EventOptionsInformation from "./components/EventOptionsInformation";
import GeneralInformation from "./components/GeneralInformation";
import StripeIntegrationsInformation from "./components/StripeIntegrationsInformation";
import EventPlacementsInformation from "./components/EventPlacementsInformation";
import FirmEventActions from "./components/FirmEventActions";

interface EventSceneProps {
  eventFragmentRef: EventScene_FirmEventFragment$key;
  currentUserFragmentRef: EventScene_CurrentUserFragment$key;
}

const EventScene = ({
  eventFragmentRef,
  currentUserFragmentRef,
}: EventSceneProps) => {
  const event = useFragment<EventScene_FirmEventFragment$key>(
    graphql`
      fragment EventScene_FirmEventFragment on Event {
        ...FirmEventActions_EventFragment
        ...StripeIntegrationsInformation_EventFragment
        ...EventPlacementsInformation_EventFragment
        ...GeneralInformation_EventFragment
        ...EventOptionsInformation_EventFragment
        ...SchedulesInformation_EventFragment
        ...BookingsInformation_EventFragment
        firm {
          title
        }
        eventOptions {
          id
        }
        schedules {
          nodes {
            id
          }
          total
        }
        bookings {
          nodes {
            id
          }
          total
        }
        firm {
          status
          paymentTypes
        }
        stripeIntegrations {
          nodes {
            id
          }
        }
        eventPlacements {
          id
        }
        id
        status
        title
      }
    `,
    eventFragmentRef
  );

  const currentUser = useFragment(
    graphql`
      fragment EventScene_CurrentUserFragment on User {
        serviceUser
        ...FirmEventActions_UserFragment
      }
    `,
    currentUserFragmentRef
  );
  const tab = useQuery("tab", 0, (value) => parseInt(parseValue(value), 10));
  const setTab = useUpdateQuery("tab");
  const tagColor = useStatusColor({
    primary: ["published"],
    danger: ["removed"],
    info: ["unpublished"],
    neutral: ["draft"],
    status: event.status,
  });
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} sm={12} md={12}>
      <Grid lg={8} md={8} sm={12} xs={12}>
        <Link
          href={`/events/${event.id}`}
          underline={false}
          sx={{ padding: "0 5px" }}
          target="_blank"
          level="h3"
          primary
        >
          {event.title}
        </Link>
        <Typography level="h4" sx={{ padding: "0 5px" }}>
          {event.firm.title}
        </Typography>
        <Tag color={tagColor} link={false}>
          {t(`statuses.${event.status}`)}
        </Tag>
      </Grid>
      <FirmEventActions
        eventFragmentRef={event}
        currentUserFragmentRef={currentUser}
      />
      <Grid xs={12} padding={0}>
        <Section variant="soft" color="primary" margin={0} padding={0}>
          {t(`models.event.statusExplanations.${event.status}`, {
            returnObjects: true,
            email: "mikhail@stopoverx.com",
          }).map((translation: string) => (
            <React.Fragment key={translation}>
              <Typography fontSize="sm" level="body-sm" sx={{ width: "100%" }}>
                {translation}{" "}
              </Typography>
              <br />
            </React.Fragment>
          ))}
        </Section>
      </Grid>
      <Grid xs={12}>
        <Tabs
          size="sm"
          aria-label="Event Tabs"
          defaultValue={tab}
          sx={{ width: "100%", paddingTop: "10px" }}
          onChange={(_, value) => setTab(value as number)}
          orientation="vertical"
        >
          <TabList variant="plain" sx={{ minWidth: "175px" }}>
            <Tab variant={tab === 0 ? "outlined" : "plain"}>
              {t("scenes.firms.events.eventScene.tabs.generalInformation")}
            </Tab>
            <Tab variant={tab === 1 ? "outlined" : "plain"}>
              {t("models.eventOption.plural")}
              <Chip size="sm" variant="soft">
                {event.eventOptions.length}
              </Chip>
            </Tab>
            <Tab variant={tab === 2 ? "outlined" : "plain"}>
              {t("models.schedule.plural")}
              <Chip size="sm" variant="soft">
                {event.schedules.total}
              </Chip>
            </Tab>
            <Tab variant={tab === 3 ? "outlined" : "plain"}>
              {t("models.booking.plural")}
              <Chip size="sm" variant="soft">
                {event.bookings?.total}
              </Chip>
            </Tab>
            {currentUser.serviceUser && (
              <>
                <Tab
                  variant={tab === 4 ? "outlined" : "plain"}
                  sx={{ display: "block" }}
                >
                  {t("models.eventPlacement.plural")}
                  <Chip size="sm" variant="soft">
                    {event.eventPlacements.length}
                  </Chip>
                  <br />
                  <Typography fontSize="xs">
                    {t("models.user.attributes.serviceUser")}
                  </Typography>
                </Tab>
                <Tab
                  variant={tab === 5 ? "outlined" : "plain"}
                  sx={{ display: "block" }}
                >
                  {t("scenes.firms.events.eventScene.tabs.stripeIntegrations")}
                  <Chip size="sm" variant="soft">
                    {event.stripeIntegrations.nodes.length}
                  </Chip>
                  <br />
                  <Typography fontSize="xs">
                    {t("models.user.attributes.serviceUser")}
                  </Typography>
                </Tab>
              </>
            )}
          </TabList>
          <React.Suspense>
            <Box sx={{ width: "calc(100% - 175px)" }}>
              <GeneralInformation index={0} eventFragmentRef={event} />
              <EventOptionsInformation index={1} eventFragmentRef={event} />
              <SchedulesInformation index={2} eventFragmentRef={event} />
              <BookingsInformation index={3} eventFragmentRef={event} />

              {currentUser.serviceUser && (
                <>
                  <EventPlacementsInformation
                    index={4}
                    eventFragmentRef={event}
                  />
                  <StripeIntegrationsInformation
                    index={5}
                    eventFragmentRef={event}
                  />
                </>
              )}
            </Box>
          </React.Suspense>
        </Tabs>
      </Grid>
    </Grid>
  );
};

export default React.memo(EventScene);
