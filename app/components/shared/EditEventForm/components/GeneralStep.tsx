import React from "react";
import { Grid, Option, Stack } from "@mui/joy";
import { useTranslation } from "react-i18next";
import Fieldset from "../../../v2/Fieldset/Fieldset";
import Input from "../../../v2/Input/Input";
import FileUploader from "../../../v2/FileUploader/FileUploader";
import AddressFieldset from "../../AddressFieldset/AddressFieldset";
import useFormContext from "../../../../lib/hooks/useFormContext";
import Typography from "../../../v2/Typography/Typography";
import Checkbox from "../../../v2/Checkbox/Checkbox";
import Select from "../../../v2/Select/Select";
import TextArea from "../../../v2/TextArea/TextArea";
import ImagesPreviewFields from "../../ImagesPreviewFields";

const GeneralStep = () => {
  const form = useFormContext();
  const imagesField = form.useFormField<string[]>("images");
  const requiresCheckInField = form.useFormField("requiresCheckIn");
  const requiresContractField = form.useFormField("requiresContract");
  const requiresPassport = form.useFormField("requiresPassport");
  const eventType = form.useFormField("eventType");
  const { t } = useTranslation();

  return (
    <>
      <Fieldset>
        <Grid xs={12}>
          <Typography level="title-lg">
            {t("forms.editEvent.generalInformation")}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Input
            {...form.useFormField("title")}
            label={t("models.event.attributes.title")}
          />
        </Grid>

        <Grid xs={12}>
          <FileUploader
            pickerOptions={{ maxFiles: 10 }}
            onChange={(images) =>
              imagesField.onChange([...imagesField.value, ...images])
            }
          />
        </Grid>
        <ImagesPreviewFields />
      </Fieldset>
      <AddressFieldset />
      <Fieldset>
        <Grid xs={12}>
          <Typography level="title-lg">
            {t("forms.editEvent.eventRequirements")}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Stack>
            <Checkbox
              label={t("models.event.attributes.requiresCheckIn")}
              checked={Boolean(requiresCheckInField.value)}
              onChange={() =>
                requiresCheckInField.onChange(!requiresCheckInField.value)
              }
            />
            <Checkbox
              label={t("models.event.attributes.requiresContract")}
              checked={Boolean(requiresContractField.value)}
              onChange={() =>
                requiresContractField.onChange(!requiresContractField.value)
              }
              sx={{ paddingTop: "5px" }}
            />
            <Checkbox
              label={t("models.event.attributes.requiresPassport")}
              checked={Boolean(requiresPassport.value)}
              onChange={() =>
                requiresPassport.onChange(!requiresPassport.value)
              }
              sx={{ paddingTop: "5px" }}
            />
          </Stack>
        </Grid>

        <Grid xs={12}>
          <Typography level="title-lg">
            {t("models.event.attributes.eventType")}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Select
            label={t("models.event.attributes.eventType")}
            placeholder={t("forms.editEvent.selectType")}
            onChange={(value) => {
              eventType.onChange(value);
            }}
            value={eventType.value}
          >
            <Option value="excursion">
              {t("models.event.enums.eventType.excursion")}
            </Option>
            <Option value="tour">
              {t("models.event.enums.eventType.tour")}
            </Option>
            <Option value="in_town">
              {t("models.event.enums.eventType.in_town")}
            </Option>
            <Option value="out_of_town">
              {t("models.event.enums.eventType.out_of_town")}
            </Option>
            <Option value="active_holiday">
              {t("models.event.enums.eventType.active_holiday")}
            </Option>
            <Option value="music">
              {t("models.event.enums.eventType.music")}
            </Option>
            <Option value="workshop">
              {t("models.event.enums.eventType.workshop")}
            </Option>
            <Option value="business_breakfast">
              {t("models.event.enums.eventType.business_breakfast")}
            </Option>
            <Option value="meetup">
              {t("models.event.enums.eventType.meetup")}
            </Option>
            <Option value="sport_activity">
              {t("models.event.enums.eventType.sport_activity")}
            </Option>
            <Option value="gastronomic">
              {t("models.event.enums.eventType.gastronomic")}
            </Option>
          </Select>
        </Grid>
      </Fieldset>
      <Fieldset>
        <Grid container>
          <Grid xs={12}>
            <Typography level="title-lg">
              {t("models.attendee.plural")}
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Input
              type="number"
              label={t("models.event.attributes.minAttendees")}
              placeholder="Min"
              slotProps={{
                input: {
                  min: 0,
                  step: 1,
                },
              }}
              {...form.useFormField("minAttendees")}
            />
          </Grid>
          <Grid xs={6}>
            <Input
              type="number"
              label={t("models.event.attributes.maxAttendees")}
              placeholder="Max"
              slotProps={{
                input: {
                  min: 0,
                  step: 1,
                },
              }}
              {...form.useFormField("maxAttendees")}
            />
          </Grid>
        </Grid>
      </Fieldset>
      <Fieldset>
        <Grid xs={12}>
          <Typography level="title-lg">
            {t("models.event.attributes.description")}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <TextArea
            minRows={6}
            {...form.useFormField("description")}
            placeholder={t("models.event.attributes.description")}
          />
        </Grid>
      </Fieldset>
    </>
  );
};

export default React.memo(GeneralStep);
