import React from "react";
import { Grid, IconButton, Stack } from "@mui/joy";
import moment, { Moment } from "moment";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Fieldset from "../../../../../components/v2/Fieldset";
import useFormContext from "../../../../../lib/hooks/useFormContext";
import { CreateEventFields } from "../useCreateEventForm";
import DatePicker from "../../../../../components/v2/DatePicker/DatePicker";
import Button from "../../../../../components/v2/Button/Button";

interface SingleDatesFieldsProps {}

const SingleDatesFieldset = (props: SingleDatesFieldsProps) => {
  const form = useFormContext<CreateEventFields>();
  const singleDates =
    form.useFormField<CreateEventFields["singleDates"]>("singleDates");

  const addSingleDate = () =>
    singleDates.onChange([...singleDates.value, moment()]);

  const removeSingleDate = (index: number) =>
    singleDates.onChange([
      ...singleDates.value.slice(0, index),
      ...singleDates.value.slice(index + 1),
    ]);

  const changeSingleDate = (date: Moment | null, index: number) =>
    singleDates.onChange([
      ...singleDates.value.slice(0, index),
      date,
      ...singleDates.value.slice(index + 1),
    ]);

  return (
    <Fieldset>
      <Grid xs={12} container>
        <Grid xs={12}>
          <Button size="sm" onClick={addSingleDate}>
            Add new date
          </Button>
        </Grid>
        {singleDates.value.map((date, index) => (
          <>
            <Grid xs={4}>
              <DatePicker
                label="Single date for event"
                value={date}
                onChange={(newDate) => changeSingleDate(newDate, index)}
              />
            </Grid>
            <Grid xs={1}>
              <Stack
                justifyContent="center"
                alignItems="flex-end"
                height="100%"
              >
                <IconButton
                  size="sm"
                  color="danger"
                  onClick={() => {
                    removeSingleDate(index);
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Stack>
            </Grid>
            <Grid xs={7} />
          </>
        ))}
      </Grid>
    </Fieldset>
  );
};

export default React.memo(SingleDatesFieldset);
