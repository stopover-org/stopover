import { graphql, usePaginationFragment } from "react-relay";
import React, { useMemo } from "react";
import { InterestsScene_QueryFragment$key } from "artifacts/InterestsScene_QueryFragment.graphql";
import { useTranslation } from "react-i18next";
import { Grid, IconButton, Stack } from "@mui/joy";
import useEdges from "lib/hooks/useEdges";
import Table from "components/v2/Table/Table";
import Typography from "components/v2/Typography";
import { InterestsTableQueryFragment } from "artifacts/InterestsTableQueryFragment.graphql";
import Link from "components/v2/Link";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import CreateInterest from "components/shared/forms/interest/CreateInterest";
import EditInterest from "../../../components/shared/forms/interest/EditInterest";

interface InterestsSceneProps {
  queryFragmentRef: InterestsScene_QueryFragment$key;
}

const InterestsScene = ({ queryFragmentRef }: InterestsSceneProps) => {
  const {
    data: { interests },
    hasPrevious,
    hasNext,
    loadPrevious,
    loadNext,
  } = usePaginationFragment<
    InterestsTableQueryFragment,
    InterestsScene_QueryFragment$key
  >(
    graphql`
      fragment InterestsScene_QueryFragment on Query
      @refetchable(queryName: "InterestsTableQueryFragment")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 30 }
        cursor: { type: "String", defaultValue: "" }
      ) {
        interests(first: $count, after: $cursor)
          @connection(key: "InterestsTable_query_interests") {
          edges {
            node {
              id
              originalTitle
              slug
              preview
              ...EditInterest_InterestFragment
            }
          }
        }
      }
    `,
    queryFragmentRef
  );
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = React.useState(1);
  const pagedInterests = useEdges(interests).map((v) => v!);
  const data = useMemo(
    () =>
      pagedInterests.map((interest) => ({
        title: <Typography fontSize="sm">{interest.originalTitle}</Typography>,
        slug: (
          <Link
            href={`/interests/${interest.slug}`}
            fontSize="sm"
            target="_blank"
            primary
          >
            {interest.slug}
          </Link>
        ),
        preview: (
          <Typography fontSize="sm">
            {interest.preview ? (
              <>
                <IconButton size="sm">
                  <DoneAllIcon />
                </IconButton>{" "}
                With Preview
              </>
            ) : (
              <>
                <IconButton size="sm">
                  <RemoveDoneIcon />
                </IconButton>{" "}
                Preview missed
              </>
            )}
          </Typography>
        ),
        actions: <EditInterest interestFragmentRef={interest} />,
      })),
    [pagedInterests]
  );

  const headers = React.useMemo(
    () => [
      {
        key: "title",
        width: 300,
        label: t("models.interest.attributes.title"),
      },
      {
        key: "slug",
        width: 300,
        label: t("models.interest.attributes.slug"),
      },
      {
        key: "preview",
        width: 100,
        label: t("models.interest.attributes.preview"),
      },
      {
        key: "actions",
        width: 100,
        label: "",
      },
    ],
    []
  );

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Stack direction="row" justifyContent="flex-end">
          <CreateInterest />
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

export default React.memo(InterestsScene);
