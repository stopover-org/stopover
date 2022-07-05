import React from "react";
import styled from "styled-components";
import LocationInput from "./LocationInput";
import InputFromTo from "./InputFromTo";
import DropDownList from "./DropDownList";

const FilterBar = styled.div`
  width: 454px;
  margin: 0px;
  
`;
const FilterBarItem = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px 10px 15px 30px;
  border-right: 1px solid black;
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
          <LocationInput />
        <FilterBarItem>
          <InputFromTo />
        </FilterBarItem>
        <FilterBarItem>
          <DropDownList
            paddingRight={"30px"}
            width={"150px"}
            description="длительность от"
            options={[
              {
                  label: "Выбирете дату",
                  value: ""
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
            width={"150px"}
            description="длительность до"
            options={[
              {
                  label: "Выбирете дату",
                  value: ""
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
            width={"281px"}
            description="Количество участников"
            options={[
              {
                label: "Выберите количество",
                value: ""
              },
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