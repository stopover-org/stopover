import { FormLabel, Grid, IconButton, Stack } from "@mui/joy";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useTranslation } from "react-i18next";
import useFormContext from "../../../../lib/hooks/useFormContext";
import Fieldset from "../../../v2/Fieldset";
import Typography from "../../../v2/Typography";
import Input from "../../../v2/Input/Input";
import TextArea from "../../../v2/TextArea";
import Button from "../../../v2/Button/Button";
import { UpdateEventFields } from "../../../../scenes/firms/events/EditEventScene/useUpdateEventForm";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";

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
  const { t } = useTranslation();

  return (
    <Fieldset>
      <Grid container>
        <Grid xs={8}>
          <Typography level="title-lg">Booking Cancellation Options</Typography>
        </Grid>
        <Grid xs={4}>
          <Button size="sm" onClick={addBookingCancellationOption}>
            {t("forms.editEvent.addCancellationOption")}
          </Button>
        </Grid>
        <FormLabel>
          {t("forms.editEvent.ifYouSkipCancellationOptionHint")}
        </FormLabel>
        {bookingCancellationOptionsField.value.map((opt, index) => (
          <Grid xs={12} container>
            <Grid xs={3}>
              <Input
                placeholder={t(
                  "models.bookingCancellationOption.attributes.penaltyPrice"
                )}
                startDecorator="$"
                label={t(
                  "models.bookingCancellationOption.attributes.penaltyPrice"
                )}
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
                placeholder={t(
                  "models.bookingCancellationOption.attributes.deadline"
                )}
                endDecorator="hours"
                label={t(
                  "models.bookingCancellationOption.attributes.deadline"
                )}
                type="number"
                onChange={(value) =>
                  onBookingCancellationOptionChange(value, index, "deadline")
                }
                value={opt.deadline.toString()}
                error={
                  form.formState.errors?.bookingCancellationOptions?.[index]
                    ?.deadline
                }
              />
            </Grid>
            <Grid xs={5}>
              <TextArea
                placeholder={t(
                  "models.bookingCancellationOption.attributes.description"
                )}
                label={t(
                  "models.bookingCancellationOption.attributes.description"
                )}
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
            {opt.deadline && (
              <Grid xs={12}>
                {t("models.bookingCancellationOption.terms.withPenalty", {
                  deadline: parseInt(opt.deadline.toString(), 10),
                  penalty: getCurrencyFormat(opt.penaltyPriceCents, "usd"),
                })}
              </Grid>
            )}
          </Grid>
        ))}
      </Grid>
    </Fieldset>
  );
};

export default React.memo(BookingCancellationOptionsFieldset);
