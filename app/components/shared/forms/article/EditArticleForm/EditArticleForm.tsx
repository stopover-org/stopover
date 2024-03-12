import { Grid } from "@mui/joy";
import React from "react";
import { useTranslation } from "react-i18next";
import { FormProvider } from "react-hook-form";
import SubmitButton from "components/shared/SubmitButton";
import Fieldset from "components/v2/Fieldset";
import { graphql, useFragment } from "react-relay";
import { EditArticleForm_ArticleFragment$key } from "artifacts/EditArticleForm_ArticleFragment.graphql";
import { useEditArticleForm } from "./useEditArticleForm";
import ArticleForm from "../ArticleForm";

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
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit()} style={{ width: "100%" }}>
        <ArticleForm />
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
