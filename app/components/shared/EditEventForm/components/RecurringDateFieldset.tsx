import {
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  Stack,
  useTheme,
} from "@mui/joy";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useTranslation } from "react-i18next";
import Fieldset from "components/v2/Fieldset/Fieldset";
import Typography from "components/v2/Typography/Typography";
import useFormContext from "lib/hooks/useFormContext";
import Button from "components/v2/Button";
import { CreateEventFields } from "scenes/firms/events/CreateEventScene/useCreateEventForm";
import Input from "components/v2/Input";
import TimeAutocomplete from "components/shared/TimeAutocomplete";
import { useMediaQuery } from "@mui/material";

const RecurringDateFieldset = () => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  const form = useFormContext<CreateEventFields>();
  const recurringDatesField =
    form.useFormField<CreateEventFields["recurringDates"]>(`recurringDates`);
  const durationTimeField = form.useFormField("durationTime");
  const onDateChange = React.useCallback(
    (value: string, index: number, field?: string) => {
      if (field === "day") {
        recurringDatesField.onChange([
          ...recurringDatesField.value.slice(0, index),
          {
            ...recurringDatesField.value[index],
            [field]: value,
          },
          ...recurringDatesField.value.slice(
            index + 1,
            recurringDatesField.value.length
          ),
        ]);
      } else {
        recurringDatesField.onChange([
          ...recurringDatesField.value.slice(0, index),
          {
            ...recurringDatesField.value[index],
            hour: value.split(":")[0],
            minute: value.split(":")[1],
          },
          ...recurringDatesField.value.slice(
            index + 1,
            recurringDatesField.value.length
          ),
        ]);
      }
    },
    [recurringDatesField]
  );

  const addHandler = React.useCallback(() => {
    recurringDatesField.onChange([
      ...recurringDatesField.value,
      { day: null, hour: null, minute: null },
    ]);
  }, [recurringDatesField.value, recurringDatesField.onChange]);

  const removeRow = React.useCallback(
    (index: number) => {
      recurringDatesField.onChange([
        ...recurringDatesField.value.slice(0, index),
        ...recurringDatesField.value.slice(index + 1),
      ]);
    },
    [recurringDatesField.value, recurringDatesField.onChange]
  );
  const { t } = useTranslation();

  return (
    <>
      <Fieldset>
        <Grid xs={12}>
          <Typography level="title-lg">
            {t("models.event.attributes.durationTime")}
          </Typography>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={4}>
          <Input
            label=""
            {...durationTimeField}
            hint={t("forms.editEvent.hints.durationTime")}
          />
        </Grid>
      </Fieldset>

      <Fieldset>
        <Grid xs={12} container>
          <Button size="sm" onClick={addHandler}>
            {t("forms.editEvent.addNewRecurringDate")}
          </Button>
        </Grid>

        {recurringDatesField.value.map(
          ({ day, hour, minute }, index: number) => (
            <Grid xs={12} container key={index}>
              <Grid xs={12} sm={12} md={5} lg={5}>
                <FormControl sx={{ margin: 0 }}>
                  <FormLabel>{t("forms.editEvent.recurringStartAt")}</FormLabel>
                  <Stack
                    direction="row"
                    alignItems="flex-start"
                    spacing={2}
                    useFlexGap
                    flexWrap="wrap"
                  >
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((d) => (
                      <Typography
                        key={d}
                        color="primary"
                        variant={day === d ? `solid` : `soft`}
                        onClick={() => {
                          onDateChange(d as string, index, "day");
                        }}
                      >
                        {t(`weekdays.${d.toLowerCase()}`)}
                      </Typography>
                    ))}
                  </Stack>
                </FormControl>
                {!!form.formState.errors?.recurringDates?.[index]?.day && (
                  <FormHelperText>
                    <Typography color="danger" fontSize="sm">
                      {t("general.required")}
                    </Typography>
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={10} sm={10} md={5} lg={5}>
                <FormControl sx={{ margin: 0 }}>
                  <TimeAutocomplete
                    onDateChange={(value) => onDateChange(value, index)}
                    hour={hour?.toString()}
                    minute={minute?.toString()}
                  />
                  {(!!form.formState.errors?.recurringDates?.[index]?.hour ||
                    !!form.formState.errors?.recurringDates?.[index]
                      ?.minute) && (
                    <FormHelperText>
                      <Typography color="danger" fontSize="sm">
                        {t("general.required")}
                      </Typography>
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid xs={2} sm={2} md={2} lg={2}>
                <Stack
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  height="100%"
                  sx={{ paddingTop: "2em" }}
                >
                  <IconButton
                    size="sm"
                    color="danger"
                    onClick={() => {
                      removeRow(index);
                    }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Stack>
              </Grid>
              {isMobileView && (
                <Grid xs={12} sm={12}>
                  <Divider />
                </Grid>
              )}
            </Grid>
          )
        )}
      </Fieldset>
    </>
  );
};

export default React.memo(RecurringDateFieldset);
