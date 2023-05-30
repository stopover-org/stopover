import { Tab, TabList, Tabs } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import { EventScene_FirmEventFragment$key } from "./__generated__/EventScene_FirmEventFragment.graphql";
import GeneralInformation from "./components/GeneralInformation";

interface EventSceneProps {
  eventFragmentRef: EventScene_FirmEventFragment$key;
}

const EventScene = ({ eventFragmentRef }: EventSceneProps) => {
  const event = useFragment(
    graphql`
      fragment EventScene_FirmEventFragment on Event {
        id
        ...GeneralInformation_EventFragment
        eventOptions {
          id
        }
      }
    `,
    eventFragmentRef
  );
  const [tab, setTab] = React.useState(0);

  return (
    <Tabs
      size="sm"
      aria-label="Event Tabs"
      defaultValue={0}
      onChange={(_, value) => setTab(value as number)}
    >
      <TabList variant="plain">
        <Tab variant={tab === 0 ? "outlined" : "plain"}>
          General Information
        </Tab>
        <Tab variant={tab === 1 ? "outlined" : "plain"}>Event Options</Tab>
        <Tab variant={tab === 2 ? "outlined" : "plain"}>Schedules</Tab>
        <Tab variant={tab === 3 ? "outlined" : "plain"}>Bookings</Tab>
      </TabList>
      <GeneralInformation index={tab} eventFragmentRef={event} />
    </Tabs>
  );
};

export default React.memo(EventScene);
