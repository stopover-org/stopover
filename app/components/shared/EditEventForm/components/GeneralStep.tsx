import React from "react";
import { Autocomplete, Grid, Option } from "@mui/joy";
import { useTranslation } from "react-i18next";
import Fieldset from "components/v2/Fieldset";
import Input from "components/v2/Input";
import FileUploader from "components/v2/FileUploader";
import useFormContext from "lib/hooks/useFormContext";
import Typography from "components/v2/Typography";
import Select from "components/v2/Select";
import ImagesPreviewFields from "components/shared/ImagesPreviewFields";
import Editor from "components/v2/Editor";
import { graphql, useLazyLoadQuery } from "react-relay";
import { GeneralStep_InterestsQuery } from "artifacts/GeneralStep_InterestsQuery.graphql";

const GeneralStep = () => {
  const data = useLazyLoadQuery<GeneralStep_InterestsQuery>(
    graphql`
      query GeneralStep_InterestsQuery {
        interests {
          nodes {
            title
            id
          }
        }
      }
    `,
    {}
  );
  const form = useFormContext();
  const imagesField = form.useFormField<string[]>("images");
  const interestIds = form.useFormField("interestIds");
  const descriptionField = form.useFormField("description");
  const languageField = form.useFormField("language");
  const { t } = useTranslation();
  const selectedInterests = React.useMemo(
    () =>
      interestIds.value.map((id: string) => ({
        value: id,
        label: data?.interests?.nodes?.find((interest) => interest.id === id)
          ?.title,
      })),
    [interestIds, data?.interests?.nodes]
  );

  const availableInterests = React.useMemo(
    () =>
      data?.interests?.nodes?.filter(
        (interest) => !interestIds.value.includes(interest.id)
      ),
    [interestIds.value, data?.interests]
  );

  return (
    <>
      <Fieldset>
        <Grid xs={12}>
          <Typography level="title-lg">
            {t("forms.editEvent.generalInformation")}
          </Typography>
        </Grid>
        <Grid xs={12} sm={12} md={8} lg={6}>
          <Input
            {...form.useFormField("title")}
            fullWidth={false}
            hint={t("forms.editEvent.hints.title")}
          />
        </Grid>
        <Grid xs={12} sm={4} md={4} lg={2}>
          <Select
            placeholder={t("languages.action")}
            sx={{ width: "100%" }}
            name={languageField.value}
            onChange={languageField.onChange}
            value={languageField.value}
            defaultValue="en"
            hint={t("forms.editEvent.hints.language")}
          >
            <Option value="ru">{t("languages.russian")}</Option>
            <Option value="en">{t("languages.english")}</Option>
          </Select>
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

      <Fieldset>
        <Grid xs={12}>
          <Typography level="title-lg">
            {t("models.interest.singular")}
          </Typography>
        </Grid>
        <Grid xs={12} sm={12} md={8} lg={6}>
          <Autocomplete
            disableClearable
            multiple
            placeholder={t("forms.editEvent.selectType")}
            onChange={(event, values) => {
              interestIds.onChange(values.map(({ value }) => value));
            }}
            options={availableInterests?.map((interest) => ({
              value: interest.id,
              label: interest.title,
            }))}
            value={selectedInterests}
          />
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
              min={0}
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
          <Editor
            errorMessage={descriptionField.error?.message}
            value={descriptionField.value}
            onChange={descriptionField.onChange}
            placeholder={t("models.event.attributes.description")}
          />
        </Grid>
      </Fieldset>
    </>
  );
};

export default React.memo(GeneralStep);
