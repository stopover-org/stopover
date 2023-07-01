import React from "react";
import { Grid } from "@mui/joy";
import Fieldset from "../../../v2/Fieldset";
import useFormContext from "../../../../lib/hooks/useFormContext";
import { CreateEventFields } from "../../../../scenes/firms/events/CreateEventScene/useCreateEventForm";
import DatePicker from "../../../v2/DatePicker/DatePicker";

const EndDateFieldset = () => {
  const form = useFormContext<CreateEventFields>();
  const endDate = form.useFormField<CreateEventFields["endDate"]>("endDate");

  return (
    <Fieldset>
      <Grid xs={12} container>
        <Grid xs={4}>
          <DatePicker
            label="Event will be ended at"
            value={endDate.value}
            onChange={endDate.onChange}
            error={endDate.error}
            disablePast
          />
        </Grid>
      </Grid>
    </Fieldset>
  );
};

export default React.memo(EndDateFieldset);
