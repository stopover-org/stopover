import React from "react";
import { graphql, useFragment } from "react-relay";
import { AspectRatio, Card, CardContent, CardOverflow, Grid } from "@mui/joy";
import Link from "components/v2/Link";
import Typography from "components/v2/Typography";
import { ArticleCard_ArticleFragment$key } from "artifacts/ArticleCard_ArticleFragment.graphql";

const ArticleCard = ({
  articleFragmentRef,
}: {
  articleFragmentRef: ArticleCard_ArticleFragment$key;
}) => {
  const article = useFragment<ArticleCard_ArticleFragment$key>(
    graphql`
      fragment ArticleCard_ArticleFragment on Article {
        id
        title
        publishedAt
        image
      }
    `,
    articleFragmentRef
  );

  return (
    <Grid
      width={{
        lg: "calc(33% - 20px)",
        md: "calc(50% - 20px)",
        sm: "calc(100% - 20px)",
        xs: "calc(100% - 20px)",
      }}
    >
      <Card variant="outlined" sx={{ width: "100%", margin: "0px" }}>
        <CardOverflow>
          <AspectRatio ratio="2">
            {article.image && (
              <img src={article.image} alt={article.title} loading="lazy" />
            )}
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Link href={`/articles/${article.id}`}>
            <Typography sx={{ fontSize: "xl" }}>{article.title}</Typography>
          </Link>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default React.memo(ArticleCard);
