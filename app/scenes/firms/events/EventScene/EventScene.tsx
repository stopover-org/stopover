import { Grid, Tab, TabList, Tabs, Box, Stack, Chip } from "@mui/joy";
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
import StripeIntegrationsInformation from "./components/StripeIntegrationsInformation";
import { useTranslation } from "react-i18next";

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
  const [tab, setTab] = React.useState(0);
  const tagColor = useStatusColor({
    primary: ["published"],
    danger: ["removed"],
    info: ["unpublished"],
    neutral: ["draft"],
    status: event.status,
  });

  const { t } = useTranslation()

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
          flexWrap={'wrap'}
          useFlexGap
          spacing={1}
        >
          <Link
            href={`/my-firm/events/${event.id}/edit`}
            underline={false}
          >
            <Button size="sm">{t('general.edit')}</Button>
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
          {event.status !== "removed" && (
            <RemoveEvent eventFragmentRef={event} />
          )}
          {currentUser.serviceUser &&
            event.status === "draft" &&
            event.firm.status === "active" && (
              <VerifyEvent eventFragmentRef={event} />
            )}
          {currentUser.serviceUser &&
            ["published", "unpublished"].includes(event.status) &&
            event.firm.status === "active" &&
            event.firm.paymentTypes.includes("stripe") && (
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
          orientation='vertical'
        >
          <TabList variant="plain" sx={{minWidth: '175px'}}>
            <Tab variant={tab === 0 ? "outlined" : "plain"}>
              General Information
            </Tab>
            <Tab variant={tab === 1 ? "outlined" : "plain"}>
              Event Options 
              <Chip
                size="sm"
                variant="soft"
              >
                {event.eventOptions.length}
              </Chip>
            </Tab>
            <Tab variant={tab === 2 ? "outlined" : "plain"}>
              Schedules 
              <Chip
                size="sm"
                variant="soft"
              >{event.schedules.nodes.length}</Chip>
            </Tab>
            <Tab variant={tab === 3 ? "outlined" : "plain"}>
              Bookings 
              <Chip
                size="sm"
                variant="soft"
              >{event.bookings.nodes.length}</Chip>
            </Tab>
            {currentUser?.serviceUser && (
              <Tab variant={tab === 4 ? "outlined" : "plain"} sx={{ display: 'block' }}>
                Str. Int. 
              <Chip
                size="sm"
                variant="soft"
              >{event.stripeIntegrations.nodes.length}</Chip>
                <br />
                <Typography fontSize='xs'>
                  {t('models.user.attributes.serviceUser')}
                </Typography>
              </Tab>
            )}
          </TabList>
          <Box sx={{width: 'calc(100% - 175px)'}}>
            <GeneralInformation index={0} eventFragmentRef={event} />
            <EventOptionsInformation index={1} eventFragmentRef={event} />
            <SchedulesInformation index={2} eventFragmentRef={event} />
            <BookingsInformation index={3} eventFragmentRef={event} />

            {currentUser?.serviceUser && (
              <StripeIntegrationsInformation index={4} eventFragmentRef={event} />
            )}
          </Box>
        </Tabs>
      </Grid>
    </Grid>
  );
};

export default React.memo(EventScene);
