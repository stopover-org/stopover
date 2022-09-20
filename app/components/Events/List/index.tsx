import React from "react";
import styled from "styled-components";
import { graphql, usePaginationFragment } from "react-relay";
import moment from "moment";
import InterestGallery from "../../EventFilter/InterestGallery";
import EventFilter from "../../EventFilter";
import Search from "../../EventFilter/Search";
import { events_Query$data } from "../../../pages/events/__generated__/events_Query.graphql";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 40px 0px 0px 0px;
  height: calc(100vh - 75px - 16px);
  min-height: 1100px;
`;

const List = styled.div``;

const Interests = styled.div`
  padding: 0px 0px 0px 56px;
`;

type Props = {
  eventsReference: events_Query$data;
};

const EventsList = ({ eventsReference }: Props) => {
  const events: any = usePaginationFragment(
    graphql`
      fragment List_EventsFragment on Query
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
      )
      @refetchable(queryName: "EventsListPaginationQuery") {
        events(first: $count, after: $cursor)
          @connection(key: "Events_events") {
          edges {
            node {
              title
              description
              id
              availableDates
              images
              tags {
                title
              }
              interests {
                id
                title
              }
            }
          }
        }
        eventFilters {
          startDate
          endDate
          minPrice
          maxPrice
          city
        }
      }
    `,
    eventsReference
  );

  return (
    <Wrapper>
      <EventFilter
        minDate={moment(events.data.eventFilters.startDate)}
        maxDate={moment(events.data.eventFilters.endDate)}
        minPrice={events.data.eventFilters.minPrice}
        maxPrice={events.data.eventFilters.maxPrice}
        city={events.data.eventFilters.city}
      />

      <Interests>
        <Search
          searchType="event"
          width="650px"
          placeHolder="Какое мероприятие вы ищете?"
          helpText="Вы ищете"
        />
        <InterestGallery />
        <List>EVENTS</List>
      </Interests>
    </Wrapper>
  );
};

export default React.memo(EventsList);
