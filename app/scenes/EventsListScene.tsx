import React, { useState } from "react";
import styled from "styled-components";
import { graphql, useFragment, usePaginationFragment } from "react-relay";
import InterestGallery from "../components/EventFilter/InterestGallery";
import EventFilter, { ChangeFiltersProps } from "../components/EventFilter";
import Search from "../components/EventFilter/Search";
import {
  events_Query,
  events_Query$data,
} from "../pages/events/__generated__/events_Query.graphql";
import CompactCard from "../components/EventListCard/CompactCard";
import WideCard from "../components/EventListCard/WideCard";
import Row from "../components/Row";
import Pagination from "../components/Pagination";
import {
  Currencies,
  PaginationSize,
  TypographySize,
} from "../components/StatesEnum";
import Typography from "../components/Typography";
import { EventsListScene_EventsFragment$key } from "./__generated__/EventsListScene_EventsFragment.graphql";
import { EventsListScene_InterestsFragment$key } from "./__generated__/EventsListScene_InterestsFragment.graphql";

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

type Props = {
  eventsReference: events_Query$data;
};

const EventsListScene = ({ eventsReference }: Props) => {
  const events = usePaginationFragment<
    events_Query,
    EventsListScene_EventsFragment$key
  >(
    graphql`
      fragment EventsListScene_EventsFragment on Query
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
        filters: { type: "EventsFilter" }
      )
      @refetchable(queryName: "EventsListPaginationQuery") {
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
      fragment EventsListScene_InterestsFragment on Query {
        ...InterestGallery_InterestsFragment
      }
    `,
    eventsReference
  );

  const generateCardsRowArray = () =>
    events.data?.events?.edges?.map((edge: any, index: number) => {
      const EventWrapper = index === 3 ? WrapperBigCard : WrapperSmallCard;
      const EventComponent = index === 3 ? CompactCard : WideCard;

      return (
        <EventWrapper key={edge.node.id}>
          <EventComponent currency={Currencies.USD} eventRef={edge.node} />
        </EventWrapper>
      );
    });
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
    <Wrapper>
      <EventFilter
        onChange={onFiltersChange}
        eventFiltersRef={events.data.eventFilters}
      />
      <Interests>
        <Search
          searchType="event"
          width="650px"
          placeHolder="Какое мероприятие вы ищете?"
          helpText="Вы ищете"
          onChange={() => null}
        />
        <InterestGallery onChange={() => {}} interestsRef={interests} />
        <Row wrap="wrap" justifyContent="space-between">
          {generateCardsRowArray()}
        </Row>
        <Pagination
          onNextPage={() => {
            setCurrentPage(currentPage + 1);
          }}
          onPrevPage={() => {
            setCurrentPage(currentPage - 1);
          }}
          onSelectPage={onSelectPage}
          currentPage={currentPage}
          amountPagesOnRight={1}
          amountPagesOnLeft={2}
          totalPages={11}
          size={PaginationSize.SMALL}
          minVisible
          maxVisible
          fillerVisible
          prevNextElementVisible
          prevElement={<Typography size={TypographySize.BIG}>Пред</Typography>}
          nextElement={<Typography size={TypographySize.BIG}>След</Typography>}
        />
      </Interests>
    </Wrapper>
  );
};

export default React.memo(EventsListScene);