import { graphql, useFragment } from "react-relay";
import React from "react";
import { TabPanel } from "@mui/joy";
import { EventOptionsInformation_EventFragment$key } from "./__generated__/EventOptionsInformation_EventFragment.graphql";
import Table from "../../../../../components/v2/Table";
import { getCurrencyFormat } from "../../../../../lib/utils/currencyFormatter";
import Checkbox from "../../../../../components/v2/Checkbox/Checkbox";

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

  const eventOptions = event.eventOptions.map((option) => ({
    ...option,
    organizerPrice: getCurrencyFormat(
      option?.organizerPrice?.cents,
      option?.organizerPrice?.currency.name
    ),
    attendeePrice: getCurrencyFormat(
      option?.attendeePrice?.cents,
      option?.attendeePrice?.currency.name
    ),
    builtIn: (
      <Checkbox
        checked={Boolean(option.builtIn)}
        color="primary"
        disabled
        size="sm"
        label=""
      />
    ),
    forAttendee: (
      <Checkbox
        checked={Boolean(option.forAttendee)}
        color="primary"
        disabled
        size="sm"
        label=""
      />
    ),
  }));

  const headers = React.useMemo(
    () => [
      { key: "title", label: "Title" },
      { key: "organizerPrice", label: "You get" },
      { key: "attendeePrice", label: "Attendee pay" },
      { key: "description", label: "Description" },
      { key: "builtIn", label: "Option is included into Price" },
      { key: "builtIn", label: "For Attendees only" },
    ],
    []
  );
  return (
    <TabPanel value={index} size="sm" sx={{ paddingTop: "20px" }}>
      <Table data={eventOptions} headers={headers} />
    </TabPanel>
  );
};

export default React.memo(EventOptionsInformation);
