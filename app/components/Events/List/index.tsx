import React from "react";
import styled from "styled-components";
import { graphql, loadQuery, usePreloadedQuery } from "react-relay";
import InterestGallery from "../EventFilter/InterestGallery";
import EventFilter from "../EventFilter";
import Environment from "../../../lib/environment";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
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
        <InterestGallery />
        <div>EVENTS</div>
      </div>
    </Wrapper>
  );
}

export default React.memo(EventsList);
