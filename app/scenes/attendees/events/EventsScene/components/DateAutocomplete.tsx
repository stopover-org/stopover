import { graphql, useFragment } from "react-relay";
import { Autocomplete, AutocompleteOption } from "@mui/joy";
import moment from "moment/moment";
import React from "react";
import { Moment } from "moment";
import { useTranslation } from "react-i18next";
import { dayMonthTimeFormat } from "../../../../../lib/utils/dates";
import Typography from "../../../../../components/v2/Typography/Typography";
import { DateAutocomplete_Event$key } from "../../../../../artifacts/DateAutocomplete_Event.graphql";

interface DateAutocompleteProps {
  value: Moment | null;
  onChange: (value: Moment) => void;
  eventFragmentRef: DateAutocomplete_Event$key;
  sx?: Record<string, any>;
}

const DateAutocomplete = ({
  value,
  onChange,
  eventFragmentRef,
  sx,
}: DateAutocompleteProps) => {
  const event = useFragment(
    graphql`
      fragment DateAutocomplete_Event on Event {
        availableDates
        myBookings {
          bookedFor
          trip {
            id
          }
        }
      }
    `,
    eventFragmentRef
  );
  const { t } = useTranslation();

  return (
    <Autocomplete
      disableClearable
      options={event.availableDates.map((dt) => ({
        value: moment(dt),
        label: moment(dt).format(dayMonthTimeFormat),
      }))}
      variant="plain"
      size="sm"
      getOptionLabel={(option) => option.label!}
      value={{
        value,
        label: !value?.isValid()
          ? t("datepicker.selectDate")
          : value.format(dayMonthTimeFormat),
      }}
      onChange={(_, dt) => dt && onChange(moment(dt.value))}
      sx={{ borderRadius: "0", marginRight: "5px", ...sx }}
      renderOption={(props, option) => (
        <AutocompleteOption {...props}>
          <Typography
            color={
              event.myBookings.find((b) =>
                moment(b.bookedFor).isSame(option.value)
              )
                ? "primary"
                : undefined
            }
          >
            {option.label}
          </Typography>
        </AutocompleteOption>
      )}
    />
  );
};

export default React.memo(DateAutocomplete);
