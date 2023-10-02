import React from "react";
import { useTranslation } from "react-i18next";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";
import Checkbox from "../../../v2/Checkbox/Checkbox";
import ChangeEventOptionAvailability from "../../ChangeEventOptionAvailability";
import { ChangeEventOptionAvailability_EventOptionFragment$key } from "../../../../artifacts/ChangeEventOptionAvailability_EventOptionFragment.graphql";
import OptionTagColor from "../../OptionTagColor/OptionTagColor";

export function useEventOptionsHeaders() {
  const { t } = useTranslation();
  return React.useMemo(
    () => [
      {
        key: "title",
        width: 150,
        label: t("models.eventOption.attributes.title"),
      },
      {
        key: "organizerPrice",
        width: 100,
        label: t("models.eventOption.attributes.organizerPrice"),
      },
      {
        key: "attendeePrice",
        width: 100,
        label: t("models.eventOption.attributes.attendeePrice"),
      },
      {
        key: "description",
        width: 400,
        label: t("models.eventOption.attributes.description"),
      },
      {
        key: "builtIn",
        width: 100,
        label: t("models.eventOption.attributes.builtIn"),
      },
      {
        key: "forAttendee",
        width: 100,
        label: t("models.eventOption.attributes.forAttendee"),
      },
      {
        key: "status",
        width: 100,
        label: t("models.eventOption.attributes.status"),
      },
      { key: "actions", width: 100, label: t("general.actions") },
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
