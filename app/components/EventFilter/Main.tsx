import React from "react";
import styled from "styled-components";
import LocationInput from "./LocationInput";

const FilterBar = styled.div`
  width: 25%;
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
        <LocationInput></LocationInput>
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