import useFormContext from "lib/hooks/useFormContext";
import Fieldset from "components/v2/Fieldset";
import { Divider, Grid, IconButton, Stack } from "@mui/joy";
import React from "react";
import { useTranslation } from "react-i18next";
import Input from "components/v2/Input";
import TextArea from "components/v2/TextArea";
import {
  EditEventTourPlanFormFields,
  TourPlace,
} from "components/shared/forms/tourPlan/EditEventTourPlan/useEditEventTourPlanForm";
import Button from "components/v2/Button/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Typography from "components/v2/Typography";

const TourPlanFieldset = () => {
  const form = useFormContext<EditEventTourPlanFormFields>();
  const { t } = useTranslation();
  const tourPlacesField =
    form.useFormField<EditEventTourPlanFormFields["tourPlaces"]>("tourPlaces");

  const addTourPlace = React.useCallback(() => {
    const updPlaces = [
      ...tourPlacesField.value,
      { title: "", description: "", image: null },
    ];

    tourPlacesField.onChange(updPlaces);
  }, [tourPlacesField]);

  const removeTourPlace = React.useCallback(
    (index: number) => {
      const updPlaces = tourPlacesField.value.filter(
        (
          place: {
            id?: string;
            title: string;
            description?: string;
            image?: string | null;
          },
          placeIndex: number
        ) => index !== placeIndex
      );

      tourPlacesField.onChange(updPlaces);
    },
    [tourPlacesField]
  );

  const changeTourPlace = React.useCallback(
    (index: number, field: string, value: string) => {
      const updPlaces = [...tourPlacesField.value];

      updPlaces[index][field as keyof TourPlace] = value;

      tourPlacesField.onChange(updPlaces);
    },
    [tourPlacesField]
  );

  return (
    <Fieldset variant="plain">
      <Grid container>
        <Grid xs={12}>
          <Input
            label={t("models.tourPlan.attributes.title")}
            {...form.useFormField("title")}
          />
        </Grid>
        <Grid xs={12}>
          <TextArea
            label={t("models.tourPlan.attributes.description")}
            minRows={5}
            {...form.useFormField("description")}
          />
        </Grid>
        <Grid xs={12}>
          <Divider sx={{ margin: 1 }} />
        </Grid>
        {tourPlacesField.value.map((place: TourPlace, index: number) => (
          <>
            <Grid xs={12}>
              <Stack direction="row" justifyContent="space-between">
                <Typography>#{index + 1}</Typography>
                <IconButton
                  size="sm"
                  color="danger"
                  onClick={() => {
                    removeTourPlace(index);
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Stack>
            </Grid>
            <Grid xs={12}>
              <Input
                label={t("models.tourPlace.attributes.title")}
                value={place.title}
                onChange={(value: string) =>
                  changeTourPlace(index, "title", value)
                }
                error={form.formState.errors?.tourPlaces?.[index]?.title}
              />
            </Grid>
            <Grid xs={12}>
              <TextArea
                label={t("models.tourPlace.attributes.description")}
                minRows={5}
                value={place.description}
                onChange={(value: string) =>
                  changeTourPlace(index, "description", value)
                }
                error={form.formState.errors?.tourPlaces?.[index]?.description}
              />
            </Grid>
            <Grid xs={12}>
              <Input
                label={t("models.tourPlace.attributes.durationTime")}
                value={place.durationTime}
                onChange={(value: string) =>
                  changeTourPlace(index, "durationTime", value)
                }
                error={form.formState.errors?.tourPlaces?.[index]?.durationTime}
              />
            </Grid>
            <Grid xs={12}>
              <Divider sx={{ margin: 1 }} />
            </Grid>
          </>
        ))}
        <Grid xs={12}>
          <Button size="sm" onClick={addTourPlace}>
            {t("forms.editEventTourPlan.addTourPlace")}
          </Button>
        </Grid>
      </Grid>
    </Fieldset>
  );
};

export default React.memo(TourPlanFieldset);
