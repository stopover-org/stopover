import React from "react";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";
import Checkbox from "../../../v2/Checkbox/Checkbox";
import ChangeEventOptionAvailability from "../../ChangeEventOptionAvailability";
import { ChangeEventOptionAvailability_EventOptionFragment$key } from "../../../../artifacts/ChangeEventOptionAvailability_EventOptionFragment.graphql";
import OptionTagColor from "../../OptionTagColor/OptionTagColor";

export function useEventOptionsHeaders() {
  return React.useMemo(
    () => [
      { key: "title", label: "Title" },
      { key: "organizerPrice", label: "You get" },
      { key: "attendeePrice", label: "Attendee pay" },
      { key: "description", label: "Description" },
      { key: "builtIn", label: "Option is included into Price" },
      { key: "forAttendee", label: "For Attendees only" },
      { key: "status", label: "Status" },
      { key: "actions", label: "" },
    ],
    []
  );
}

export function useEventOptionsColumns(
  eventOptions: ReadonlyArray<Record<string, any>>
) {
  return React.useMemo(
    () =>
      eventOptions.map((option) => ({
        ...option,
        organizerPrice: getCurrencyFormat(
          option?.organizerPrice?.cents,
          option?.organizerPrice?.currency.name
        ),
        attendeePrice: getCurrencyFormat(
          option?.attendeePrice?.cents,
          option?.attendeePrice?.currency.name
        ),
        builtIn: <Checkbox checked={option.builtIn} readOnly label="" />,
        forAttendee: (
          <Checkbox checked={option.forAttendee} readOnly label="" />
        ),
        status: <OptionTagColor status={option.status} />,
        actions: (
          <ChangeEventOptionAvailability
            optionFragmentRef={
              option as ChangeEventOptionAvailability_EventOptionFragment$key
            }
          />
        ),
      })),
    [eventOptions]
  );
}
