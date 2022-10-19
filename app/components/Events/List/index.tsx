import React, { useState } from "react";
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
import Pagination from "../../Pagination";
import { PaginationSize } from "../../StatesEnum";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 40px 0px 0px 0px;
  height: auto;
`;

const WrapperBigCard = styled.div`
  padding-bottom: 70px;
`;

const WrapperSmallCard = styled.div`
  padding-bottom: 70px;
`;

const Interests = styled.div`
  padding-left: 50px;
`;
const SRow = styled(Row)``;
type Props = {
  eventsReference: events_Query$data;
};

const getInterestLinks = (
  array: {
    title: string;
    id: string;
  }[],
  from: number,
  to: number
) =>
  array
    .map((item, index) => {
      if (index < to)
        return {
          text: item.title,
          href: `interests/${item.id}`,
        };
      return {
        text: "",
        href: "",
      };
    })
    .slice(from, to);

const getInterestTags = (
  array: {
    title: string;
  }[],
  from: number,
  to: number
) =>
  array
    .map((item, index) => {
      if (index < to) return { title: item.title };
      return { title: "" };
    })
    .slice(from, to);

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

  const generateCardsRowArray = () =>
    events.data.events.edges.map((edge: any, index: number) => {
      const { images, title, attendeeCostPerUomCents } = edge.node!;
      if (index === 3) {
        return (
          <WrapperBigCard>
            <CardImageLeft
              key={edge.node.id}
              title={title}
              image={images[0]}
              price={attendeeCostPerUomCents}
              averageRate={2}
              text={edge.node.description}
              tags={getInterestTags(edge.node.tags, 0, 3)}
              links={getInterestLinks(edge.node.interests, 0, 3)}
            />
          </WrapperBigCard>
        );
      }
      return (
        <WrapperSmallCard>
          <CardImageTop
            key={edge.node.id}
            title={title}
            image={images[0]}
            price={attendeeCostPerUomCents}
            averageRate={4.5}
            tags={getInterestTags(edge.node.tags, 0, 3)}
            links={getInterestLinks(edge.node.interests, 0, 3)}
          />
        </WrapperSmallCard>
      );
    });
  const [currentPage, setCurrentPage] = useState(1);
  const onSelectPage = (page: number) => {
    setCurrentPage(page);
  };
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
        <SRow wrap="wrap" justifyContent="space-between">
          {generateCardsRowArray()}
        </SRow>
        <Pagination
          onNextPage={() => setCurrentPage(currentPage + 1)}
          onPrevPage={() => setCurrentPage(currentPage - 1)}
          onSelectPage={onSelectPage}
          currentPage={currentPage}
          amountPagesOnRight={3}
          amountPagesOnLeft={2}
          totalPages={11}
          size={PaginationSize.SMALL}
          minVisible
          maxVisible
          fillerVisible
          prevNextElementVisible
        />
      </Interests>
    </Wrapper>
  );
};

export default React.memo(EventsList);
