import useFormContext from "lib/hooks/useFormContext";
import React from "react";
import { Autocomplete, Grid, Option } from "@mui/joy";
import Fieldset from "components/v2/Fieldset";
import Input from "components/v2/Input";
import Select from "components/v2/Select";
import FileUploader from "components/v2/FileUploader";
import ImagePreviewFields from "components/shared/ImagePreviewFields";
import Typography from "components/v2/Typography";
import Editor from "components/v2/Editor";
import Description from "components/v2/Description";
import { useTranslation } from "react-i18next";
import { graphql, useLazyLoadQuery } from "react-relay";
import { ArticleForm_InterestsQuery } from "artifacts/ArticleForm_InterestsQuery.graphql";

const ArticleForm = () => {
  const data = useLazyLoadQuery<ArticleForm_InterestsQuery>(
    graphql`
      query ArticleForm_InterestsQuery {
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
  const { t } = useTranslation();
  const languageField = form.useFormField("language");
  const contentField = form.useFormField("content");
  const imageField = form.useFormField("image");
  const interestIds = form.useFormField("interestIds");
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
    <Fieldset margin="10px 0 0 0 ">
      <Grid xs={12} sm={12} md={8} lg={8} pb="7px">
        <Input
          {...form.useFormField("title")}
          label={t("models.article.attributes.title")}
        />
      </Grid>
      <Grid xs={12} sm={12} md={4} lg={4}>
        <Select
          placeholder={t("languages.action")}
          sx={{ width: "100%" }}
          name={languageField.value}
          onChange={languageField.onChange}
          value={languageField.value}
          defaultValue="en"
          label={t("models.article.attributes.language")}
        >
          <Option value="ru">{t("languages.russian")}</Option>
          <Option value="en">{t("languages.english")}</Option>
        </Select>
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={12}>
        <FileUploader
          onChange={(images) => imageField.onChange(images[0])}
          pickerOptions={{ maxFiles: 1 }}
        />
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={12}>
        <ImagePreviewFields />
      </Grid>
      <Grid xs={12}>
        <Typography level="title-lg">{t("models.interest.plural")}</Typography>
      </Grid>
      <Grid xs={12} sm={12} md={8} lg={6}>
        <Autocomplete
          disableClearable
          multiple
          placeholder={t("models.interest.plural")}
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
      <Grid xs={12} sm={12} md={12} lg={12}>
        <Typography fontSize="lg">
          {t("models.article.attributes.content")}
        </Typography>
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={12}>
        <Editor
          errorMessage={contentField.error?.message}
          value={contentField.value}
          onChange={contentField.onChange}
          placeholder={t("models.article.attributes.content")}
          withImagePlugin
        />
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={12}>
        <Typography fontSize="lg">Preview</Typography>
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={12}>
        <Description html={contentField.value} />
      </Grid>
    </Fieldset>
  );
};

export default React.memo(ArticleForm);
