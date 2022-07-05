import React from "react";
import styled from "styled-components";
import LocationInput from "./LocationInput";
import InputFromTo from "./InputFromTo";
import DropDownList from "./DropDownList";

const FilterBar = styled.div`
  width: 25%;
`;
const FilterBarItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding:10px 10px 30px 10px;
  &:hover {
    box-shadow: inset 0px 0px 5px #545454;
    background-color: #e3e3e3cc;
  }
  
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
        <FilterBarItem>
          <LocationInput />
        </FilterBarItem>
        <FilterBarItem>
          <InputFromTo />
        </FilterBarItem>
        <FilterBarItem>
          <DropDownList
          description="длительность от"
          options={[
            {
                label: "Выбирете дату",
                value: "chooseDate"
            },
            {
                label: "1 час",
                value: "1h"
            },
            {
                label: "2 часа",
                value: "2h"
            },
            {
                label: "до 4 часов",
                value: "4h"
            },
            {
                label: "до 12 часов",
                value: "12h"
            },
            {
                label: "до 1 дня",
                value: "1d"
            },
            {
                label: "до 3 дней",
                value: "3d"
            },
            {
                label: "до 1 недели",
                value: "1w"
            },
          ]}
        />
        <DropDownList
          description="длительность до"
          options={[
            {
                label: "Выбирете дату",
                value: "chooseDate"
            },
            {
                label: "1 час",
                value: "1h"
            },
            {
                label: "2 часа",
                value: "2h"
            },
            {
                label: "до 4 часов",
                value: "4h"
            },
            {
                label: "до 12 часов",
                value: "12h"
            },
            {
                label: "до 1 дня",
                value: "1d"
            },
            {
                label: "до 3 дней",
                value: "3d"
            },
            {
                label: "до 1 недели",
                value: "1w"
            },
          ]}
        />
        </FilterBarItem>
        <FilterBarItem>
        <DropDownList
          description="Количество участников"
          options={[
            {
                label: "1",
                value: "1"
            },
            {
                label: "2",
                value: "2"
            },
            {
                label: "3",
                value: "3"
            },
            {
                label: "4",
                value: "4"
            },
            {
                label: "5",
                value: "5"
            },
            {
                label: "6",
                value: "6"
            },
            {
                label: "7",
                value: "7"
            },
            {
                label: "8",
                value: "8"
            },
          ]}
        />
        </FilterBarItem>
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