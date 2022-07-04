import React from "react";
import styled from "styled-components";

const FilterBar = styled.div`
  width: 20%;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const EventsList = styled.div`
  display: flex;
  flex-direction: column;
`;

function Main() {

  return (
    <Wrapper>
      <FilterBar >
        <p>Filter</p> 
        <p>Filter</p>
        <p>Filter</p>
      </FilterBar>
      <EventsList> 
        <p>events list</p>
        <p>events list</p>
        <p>events list</p>
        <p>events list</p>

      </EventsList>
    </Wrapper>
  );
}

export default Main;