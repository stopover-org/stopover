import { Grid, Option } from "@mui/joy";
import React from "react";
import { useTranslation } from "react-i18next";
import Input from "components/v2/Input/Input";
import Select from "components/v2/Select/Select";
import { FormProvider } from "react-hook-form";
import Editor from "components/v2/Editor/Editor";
import FileUploader from "components/v2/FileUploader";
import ImagePreviewFields from "components/shared/ImagePreviewFields";
import Description from "components/v2/Description";
import Typography from "components/v2/Typography";
import SubmitButton from "components/shared/SubmitButton";
import Fieldset from "components/v2/Fieldset";
import { graphql, useFragment } from "react-relay";
import { EditArticleForm_ArticleFragment$key } from "artifacts/EditArticleForm_ArticleFragment.graphql";
import { useEditArticleForm } from "./useEditArticleForm";

const EditArticleForm = ({
  articleFragmentRef,
}: {
  articleFragmentRef: EditArticleForm_ArticleFragment$key;
}) => {
  const article = useFragment(
    graphql`
      fragment EditArticleForm_ArticleFragment on Article {
        ...useEditArticleForm_ArticleFragment
      }
    `,
    articleFragmentRef
  );
  const { t } = useTranslation();
  const form = useEditArticleForm(article);
  const languageField = form.useFormField("language");
  const contentField = form.useFormField("content");
  const imageField = form.useFormField("image");
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit()} style={{ width: "100%" }}>
        <Fieldset>
          <Grid xs={12} sm={12} md={8} lg={8} pb="7px">
            <Input
              {...form.useFormField("title")}
              label={t("models.article.attributes.title")}
              hint={t("forms.editEvent.hints.title")}
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
              hint={t("forms.editEvent.hints.language")}
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
        <Fieldset>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <SubmitButton size="sm" submitting={form.formState.isSubmitting}>
              {t("general.save")}
            </SubmitButton>
          </Grid>
        </Fieldset>
      </form>
    </FormProvider>
  );
};

export default React.memo(EditArticleForm);
