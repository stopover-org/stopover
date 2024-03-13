import { Grid } from "@mui/joy";
import React from "react";
import Typography from "components/v2/Typography";
import EditArticleForm from "components/shared/forms/article/EditArticleForm/EditArticleForm";
import { graphql, useFragment } from "react-relay";
import { EditArticleScene_ArticleFragment$key } from "artifacts/EditArticleScene_ArticleFragment.graphql";

const EditArticleScene = ({
  articleFragmentRef,
}: {
  articleFragmentRef: EditArticleScene_ArticleFragment$key;
}) => {
  const article = useFragment(
    graphql`
      fragment EditArticleScene_ArticleFragment on Article {
        ...EditArticleForm_ArticleFragment
      }
    `,
    articleFragmentRef
  );
  return (
    <Grid container>
      <Grid xs={12} sm={12} md={12} lg={12}>
        <Typography level="h3" component="h1">
          Edit Article
        </Typography>
      </Grid>
      <EditArticleForm articleFragmentRef={article!} />
    </Grid>
  );
};

export default React.memo(EditArticleScene);
