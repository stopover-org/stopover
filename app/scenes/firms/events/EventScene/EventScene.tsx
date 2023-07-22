import { Grid, Tab, TabList, Tabs, Box, Stack } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import { EventScene_FirmEventFragment$key } from "../../../../artifacts/EventScene_FirmEventFragment.graphql";
import GeneralInformation from "./components/GeneralInformation";
import Typography from "../../../../components/v2/Typography";
import EventOptionsInformation from "./components/EventOptionsInformation";
import SchedulesInformation from "./components/SchedulesInformation";
import Tag from "../../../../components/v2/Tag/Tag";
import { EventScene_CurrentUserFragment$key } from "../../../../artifacts/EventScene_CurrentUserFragment.graphql";
import VerifyEvent from "../../../../components/shared/VerifyEvent";
import useStatusColor from "../../../../lib/hooks/useStatusColor";
import Link from "../../../../components/v2/Link";
import BookingsInformation from "./components/BookingsInformation";
import Button from "../../../../components/v2/Button";
import PublishEvent from "../../../../components/shared/PublishEvent";
import UnpublishEvent from "../../../../components/shared/UnpublishEvent";
import RemoveEvent from "../../../../components/shared/RemoveEvent";
import RescheduleEvent from "../../../../components/shared/RescheduleEvent";
import SyncStripe from "../../../../components/shared/SyncStripe";

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
  const [tab, setTab] = React.useState(0);
  const tagColor = useStatusColor({
    primary: ["published"],
    danger: ["deleted"],
    info: ["unpublished"],
    neutral: ["draft"],
    status: event.status,
  });

  return (
    <Grid container spacing={2} sm={12} md={12}>
      <Grid lg={10} sm={12}>
        <Typography level="h3" sx={{ display: "inline" }}>
          {event.title}
        </Typography>
        <Tag color={tagColor} link={false}>
          {event.status}
        </Tag>
      </Grid>
      <Grid lg={2} sm={12}>
        <Stack
          direction="row"
          justifyContent={{ lg: "flex-end", sm: "flex-start" }}
        >
          <Link
            href={`/my-firm/events/${event.id}/edit`}
            underline={false}
            sx={{ marginRight: "10px" }}
          >
            <Button size="sm">Edit</Button>
          </Link>
          {currentUser.serviceUser &&
            event.status === "published" &&
            event.firm.status === "active" && (
              <RescheduleEvent eventFragmentRef={event} />
            )}
          {event.status === "unpublished" && event.firm.status === "active" && (
            <PublishEvent eventFragmentRef={event} />
          )}
          {event.status === "published" && event.firm.status === "active" && (
            <UnpublishEvent eventFragmentRef={event} />
          )}
          {event.status !== "deleted" && (
            <RemoveEvent eventFragmentRef={event} />
          )}
          {currentUser.serviceUser &&
            event.status === "draft" &&
            event.firm.status === "active" && (
              <VerifyEvent eventFragmentRef={event} />
            )}
          {currentUser.serviceUser &&
            ["published", "unpublished"].includes(event.status) &&
            event.firm.status === "active" && (
              <SyncStripe eventFragmentRef={event} />
            )}
        </Stack>
      </Grid>
      <Grid xs={12}>
        <Tabs
          size="sm"
          aria-label="Event Tabs"
          defaultValue={0}
          sx={{ width: "100%", paddingTop: "10px" }}
          onChange={(_, value) => setTab(value as number)}
        >
          <TabList variant="plain" sx={{ width: "30%" }}>
            <Tab variant={tab === 0 ? "outlined" : "plain"}>
              General Information
            </Tab>
            <Tab variant={tab === 1 ? "outlined" : "plain"}>
              Event Options ( {event.eventOptions.length} )
            </Tab>
            <Tab variant={tab === 2 ? "outlined" : "plain"}>
              Schedules ( {event.schedules.nodes.length} )
            </Tab>
            <Tab variant={tab === 3 ? "outlined" : "plain"}>
              Bookings ( {event.bookings.nodes.length} )
            </Tab>
          </TabList>
          <GeneralInformation index={0} eventFragmentRef={event} />
          <EventOptionsInformation index={1} eventFragmentRef={event} />
          <SchedulesInformation index={2} eventFragmentRef={event} />
          <BookingsInformation index={3} eventFragmentRef={event} />
        </Tabs>
      </Grid>
    </Grid>
  );
};

export default React.memo(EventScene);
