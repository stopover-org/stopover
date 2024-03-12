import { Grid } from "@mui/joy";
import React from "react";
import { useTranslation } from "react-i18next";
import Typography from "components/v2/Typography";
import NewArticleForm from "components/shared/forms/article/NewArticleForm";

interface NewArticleProps {}

const NewArticleScene = (props: NewArticleProps) => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Grid xs={12} sm={12} md={12} lg={12}>
        <Typography level="h3" component="h1">
          New Article
        </Typography>
      </Grid>
      <NewArticleForm />
    </Grid>
  );
};

export default React.memo(NewArticleScene);
