import React from "react";
import { FormHelperText, Grid, IconButton, Option, Stack } from "@mui/joy";
import moment, { Moment } from "moment";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useTranslation } from "react-i18next";
import Fieldset from "../../../v2/Fieldset";
import useFormContext from "../../../../lib/hooks/useFormContext";
import { CreateEventFields } from "../../../../scenes/firms/events/CreateEventScene/useCreateEventForm";
import DatePicker from "../../../v2/DatePicker/DatePicker";
import Button from "../../../v2/Button/Button";
import Typography from "../../../v2/Typography/Typography";
import Select from "../../../v2/Select/Select";

const SingleDatesFieldset = () => {
  const minutes = React.useMemo(() => Array.from(Array(60).keys()), []);
  const hours = React.useMemo(() => Array.from(Array(24).keys()), []);
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
    field: string
  ) =>
    singleDates.onChange([
      ...singleDates.value.slice(0, index),
      {
        ...singleDates.value[index],
        [field]: value,
      },
      ...singleDates.value.slice(index + 1),
    ]);
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
              <DatePicker
                label={t("forms.editEvent.onetimeStartAt")}
                value={date}
                onChange={(newDate) =>
                  changeSingleDate(newDate as Moment, index, "date")
                }
              />

              {!!form.formState.errors?.singleDates?.[index]?.date && (
                <FormHelperText>
                  <Typography color="danger" fontSize="sm">
                    {form.formState.errors?.singleDates?.[index]?.date?.message}
                  </Typography>
                </FormHelperText>
              )}
            </Grid>
            <Grid xs={2}>
              <Select
                label={t("general.hours")}
                onChange={(value) => {
                  changeSingleDate(value as number, index, "hour");
                }}
                value={hour}
                error={form.formState.errors?.singleDates?.[index]?.hour}
              >
                {hours.map((h) => (
                  <Option key={h} value={h}>
                    {h.toString().padStart(2, "0")} {t("general.hourShort")}
                  </Option>
                ))}
              </Select>
            </Grid>
            <Grid>
              <Stack
                direction="row"
                alignItems="flex-start"
                height="100%"
                sx={{ paddingTop: "25px" }}
              >
                <Typography level="title-lg">&nbsp;:&nbsp;</Typography>
              </Stack>
            </Grid>
            <Grid xs={2}>
              <Select
                label={t("general.minutes")}
                onChange={(value) => {
                  changeSingleDate(value as number, index, "minute");
                }}
                value={minute}
                error={form.formState.errors?.singleDates?.[index]?.minute}
              >
                {minutes.map((m) => (
                  <Option key={m} value={m}>
                    {m.toString().padStart(2, "0")} {t("general.minuteShort")}
                  </Option>
                ))}
              </Select>
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
