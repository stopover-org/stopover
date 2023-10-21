import { Autocomplete, FormLabel } from "@mui/joy";
import React from "react";
import { useTranslation } from "react-i18next";

interface TimeAutocompleteProps {
  onDateChange: (value: string) => void;
  hour?: string;
  minute?: string;
}

const TimeAutocomplete = ({
  onDateChange,
  hour,
  minute,
}: TimeAutocompleteProps) => {
  const timeSeries = React.useMemo(
    () =>
      Array.from(Array(24).keys())
        .map((h) => h.toString().padStart(2, "0"))
        .map((h) =>
          Array.from(Array(60).keys()).map(
            (m) => `${h}:${m.toString().padStart(2, "0")}`
          )
        )
        .flat(),
    []
  );
  const { t } = useTranslation();
  return (
    <>
      <FormLabel>{t("datepicker.selectTime")}</FormLabel>
      <Autocomplete
        disableClearable
        options={timeSeries}
        value={hour && minute ? `${hour || ""}:${minute || ""}` : ""}
        onChange={(_evt, value) => {
          onDateChange(value);
        }}
      />
    </>
  );
};

export default React.memo(TimeAutocomplete);
