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
`;

const ListOfEvents = styled.div`
  border: 1px solid red;
  min-height: 100vh;
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

      <div>
        <Search />
        <InterestGallery />
        <ListOfEvents>EVENTS</ListOfEvents>
      </div>
    </Wrapper>
  );
}

export default React.memo(EventsList);
