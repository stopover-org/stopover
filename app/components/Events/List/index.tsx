import React from "react";
import styled from "styled-components";
import { graphql, usePaginationFragment } from "react-relay";
import moment from "moment";
import InterestGallery from "../../EventFilter/InterestGallery";
import EventFilter from "../../EventFilter";
import Search from "../../EventFilter/Search";
import {
  events_Query,
  events_Query$data,
} from "../../../pages/events/__generated__/events_Query.graphql";
import { List_EventsFragment$key } from "./__generated__/List_EventsFragment.graphql";
import CardImageLeft from "../../EventListCard/CardImageLeft";
import CardImageTop from "../../EventListCard/CardImageTop";
import Row from "../../Row";
import Column from "../../Column";
import Pagination from "../../Pagination";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 40px 0px 0px 0px;
  height: auto;
`;
const Interests = styled.div``;
const SRow = styled(Row)`
  padding-top: 40px;
  padding-bottom: 40px;
`;
type Props = {
  eventsReference: events_Query$data;
};

const EventsList = ({ eventsReference }: Props) => {
  const events: any = usePaginationFragment<
    events_Query,
    List_EventsFragment$key
  >(
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
              attendeeCostPerUomCents
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
        minPrice={events.data.eventFilters.minPrice!}
        maxPrice={events.data.eventFilters.maxPrice!}
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
        {events.data.events.edges.map((edge: any) => {
          const { images, title, attendeeCostPerUomCents } = edge.node!;
          return (
            <Column>
              <SRow justifyContent="space-between">
                <CardImageTop
                  title={title}
                  image={images[0]}
                  price={attendeeCostPerUomCents}
                  averageRate={4.5}
                />
                <CardImageTop
                  title={title}
                  image={images[0]}
                  price={attendeeCostPerUomCents}
                  averageRate={3.1}
                />
                <CardImageTop
                  title={title}
                  image={images[0]}
                  price={attendeeCostPerUomCents}
                  averageRate={2}
                />
              </SRow>
              <CardImageLeft
                title={title}
                image={images[0]}
                price={attendeeCostPerUomCents}
                averageRate={2}
              />
            </Column>
          );
        })}
        <Pagination
          currentPage={5}
          amountPagesOnLeft={3}
          amountPagesOnRight={3}
          totalPages={800}
        />
      </Interests>
    </Wrapper>
  );
};

export default React.memo(EventsList);
