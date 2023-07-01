import { graphql, useFragment } from "react-relay";
import React from "react";
import { TabPanel } from "@mui/joy";
import { EventOptionsInformation_EventFragment$key } from "./__generated__/EventOptionsInformation_EventFragment.graphql";
import Table from "../../../../../components/v2/Table";
import { getCurrencyFormat } from "../../../../../lib/utils/currencyFormatter";
import Checkbox from "../../../../../components/v2/Checkbox/Checkbox";
import {
  useEventOptionsColumns,
  useEventOptionsHeaders,
} from "../../../../../components/shared/tables/columns/eventOptions";

interface EventOptionsInformationProps {
  eventFragmentRef: EventOptionsInformation_EventFragment$key;
  index: number;
}

const EventOptionsInformation = ({
  eventFragmentRef,
  index,
}: EventOptionsInformationProps) => {
  const event = useFragment(
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
          title
        }
      }
    `,
    eventFragmentRef
  );
  const eventOptions = useEventOptionsColumns(event.eventOptions);
  const headers = useEventOptionsHeaders();
  return (
    <TabPanel value={index} size="sm" sx={{ paddingTop: "20px" }}>
      <Table data={eventOptions} headers={headers} />
    </TabPanel>
  );
};

export default React.memo(EventOptionsInformation);
