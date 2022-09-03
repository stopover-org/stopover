import React from "react";
import styled from "styled-components";
import InterestGallery from "../EventFilter/InterestGallery";
import EventFilter from "../EventFilter";
import Search from "../EventFilter/Search";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 40px 0px 0px 0px;
  height: calc(100vh - 75px - 16px);
  min-height: 1100px;
`;

const List = styled.div``;

const Intrests = styled.div`
  padding: 0px 0px 0px 56px;
`;

const EventsList = () => (
  // usePreloadedQuery(Query, preloadedQuery);

  <Wrapper>
    <EventFilter />

    <Intrests>
      <Search
        searchType="event"
        inputWidth="650px"
        placeHolder="Какое мероприятие вы ищете?"
        helpText="Вы ищете"
      />
      <InterestGallery />
      <List>EVENTS</List>
    </Intrests>
  </Wrapper>
);

export default React.memo(EventsList);
