import {
  Disposable,
  graphql,
  useFragment,
  usePaginationFragment,
} from "react-relay";
import React from "react";
import { AspectRatio, Divider, Grid, Stack } from "@mui/joy";
import { useParams } from "next/navigation";
import { useQuery } from "lib/hooks/useQuery";
import { usePagedEdges } from "lib/hooks/usePagedEdges";
import EventCardCompact from "scenes/attendees/events/EventsScene/components/EventCardCompact";
import Pagination from "scenes/attendees/events/EventsScene/components/Pagination";
import { InterestScene_EventsPaginationFragment$key } from "artifacts/InterestScene_EventsPaginationFragment.graphql";
import { InterestScenePaginationQuery } from "artifacts/InterestScenePaginationQuery.graphql";
import Typography from "components/v2/Typography/Typography";
import { InterestScene_InterestFragment$key } from "artifacts/InterestScene_InterestFragment.graphql";
import Description from "components/v2/Description";
import Link from "components/v2/Link";
import moment from "moment";
import { urlSafeDateFormat } from "../../../../lib/utils/dates";

interface InterestSceneProps {
  eventsFragmentRef: InterestScene_EventsPaginationFragment$key;
  interestFragmentRef: InterestScene_InterestFragment$key;
}

const InterestScene = ({
  eventsFragmentRef,
  interestFragmentRef,
}: InterestSceneProps) => {
  const [initialRender, setInitialRender] = React.useState<boolean>(true);
  const [currentPage, updateCurrentPage] = React.useState<number>(1);
  const { data, hasPrevious, hasNext, loadPrevious, loadNext, refetch } =
    usePaginationFragment<
      InterestScenePaginationQuery,
      InterestScene_EventsPaginationFragment$key
    >(
      graphql`
        fragment InterestScene_EventsPaginationFragment on Query
        @refetchable(queryName: "InterestScenePaginationQuery")
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String", defaultValue: "0" }
        ) {
          events(first: $count, after: $cursor, filters: $filters)
            @connection(key: "InterestScene_query_events") {
            edges {
              node {
                id
                ...EventCardCompacts_EventFragment
                ...EventCardWide_EventFragment
              }
            }
          }
          eventFilters {
            ...Sidebar_EventFiltersFragment
            startDate
            endDate
            minPrice {
              cents
            }
            maxPrice {
              cents
            }
          }
        }
      `,
      eventsFragmentRef
    );
  const query = useQuery("query", "");
  const events = usePagedEdges(data.events, currentPage, 10);
  const queryRef = React.useRef<Disposable>();
  const params = useParams();

  React.useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      return;
    }
    if (queryRef.current) {
      queryRef.current.dispose();
    }

    queryRef.current = refetch(
      {
        filters: {
          interests: [params.id as string],
          query,
        },
        cursor: "0",
      },
      {
        onComplete: () => {
          if (currentPage !== 1) {
            updateCurrentPage(1);
          }
        },
      }
    );
  }, [query]);

  const interest = useFragment<InterestScene_InterestFragment$key>(
    graphql`
      fragment InterestScene_InterestFragment on Interest {
        title
        preview
        description
        slug
      }
    `,
    interestFragmentRef
  );

  return (
    <Grid container padding={2} spacing={2} sm={12} md={12}>
      {interest.preview && (
        <Grid xs={12} sm={12} md={4} lg={4}>
          <Stack sx={{ position: "sticky", top: "0", left: "0" }}>
            <AspectRatio sx={{ width: "100%" }}>
              <img
                width="100%"
                src={interest.preview}
                alt={`${interest.title} - logo`}
              />
            </AspectRatio>
          </Stack>
        </Grid>
      )}
      <Grid
        xs={12}
        sm={12}
        md={interest.preview ? 8 : 12}
        lg={interest.preview ? 8 : 12}
      >
        <Stack
          sx={{ position: "sticky", top: "0", right: "0" }}
          spacing={2}
          useFlexGap
        >
          <Typography level="h3" component="h1">
            {interest.title}
          </Typography>
          <Description html={interest.description} />
          <Link href={`/timetables/interests/${interest.slug}`} primary>
            Today timetable
          </Link>
          <Link
            href={`/timetables/interests/${interest.slug}/${moment()
              .add(1, "days")
              .format(urlSafeDateFormat)}`}
            primary
          >
            Tomorrow timetable
          </Link>
        </Stack>
      </Grid>
      <Divider />
      {events.map((event) => (
        <EventCardCompact key={event!.id} eventFragmentRef={event!} />
      ))}
      <Grid xs={12}>
        <Pagination
          showPrev={hasPrevious}
          showNext={hasNext}
          onPrev={() => {
            if (hasPrevious) {
              loadPrevious(10, {
                onComplete: () => updateCurrentPage(currentPage - 1),
              });
              return;
            }
            updateCurrentPage(currentPage - 1);
          }}
          onNext={() => {
            if (hasNext) {
              loadNext(10, {
                onComplete: () => updateCurrentPage(currentPage + 1),
              });
              return;
            }
            updateCurrentPage(currentPage + 1);
          }}
          currentPage={currentPage}
          perPage={10}
          total={data.events.edges.length}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(InterestScene);
