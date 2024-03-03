import React from "react";
import { FormControl, FormHelperText, Grid, IconButton, Stack } from "@mui/joy";
import moment, { Moment } from "moment";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useTranslation } from "react-i18next";
import Fieldset from "../../../v2/Fieldset";
import useFormContext from "../../../../lib/hooks/useFormContext";
import { CreateEventFields } from "../../../../scenes/firms/events/CreateEventScene/useCreateEventForm";
import DatePicker from "../../../v2/DatePicker/DatePicker";
import Button from "../../../v2/Button/Button";
import Typography from "../../../v2/Typography/Typography";
import TimeAutocomplete from "../../TimeAutocomplete";

const SingleDatesFieldset = () => {
  const form = useFormContext<CreateEventFields>();
  const singleDates =
    form.useFormField<CreateEventFields["singleDates"]>("singleDates");

  const addSingleDate = () =>
    singleDates.onChange([...singleDates.value, { date: moment() }]);

  const removeSingleDate = (index: number) =>
    singleDates.onChange([
      ...singleDates.value.slice(0, index),
      ...singleDates.value.slice(index + 1),
    ]);

  const changeSingleDate = (
    value: Moment | string | number | null,
    index: number,
    field?: string
  ) => {
    if (field === "date") {
      singleDates.onChange([
        ...singleDates.value.slice(0, index),
        {
          ...singleDates.value[index],
          [field]: value,
        },
        ...singleDates.value.slice(index + 1),
      ]);
    } else {
      const [hour, minute] = (value as string).split(":");
      singleDates.onChange([
        ...singleDates.value.slice(0, index),
        {
          ...singleDates.value[index],
          hour,
          minute,
        },
        ...singleDates.value.slice(index + 1),
      ]);
    }
  };
  const { t } = useTranslation();

  return (
    <Fieldset>
      <Grid xs={12} container>
        <Grid xs={12}>
          <Button size="sm" onClick={addSingleDate}>
            {t("forms.editEvent.addNewSingleDate")}
          </Button>
        </Grid>
        {singleDates.value.map(({ date, hour, minute }, index) => (
          <React.Fragment key={index}>
            <Grid xs={4}>
              <FormControl sx={{ margin: 0 }}>
                <DatePicker
                  label={t("forms.editEvent.oneTimeStartAt")}
                  value={date}
                  onChange={(newDate) =>
                    changeSingleDate(newDate as Moment, index, "date")
                  }
                />

                {!!form.formState.errors?.singleDates?.[index]?.date && (
                  <FormHelperText>
                    <Typography color="danger" fontSize="sm">
                      {
                        form.formState.errors?.singleDates?.[index]?.date
                          ?.message
                      }
                    </Typography>
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid xs={4}>
              <FormControl sx={{ margin: 0 }}>
                <TimeAutocomplete
                  onDateChange={(value) => changeSingleDate(value, index)}
                  hour={hour?.toString()}
                  minute={minute?.toString()}
                />
                {(!!form.formState.errors?.singleDates?.[index]?.hour ||
                  !!form.formState.errors?.singleDates?.[index]?.minute) && (
                  <FormHelperText>
                    <Typography color="danger" fontSize="sm">
                      {t("general.required")}
                    </Typography>
                  </FormHelperText>
                )}
              </FormControl>
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
                    removeSingleDate(index);
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Stack>
            </Grid>
            <Grid xs={2} />
          </React.Fragment>
        ))}
      </Grid>
    </Fieldset>
  );
};

export default React.memo(SingleDatesFieldset);
