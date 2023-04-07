import { graphql, useFragment, usePaginationFragment } from "react-relay";
import React, { useState } from "react";
import { Grid } from "@mui/joy";
import {
  events_Query,
  events_Query$data,
} from "../../pages/events/__generated__/events_Query.graphql";
import { EventsListScene_EventsFragment$key } from "../__generated__/EventsListScene_EventsFragment.graphql";
import { EventsListScene_InterestsFragment$key } from "../__generated__/EventsListScene_InterestsFragment.graphql";
import { ChangeFiltersProps } from "../EventScene/components/EventFilter";
import Input from "../../components/v2/Input";
import DatePicker from "../../components/v2/DatePicker";

type Props = {
  eventsReference: events_Query$data;
};

const EventsScene = ({ eventsReference }: Props) => {
  const events = usePaginationFragment<
    events_Query,
    EventsListScene_EventsFragment$key
  >(
    graphql`
      fragment EventsScene_EventsFragment on Query
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
        filters: { type: "EventsFilter" }
      )
      @refetchable(queryName: "EventsPaginationQuery") {
        events(first: $count, after: $cursor, filters: $filters)
          @connection(key: "Events_events") {
          edges {
            node {
              ...CompactCard_EventFragment
              ...WideCard_EventFragment
            }
          }
        }
        eventFilters {
          ...EventFilter_EventFiltersFragment
        }
      }
    `,
    eventsReference
  );

  const interests = useFragment<EventsListScene_InterestsFragment$key>(
    graphql`
      fragment EventsScene_InterestsFragment on Query {
        ...InterestGallery_InterestsFragment
      }
    `,
    eventsReference
  );
  const [currentPage, setCurrentPage] = useState(1);
  const onSelectPage = (page: number) => {
    setCurrentPage(page);
  };

  const onFiltersChange = ({
    minDate,
    maxDate,
    minPrice,
    maxPrice,
    city,
  }: ChangeFiltersProps) => {
    events.refetch(
      {
        filters: {
          startDate: minDate,
          endDate: maxDate,
          minPrice,
          maxPrice,
          city,
        },
      },
      {
        fetchPolicy: "store-and-network",
      }
    );
  };

  return (
    <Grid container>
      <Grid spacing={1} xs={3} container>
        <Grid xs={12}>
          <Input onChange={() => {}} value="" label="City" />
        </Grid>
        <Grid xs={6}>
          <DatePicker
            slotProps={{ field: { placeholder: "Start date" } }}
            label="Start"
            hint="Start of your trip"
          />
        </Grid>
        <Grid xs={6}>
          <DatePicker
            slotProps={{ field: { placeholder: "End date" } }}
            label="End"
            hint="End of your trip"
          />
        </Grid>
      </Grid>
      <Grid xs={9}>{/* alksdfjaksldj */}</Grid>
    </Grid>
  );
};

export default React.memo(EventsScene);
