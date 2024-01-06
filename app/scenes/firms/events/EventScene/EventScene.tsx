import {
  Box,
  Chip,
  Dropdown,
  Grid,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  Tab,
  TabList,
  Tabs,
  Tooltip,
} from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import LaunchIcon from "@mui/icons-material/Launch";
import { MoreVert } from "@mui/icons-material";
import { EventScene_FirmEventFragment$key } from "artifacts/EventScene_FirmEventFragment.graphql";
import Typography from "components/v2/Typography";
import Tag from "components/v2/Tag";
import { EventScene_CurrentUserFragment$key } from "artifacts/EventScene_CurrentUserFragment.graphql";
import VerifyEvent from "components/shared/VerifyEvent";
import useStatusColor from "lib/hooks/useStatusColor";
import Link from "components/v2/Link";
import Button from "components/v2/Button";
import PublishEvent from "components/shared/PublishEvent";
import UnpublishEvent from "components/shared/UnpublishEvent";
import RemoveEvent from "components/shared/RemoveEvent";
import RescheduleEvent from "components/shared/RescheduleEvent";
import SyncStripe from "components/shared/SyncStripe";
import { parseValue, useQuery, useUpdateQuery } from "lib/hooks/useQuery";
import BookingsInformation from "./components/BookingsInformation";
import SchedulesInformation from "./components/SchedulesInformation";
import EventOptionsInformation from "./components/EventOptionsInformation";
import GeneralInformation from "./components/GeneralInformation";
import StripeIntegrationsInformation from "./components/StripeIntegrationsInformation";

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
        }
        bookings {
          nodes {
            id
          }
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
        ...GeneralInformation_EventFragment
        ...EventOptionsInformation_EventFragment
        ...SchedulesInformation_EventFragment
        ...VerifyEventInformation_EventFragment
        ...BookingsInformation_EventFragment
        ...PublishEvent_EventFragment
        ...UnpublishEvent_EventFragment
        ...RemoveEvent_EventFragment
        ...RescheduleEvent_EventFragment
        ...SyncStripe_EventFragment
        ...StripeIntegrationsInformation_EventFragment
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
  const canEdit = React.useMemo(() => event.status !== "removed", [event]);
  const canReschedule = React.useMemo(
    () =>
      currentUser.serviceUser &&
      event.status === "published" &&
      event.firm.status === "active",
    [event, currentUser]
  );

  const canPublish = React.useMemo(
    () => event.status === "unpublished" && event.firm.status === "active",
    [event]
  );

  const canArchive = React.useMemo(
    () =>
      event.status === "published" &&
      event.firm.status === "active" &&
      event.firm.paymentTypes.length > 0,
    [event]
  );
  const canRemove = React.useMemo(() => event.status !== "removed", [event]);
  const canVerify = React.useMemo(
    () =>
      currentUser.serviceUser &&
      event.status === "draft" &&
      event.firm.status === "active",
    [event, currentUser]
  );

  const canSync = React.useMemo(
    () =>
      currentUser.serviceUser &&
      ["published", "unpublished"].includes(event.status) &&
      event.firm.status === "active" &&
      event.firm.paymentTypes.includes("stripe"),
    [event, currentUser]
  );

  return (
    <Grid container spacing={2} sm={12} md={12}>
      <Grid lg={8} sm={12}>
        <Typography level="h3" sx={{ display: "inline" }}>
          {event.title}
          <Link
            href={`/events/${event.id}`}
            underline={false}
            fontSize="12px"
            sx={{ padding: "0 5px" }}
            target="_blank"
            primary
          >
            <LaunchIcon />
          </Link>
        </Typography>
        <Typography level="h4">{event.firm.title}</Typography>
        <Tag color={tagColor} link={false}>
          {t(`statuses.${event.status}`)}
        </Tag>
      </Grid>
      <Grid lg={4} sm={12}>
        <Stack
          direction="row"
          justifyContent={{ lg: "flex-end", sm: "flex-start" }}
          flexWrap="wrap"
          useFlexGap
          spacing={1}
        >
          {canEdit && (
            <Link href={`/my-firm/events/${event.id}/edit`} underline={false}>
              <Button size="sm" variant="plain">
                {t("general.edit")}
              </Button>
            </Link>
          )}
          <Dropdown>
            <Tooltip title={t("general.additional")}>
              <MenuButton
                slots={{ root: IconButton }}
                slotProps={{
                  root: { variant: "solid", color: "primary", size: "sm" },
                }}
              >
                <MoreVert />
              </MenuButton>
            </Tooltip>
            <Menu
              variant="plain"
              placement="bottom-end"
              onItemsChange={() => {}}
              disablePortal
              keepMounted
            >
              {canReschedule && (
                <MenuItem>
                  <RescheduleEvent
                    variant="plain"
                    color="neutral"
                    eventFragmentRef={event}
                  />
                </MenuItem>
              )}
              {canPublish && (
                <MenuItem>
                  <PublishEvent
                    variant="plain"
                    color="neutral"
                    eventFragmentRef={event}
                  />
                </MenuItem>
              )}
              {canArchive && (
                <MenuItem>
                  <UnpublishEvent
                    variant="plain"
                    color="neutral"
                    eventFragmentRef={event}
                  />
                </MenuItem>
              )}
              {canRemove && (
                <MenuItem>
                  <RemoveEvent
                    variant="plain"
                    color="neutral"
                    eventFragmentRef={event}
                  />
                </MenuItem>
              )}
              {canVerify && (
                <MenuItem>
                  <VerifyEvent
                    variant="plain"
                    color="neutral"
                    eventFragmentRef={event}
                  />
                </MenuItem>
              )}
              {canSync && (
                <MenuItem>
                  <SyncStripe
                    variant="plain"
                    color="neutral"
                    eventFragmentRef={event}
                  />
                </MenuItem>
              )}
            </Menu>
          </Dropdown>
        </Stack>
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
                {event.schedules.nodes.length}
              </Chip>
            </Tab>
            <Tab variant={tab === 3 ? "outlined" : "plain"}>
              {t("models.booking.plural")}
              <Chip size="sm" variant="soft">
                {event.bookings.nodes.length}
              </Chip>
            </Tab>
            {currentUser.serviceUser && (
              <Tab
                variant={tab === 4 ? "outlined" : "plain"}
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
            )}
          </TabList>
          <Box sx={{ width: "calc(100% - 175px)" }}>
            <GeneralInformation index={0} eventFragmentRef={event} />
            <EventOptionsInformation index={1} eventFragmentRef={event} />
            <SchedulesInformation index={2} eventFragmentRef={event} />
            <BookingsInformation index={3} eventFragmentRef={event} />

            {currentUser.serviceUser && (
              <StripeIntegrationsInformation
                index={4}
                eventFragmentRef={event}
              />
            )}
          </Box>
        </Tabs>
      </Grid>
    </Grid>
  );
};

export default React.memo(EventScene);
