import React from "react";
import { Grid, IconButton, Stack } from "@mui/joy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useFormContext from "../../../../lib/hooks/useFormContext";
import { CreateEventFields } from "../../../../scenes/firms/events/CreateEventScene/useCreateEventForm";
import Button from "../../../v2/Button/Button";
import Fieldset from "../../../v2/Fieldset";
import Checkbox from "../../../v2/Checkbox";
import Input from "../../../v2/Input";

const EventOptionsFieldset = () => {
  const form = useFormContext<CreateEventFields>();
  const eventOptionsField =
    form.useFormField<CreateEventFields["eventOptions"]>("eventOptions");

  const onEventOptionChange = React.useCallback(
    <ValueType extends string | number | boolean>(
      value: ValueType,
      index: number,
      field: string
    ) => {
      eventOptionsField.onChange([
        ...eventOptionsField.value.slice(0, index),
        {
          ...eventOptionsField.value[index],
          [field]: value,
        },
        ...eventOptionsField.value.slice(
          index + 1,
          eventOptionsField.value.length
        ),
      ]);
    },
    [eventOptionsField]
  );

  const addEventOption = React.useCallback(
    () =>
      eventOptionsField.onChange([
        ...eventOptionsField.value,
        { builtIn: false },
      ]),
    [eventOptionsField]
  );

  const removeEventOption = React.useCallback(
    (index: number) =>
      eventOptionsField.onChange([
        ...eventOptionsField.value.slice(0, index),
        ...eventOptionsField.value.slice(index + 1),
      ]),
    [eventOptionsField]
  );
  return (
    <Fieldset>
      <Grid xs={12} container>
        <Grid xs={12}>
          <Button size="sm" onClick={addEventOption}>
            Add new Event Option
          </Button>
        </Grid>
        {eventOptionsField.value.map((eventOption, index) => (
          <>
            <Grid xs={4}>
              <Input
                value={eventOption.title}
                label="Event Option Title"
                onChange={(value) => onEventOptionChange(value, index, "title")}
                error={form.formState.errors?.eventOptions?.[index]?.title}
              />
            </Grid>
            <Grid xs={4}>
              <Input
                value={eventOption.organizerPriceCents?.toString() || ""}
                onChange={(value) =>
                  onEventOptionChange(value, index, "organizerPriceCents")
                }
                type="number"
                label="Organizer Price"
                error={
                  form.formState.errors?.eventOptions?.[index]
                    ?.organizerPriceCents
                }
              />
            </Grid>
            <Grid xs={1}>
              <Stack
                justifyContent="flex-start"
                alignItems="flex-end"
                height="100%"
                sx={{ paddingTop: "2em" }}
              >
                <IconButton
                  size="sm"
                  color="danger"
                  onClick={() => {
                    removeEventOption(index);
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Stack>
            </Grid>
            <Grid xs={3} />
            <Grid xs={4}>
              <Checkbox
                checked={eventOption.builtIn}
                label="Built In"
                onChange={() =>
                  onEventOptionChange(!eventOption.builtIn, index, "builtIn")
                }
              />
            </Grid>
            <Grid xs={4}>
              <Checkbox
                checked={eventOption.forAttendee}
                label="Will be applied for every attendee"
                onChange={() =>
                  onEventOptionChange(
                    !eventOption.forAttendee,
                    index,
                    "forAttendee"
                  )
                }
              />
            </Grid>
            <Grid xs={4} />
          </>
        ))}
      </Grid>
    </Fieldset>
  );
};

export default React.memo(EventOptionsFieldset);
