import React from "react";
import { Grid } from "@mui/joy";
import moment, { Moment } from "moment/moment";
import useFormContext from "../../../../../lib/hooks/useFormContext";
import { CreateEventFields } from "../useCreateEventForm";
import Button from "../../../../../components/v2/Button/Button";
import Fieldset from "../../../../../components/v2/Fieldset";
import Checkbox from "../../../../../components/v2/Checkbox";
import Input from "../../../../../components/v2/Input";

interface EventOptionsSectionProps {}

const EventOptionsSection = (props: EventOptionsSectionProps) => {
  console.log("don't collapse me");
  const form = useFormContext<CreateEventFields>();
  const eventOptionsField =
    form.useFormField<CreateEventFields["eventOptions"]>("eventOptions");

  const addEventOption = () =>
    eventOptionsField.onChange([...eventOptionsField.value, {}]);

  const removeEventOption = (index: number) =>
    eventOptionsField.onChange([
      ...eventOptionsField.value.slice(0, index),
      ...eventOptionsField.value.slice(index + 1),
    ]);
  return (
    <Fieldset>
      <Grid xs={12} container>
        <Grid xs={12}>
          <Button size="sm" onClick={addEventOption}>
            Add new Event Option
          </Button>
        </Grid>
        {eventOptionsField.value.map((eventOption) => (
          <>
            <Grid xs={4}>
              <Input value={eventOption.title} label="Event Option Title" />
            </Grid>
            <Grid xs={4}>
              <Input
                value={eventOption.organizerPriceCents}
                type="number"
                label="Organizer Price"
              />
            </Grid>
            <Grid xs={4} />
            <Grid xs={4}>
              <Checkbox checked={eventOption.builtIn} label="Built In" />
            </Grid>
            <Grid xs={8} />
          </>
        ))}
      </Grid>
    </Fieldset>
  );
};

export default React.memo(EventOptionsSection);
