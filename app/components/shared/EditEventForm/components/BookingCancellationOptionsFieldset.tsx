import { FormLabel, Grid, IconButton, Stack } from "@mui/joy";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useFormContext from "../../../../lib/hooks/useFormContext";
import Fieldset from "../../../v2/Fieldset";
import Typography from "../../../v2/Typography";
import Input from "../../../v2/Input/Input";
import TextArea from "../../../v2/TextArea";
import Button from "../../../v2/Button/Button";
import { UpdateEventFields } from "../../../../scenes/firms/events/EditEventScene/useUpdateEventForm";

const BookingCancellationOptionsFieldset = () => {
  const form = useFormContext<UpdateEventFields>();
  const bookingCancellationOptionsField = form.useFormField<
    UpdateEventFields["bookingCancellationOptions"]
  >("bookingCancellationOptions");

  const addBookingCancellationOption = React.useCallback(() => {
    bookingCancellationOptionsField.onChange([
      ...bookingCancellationOptionsField.value,
      { penaltyPriceCents: 0, description: "", deadline: "12h" },
    ]);
  }, [bookingCancellationOptionsField]);

  const removeBookingCancellationOption = React.useCallback(
    (index: number) =>
      bookingCancellationOptionsField.onChange([
        ...bookingCancellationOptionsField.value.slice(0, index),
        ...bookingCancellationOptionsField.value.slice(index + 1),
      ]),
    [bookingCancellationOptionsField]
  );

  const onBookingCancellationOptionChange = React.useCallback(
    <ValueType extends string | number | boolean>(
      value: ValueType,
      index: number,
      field: string
    ) => {
      bookingCancellationOptionsField.onChange([
        ...bookingCancellationOptionsField.value.slice(0, index),
        {
          ...bookingCancellationOptionsField.value[index],
          [field]: value,
        },
        ...bookingCancellationOptionsField.value.slice(
          index + 1,
          bookingCancellationOptionsField.value.length
        ),
      ]);
    },
    [bookingCancellationOptionsField]
  );

  return (
    <Fieldset>
      <Grid container>
        <Grid xs={8}>
          <Typography level="h3">Booking Cancellation Options</Typography>
        </Grid>
        <Grid xs={4}>
          <Button size="sm" onClick={addBookingCancellationOption}>
            Add new Event Option
          </Button>
        </Grid>
        <FormLabel>
          If you skip this values, then booking can be cancelled at any time
        </FormLabel>
        {bookingCancellationOptionsField.value.map((opt, index) => (
          <Grid xs={12} container>
            <Grid xs={3}>
              <Input
                placeholder="Amount"
                startDecorator="$"
                label="Penalty"
                type="number"
                onChange={(value) =>
                  onBookingCancellationOptionChange(
                    value,
                    index,
                    "penaltyPriceCents"
                  )
                }
                value={opt.penaltyPriceCents.toString()}
                error={
                  form.formState.errors?.bookingCancellationOptions?.[index]
                    ?.penaltyPriceCents
                }
              />
            </Grid>
            <Grid xs={3}>
              <Input
                placeholder="Deadline"
                endDecorator="hours"
                label="Deadline for this Option"
                type="number"
                onChange={(value) =>
                  onBookingCancellationOptionChange(value, index, "deadline")
                }
                value={opt.deadline}
                error={
                  form.formState.errors?.bookingCancellationOptions?.[index]
                    ?.deadline
                }
              />
            </Grid>
            <Grid xs={5}>
              <TextArea
                placeholder="Description"
                label="Description"
                onChange={(value) =>
                  onBookingCancellationOptionChange(value, index, "description")
                }
                value={opt.description}
                error={
                  form.formState.errors?.bookingCancellationOptions?.[index]
                    ?.description
                }
              />
            </Grid>
            {!opt.id && (
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
                      removeBookingCancellationOption(index);
                    }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Stack>
              </Grid>
            )}
          </Grid>
        ))}
      </Grid>
    </Fieldset>
  );
};

export default React.memo(BookingCancellationOptionsFieldset);
