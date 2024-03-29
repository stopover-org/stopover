import { AspectRatio, Grid } from "@mui/joy";
import { SingleArticleScene_ArticleFragment$key } from "artifacts/SingleArticleScene_ArticleFragment.graphql";
import React from "react";
import { graphql, useFragment } from "react-relay";
import Typography from "components/v2/Typography";
import Description from "components/v2/Description";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import BreadcrumbsComponent from "components/v2/Breadcrumbs/Breadcrumbs";

const Img = styled.img`
  width: 100%;
`;

const SingleArticleScene = ({
  articleFragmentRef,
}: {
  articleFragmentRef: SingleArticleScene_ArticleFragment$key;
}) => {
  const article = useFragment<SingleArticleScene_ArticleFragment$key>(
    graphql`
      fragment SingleArticleScene_ArticleFragment on Article {
        id
        title
        content
        image
        interests {
          title
          slug
        }
      }
    `,
    articleFragmentRef
  );
  const { t } = useTranslation();
  return (
    <Grid
      container
      sx={{ maxWidth: "1024px", width: "100%", margin: "0 auto" }}
      spacing={2}
    >
      <Grid xs={12} sm={12} md={12} lg={12}>
        <BreadcrumbsComponent
          items={[
            ...article.interests.map((interest) => ({
              title: interest.title,
              subtitle: t("models.interest.singular"),
              href: `/interests/${interest.slug}`,
            })),
          ]}
        />
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={12}>
        <Typography level="h1" component="h1">
          {article.title}
        </Typography>
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={12}>
        <AspectRatio ratio="16/9">
          <Img src={article.image} />
        </AspectRatio>
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={12}>
        <Description html={article.content} />
      </Grid>
    </Grid>
  );
};

export default React.memo(SingleArticleScene);
