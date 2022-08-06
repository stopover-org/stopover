import React from "react";
import styled from "styled-components";
import { graphql, loadQuery, usePreloadedQuery } from "react-relay";
import InterestGallery from "../EventFilter/InterestGallery";
import EventFilter from "../EventFilter";
import Environment from "../../../lib/environment";
import Search from "../EventFilter/Search";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 40px 0px 0px 0px;
  height: calc(100vh - 75px - 16px);
  min-height: 1100px;
`;

const ListOfEvents = styled.div``;

const Intrests = styled.div`
  padding: 0px 0px 0px 56px;
`;

const Query = graphql`
  query ListQuery {
    currentUser {
      id
    }
    events {
      id
      eventType
      title
      description
      country
      city
      status
      eventOptions {
        id
        relayId
      }
      interests {
        id
        title
      }
      achievements {
        title
      }
    }
  }
`;

const preloadedQuery = loadQuery(Environment, Query, {});

function EventsList() {
  usePreloadedQuery(Query, preloadedQuery);

  return (
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
        <ListOfEvents>EVENTS</ListOfEvents>
      </Intrests>
    </Wrapper>
  );
}

export default React.memo(EventsList);
