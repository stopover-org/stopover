import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Grid, IconButton, Stack } from "@mui/joy";
import Table from "components/v2/Table/Table";
import Button from "components/v2/Button";
import useEdges from "lib/hooks/useEdges";
import Typography from "components/v2/Typography";
import Link from "components/v2/Link";
import EditIcon from "@mui/icons-material/Edit";
import { graphql, usePaginationFragment } from "react-relay";
import { ArticlesScene_QueryFragment$key } from "artifacts/ArticlesScene_QueryFragment.graphql";
import { ArticlesTableQueryFragment } from "artifacts/ArticlesTableQueryFragment.graphql";

const ArticlesScene = ({
  queryFragmentRef,
}: {
  queryFragmentRef: ArticlesScene_QueryFragment$key;
}) => {
  const {
    data: { articles },
    hasPrevious,
    hasNext,
    loadPrevious,
    loadNext,
  } = usePaginationFragment<
    ArticlesTableQueryFragment,
    ArticlesScene_QueryFragment$key
  >(
    graphql`
      fragment ArticlesScene_QueryFragment on Query
      @refetchable(queryName: "ArticlesTableQueryFragment")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 30 }
        cursor: { type: "String", defaultValue: "" }
      ) {
        articles(first: $count, after: $cursor)
          @connection(key: "ArticlesTable_query_articles") {
          edges {
            node {
              id
              title
              language
            }
          }
        }
      }
    `,
    queryFragmentRef
  );
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = React.useState(1);
  const pagedArticles = useEdges(articles).map((v) => v!);
  const data = useMemo(
    () =>
      pagedArticles.map((article) => ({
        title: (
          <Link
            href={`/articles/${article.id}`}
            fontSize="sm"
            target="_blank"
            primary
          >
            {article.title}
          </Link>
        ),
        language: <Typography fontSize="sm">{article.language}</Typography>,
        actions: (
          <Link href={`/articles/${article.id}/edit`} fontSize="sm" primary>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Link>
        ),
      })),
    [pagedArticles]
  );

  const headers = React.useMemo(
    () => [
      {
        key: "title",
        width: 300,
        label: t("models.article.attributes.title"),
      },
      {
        key: "language",
        width: 100,
        label: t("models.article.attributes.language"),
      },
      {
        key: "actions",
        width: 50,
        label: "",
      },
    ],
    []
  );

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Stack direction="row" justifyContent="flex-end">
          <Button>{t("scenes.articles.articlesScene.new")}</Button>
        </Stack>
      </Grid>
      <Grid xs={12}>
        <Table
          data={data}
          headers={headers}
          withPagination
          paginationProps={{
            rowsPerPage: 30,
            colSpan: headers.length,
            setPage: setCurrentPage,
            page: currentPage,
            hasPrevious,
            hasNext,
            onNextPage: () => {
              if (hasNext) {
                loadNext(30, {
                  onComplete: () => setCurrentPage(currentPage + 1),
                });
              }
            },
            onPrevPage: () => {
              if (hasPrevious) {
                loadPrevious(30, {
                  onComplete: () => setCurrentPage(currentPage - 1),
                });
              }
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(ArticlesScene);
