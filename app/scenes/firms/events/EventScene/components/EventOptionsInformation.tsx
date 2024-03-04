import { graphql, useFragment } from "react-relay";
import React from "react";
import { Grid, Stack, TabPanel } from "@mui/joy";
import { EventOptionsInformation_EventFragment$key } from "artifacts/EventOptionsInformation_EventFragment.graphql";
import Table from "components/v2/Table";
import {
  useEventOptionsColumns,
  useEventOptionsHeaders,
} from "components/shared/tables/columns/eventOptions";
import CreateEventOption from "../../../../../components/shared/forms/eventOption/CreateEventOption";

interface EventOptionsInformationProps {
  eventFragmentRef: EventOptionsInformation_EventFragment$key;
  index: number;
}

const EventOptionsInformation = ({
  eventFragmentRef,
  index,
}: EventOptionsInformationProps) => {
  const event = useFragment<EventOptionsInformation_EventFragment$key>(
    graphql`
      fragment EventOptionsInformation_EventFragment on Event {
        eventOptions {
          organizerPrice {
            cents
            currency {
              name
            }
          }
          attendeePrice {
            cents
            currency {
              name
            }
          }
          builtIn
          description
          forAttendee
          id
          status
          title
          ...ChangeEventOptionAvailability_EventOptionFragment
        }
        ...CreateEventOption_EventFragment
      }
    `,
    eventFragmentRef
  );
  const eventOptions = useEventOptionsColumns(event.eventOptions);
  const headers = useEventOptionsHeaders();
  return (
    <TabPanel value={index} size="sm" sx={{ paddingTop: "20px" }}>
      <Grid container spacing={2}>
        <Grid xs={12} sm={12} md={12} lg={12}>
          <Stack direction="row" justifyContent="flex-end">
            <CreateEventOption eventFragmentRef={event} />
          </Stack>
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={12}>
          <Table data={eventOptions} headers={headers} />
        </Grid>
      </Grid>
    </TabPanel>
  );
};

export default React.memo(EventOptionsInformation);
