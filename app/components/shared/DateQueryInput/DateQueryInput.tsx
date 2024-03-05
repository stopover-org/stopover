import { parseValue, useQuery, useUpdateQuery } from "lib/hooks/useQuery";
import moment from "moment";
import { Moment } from "moment/moment";
import DatePicker from "components/v2/DatePicker";
import React from "react";

interface DateQueryInputProps {
  queryKey: string;
  label: string;
  defaultValue?: Moment;
}

const DateQueryInput = ({
  queryKey,
  label,
  defaultValue,
}: DateQueryInputProps) => {
  const date = useQuery(queryKey, defaultValue, (dateStr) => {
    const parsedDt = moment(parseValue(dateStr));
    if (parsedDt.isValid()) {
      return parsedDt;
    }
    return null;
  });

  const updateDate = useUpdateQuery(queryKey, (dt: Moment) => {
    if (dt.isValid()) {
      return JSON.stringify(dt.format("YYYY-MM-DD"));
    }
    return "";
  });

  return (
    <DatePicker
      value={date}
      onChange={(value) => {
        updateDate(value);
      }}
      slotProps={{
        field: {
          label,
          size: "sm",
        },
      }}
    />
  );
};

export default React.memo(DateQueryInput);
