import React from "react";
import { Grid } from "@mui/joy";
import Fieldset from "../../../../../components/v2/Fieldset";
import useFormContext from "../../../../../lib/hooks/useFormContext";
import { CreateEventFields } from "../useCreateEventForm";
import DatePicker from "../../../../../components/v2/DatePicker/DatePicker";

const EndDateFieldset = () => {
  const form = useFormContext<CreateEventFields>();
  const endDate = form.useFormField<CreateEventFields["endDate"]>("endDate");

  return (
    <Fieldset>
      <Grid xs={12} container>
        <Grid xs={4}>
          <DatePicker
            label="One time event starts at"
            value={endDate.value}
            onChange={endDate.onChange}
            error={endDate.error}
          />
        </Grid>
      </Grid>
    </Fieldset>
  );
};

export default React.memo(EndDateFieldset);
