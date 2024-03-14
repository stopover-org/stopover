import { Grid } from "@mui/joy";
import React from "react";
import { useTranslation } from "react-i18next";
import { FormProvider } from "react-hook-form";
import SubmitButton from "components/shared/SubmitButton";
import Fieldset from "components/v2/Fieldset";
import ArticleForm from "components/shared/forms/article/ArticleForm";
import { useNewArticleForm } from "./useNewArticleForm";

const NewArticleForm = () => {
  const { t } = useTranslation();
  const form = useNewArticleForm();
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit()} style={{ width: "100%" }}>
        <ArticleForm />
        <Fieldset margin="10px 0 0 0 ">
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

export default React.memo(NewArticleForm);
