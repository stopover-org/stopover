import React, { useState } from "react";
import styled from "styled-components";
import { graphql, useFragment, usePaginationFragment } from "react-relay";
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
import { Currencies, PaginationSize, TypographySize } from "../../StatesEnum";
import Typography from "../../Typography";

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

const EventsList = ({ eventsReference }: Props) => {
  const events = usePaginationFragment<events_Query, List_EventsFragment$key>(
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
              ...CardImageLeft_EventFragment
              ...CardImageTop_EventFragment
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

  const interests = useFragment(
    graphql`
      fragment List_InterestsFragment on Query {
        ...InterestGallery_InterestsFragment
      }
    `,
    eventsReference
  );

  const generateCardsRowArray = () =>
    events.data.events.edges.map((edge: any, index: number) => {
      if (index === 3) {
        return (
          <WrapperBigCard key={edge.node.id}>
            <CardImageLeft
              averageRate={2}
              currency={Currencies.USD}
              eventRef={edge.node}
            />
          </WrapperBigCard>
        );
      }
      return (
        <WrapperSmallCard key={edge.node.id}>
          <CardImageTop
            averageRate={4.5}
            currency={Currencies.USD}
            eventRef={edge.node}
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
        <InterestGallery onChange={() => {}} interestsRef={interests} />
        <SRow wrap="wrap" justifyContent="space-between">
          {generateCardsRowArray()}
        </SRow>
        <Pagination
          onNextPage={() => setCurrentPage(currentPage + 1)}
          onPrevPage={() => setCurrentPage(currentPage - 1)}
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

export default React.memo(EventsList);
