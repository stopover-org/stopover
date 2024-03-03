import {
  Divider,
  FormLabel,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  useTheme,
} from "@mui/joy";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useTranslation } from "react-i18next";
import useFormContext from "lib/hooks/useFormContext";
import Typography from "components/v2/Typography";
import Input from "components/v2/Input/Input";
import TextArea from "components/v2/TextArea";
import { getCurrencyFormat } from "lib/utils/currencyFormatter";
import AddIcon from "@mui/icons-material/Add";
import { EditEventCancellationFormFields } from "components/shared/forms/eventCancellationOption/EditEventCancellations/useEditEventCancellationsForm";
import { useMediaQuery } from "@mui/material";

const BookingCancellationOptionsFieldset = () => {
  const form = useFormContext<EditEventCancellationFormFields>();
  const bookingCancellationOptionsField = form.useFormField<
    EditEventCancellationFormFields["bookingCancellationOptions"]
  >("bookingCancellationOptions");

  const addBookingCancellationOption = React.useCallback(() => {
    bookingCancellationOptionsField.onChange([
      ...bookingCancellationOptionsField.value,
      { penaltyPriceCents: 0, description: "", deadline: 0 },
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
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid xs={12} sm={12} md={12} lg={12}>
        <Stack direction="row" justifyContent="space-between">
          <Typography level="title-lg">
            {t("models.bookingCancellationOption.plural")}
          </Typography>
          <Tooltip title={t("forms.editEvent.addCancellationOption")}>
            <IconButton size="sm" onClick={addBookingCancellationOption}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Grid>
      <FormLabel>
        {t("forms.editEvent.ifYouSkipCancellationOptionHint")}
      </FormLabel>
      {bookingCancellationOptionsField.value.map((opt, index) => (
        <Grid xs={12} sm={12} md={12} lg={12} container>
          <Grid xs={12} sm={12} md={6} lg={3}>
            <Input
              placeholder={t(
                "models.bookingCancellationOption.attributes.penaltyPrice"
              )}
              startDecorator="RSD"
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
          <Grid xs={12} sm={12} md={6} lg={3}>
            <Input
              placeholder={t(
                "models.bookingCancellationOption.attributes.deadline"
              )}
              endDecorator={t("general.hours")}
              label={t("models.bookingCancellationOption.attributes.deadline")}
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
          <Grid xs={11} sm={11} md={11} lg={4}>
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
            <Grid xs={1} sm={1} md={1} lg={2}>
              <Stack
                justifyContent="flex-start"
                alignItems="flex-start"
                height="100%"
                sx={{ paddingTop: "1.25em" }}
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
          {parseInt(opt.deadline.toString(), 10) > 0 && (
            <Grid xs={12} sm={12} md={12} lg={12}>
              {t("models.bookingCancellationOption.terms.withPenalty", {
                deadline: parseInt(opt.deadline.toString(), 10),
                penalty: getCurrencyFormat(opt.penaltyPriceCents, "rsd", false),
              })}
            </Grid>
          )}
          {isMobileView && (
            <Grid xs={12} sm={12}>
              <Divider />
            </Grid>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default React.memo(BookingCancellationOptionsFieldset);
