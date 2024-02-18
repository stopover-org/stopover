import React from "react";
import { Grid, IconButton, Stack } from "@mui/joy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useTranslation } from "react-i18next";
import useFormContext from "lib/hooks/useFormContext";
import Button from "components/v2/Button/Button";
import Fieldset from "components/v2/Fieldset";
import Checkbox from "components/v2/Checkbox";
import Input from "components/v2/Input";
import { UpdateEventFields } from "scenes/firms/events/EditEventScene/useUpdateEventForm";

const EventOptionsFieldset = () => {
  const form = useFormContext<UpdateEventFields>();
  const eventOptionsField =
    form.useFormField<UpdateEventFields["eventOptions"]>("eventOptions");

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
        { builtIn: false, forAttendee: false, organizerPriceCents: 0 },
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
  const { t } = useTranslation();
  return (
    <Fieldset>
      <Grid xs={12} container>
        <Grid xs={12}>
          <Button size="sm" onClick={addEventOption}>
            {t("forms.editEvent.addNewOption")}
          </Button>
        </Grid>
        {eventOptionsField.value.map((eventOption, index) => (
          <>
            <Grid xs={4}>
              <Input
                value={eventOption.title}
                label={t("models.eventOption.attributes.title")}
                onChange={(value) => onEventOptionChange(value, index, "title")}
                error={form.formState.errors?.eventOptions?.[index]?.title}
              />
            </Grid>
            <Grid xs={4}>
              <Input
                placeholder={t("models.eventOption.attributes.organizerPrice")}
                startDecorator="$"
                value={eventOption.organizerPriceCents.toString()}
                onChange={(value) =>
                  onEventOptionChange(value, index, "organizerPriceCents")
                }
                type="number"
                label={t("models.eventOption.attributes.organizerPrice")}
                error={
                  form.formState.errors?.eventOptions?.[index]
                    ?.organizerPriceCents
                }
              />
            </Grid>
            {!eventOption.id && (
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
            )}
            <Grid xs={3} />
            <Grid xs={4}>
              <Checkbox
                checked={eventOption.builtIn}
                label={t("models.eventOption.attributes.builtIn")}
                onChange={() =>
                  onEventOptionChange(!eventOption.builtIn, index, "builtIn")
                }
              />
            </Grid>
            <Grid xs={4}>
              <Checkbox
                checked={eventOption.forAttendee}
                label={t("models.eventOption.attributes.forAttendee")}
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
