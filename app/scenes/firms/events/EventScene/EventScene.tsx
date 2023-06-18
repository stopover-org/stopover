import { Grid, Tab, TabList, Tabs } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import { EventScene_FirmEventFragment$key } from "./__generated__/EventScene_FirmEventFragment.graphql";
import GeneralInformation from "./components/GeneralInformation";
import Typography from "../../../../components/v2/Typography";

interface EventSceneProps {
  eventFragmentRef: EventScene_FirmEventFragment$key;
}

const EventScene = ({ eventFragmentRef }: EventSceneProps) => {
  const event = useFragment(
    graphql`
      fragment EventScene_FirmEventFragment on Event {
        id
        title
        ...GeneralInformation_EventFragment
        eventOptions {
          id
        }
        schedules {
          id
        }
      }
    `,
    eventFragmentRef
  );
  const [tab, setTab] = React.useState(0);

  return (
    <>
      <Typography level="h3">{event.title}</Typography>
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
            Schedules ( {event.schedules.length} )
          </Tab>
          <Tab variant={tab === 3 ? "outlined" : "plain"}>Bookings</Tab>
        </TabList>
        <GeneralInformation index={tab} eventFragmentRef={event} />
      </Tabs>
    </>
  );
};

export default React.memo(EventScene);
