import React from "react";
import { Grid } from "@mui/joy";
import { useTranslation } from "react-i18next";
import Fieldset from "components/v2/Fieldset";
import useFormContext from "lib/hooks/useFormContext";
import { CreateEventFields } from "scenes/firms/events/CreateEventScene/useCreateEventForm";
import DatePicker from "components/v2/DatePicker";

const EndDateFieldset = () => {
  const form = useFormContext<CreateEventFields>();
  const endDate = form.useFormField<CreateEventFields["endDate"]>("endDate");
  const { t } = useTranslation();

  return (
    <Fieldset>
      <Grid xs={12} container>
        <Grid xs={12} sm={12} md={6} lg={4}>
          <DatePicker
            label={t("models.event.attributes.endDate")}
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
