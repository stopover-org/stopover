import React from "react";
import styled from "styled-components";
import LocationInput from "./LocationInput";
import DropDownList from "./DropDownList";
import IntrestGallery from "./IntrestGallery";
import Slider from "./Slider/Slider";
import moment from "moment";

import DropDownCalander from "./Calander/DropDownCalander";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const FilterBar = styled.div`
  width: 454px;
  margin: 0px;
`;
const FilterBarItem = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px 0px 15px 45px;
  border-right: 1px solid black;
`;
const MainPage = styled.div`
  
`;
const StartingPoint = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 156px;
  margin: 40px 0px 63px 45px;
`;
const IntrestBar = styled.div`
  padding: 26px 0px 0px 45px;
`;


function Main() {
  const durationFrom = [
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
  ]
  const durationTo = [
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
  ]
  const chooseAmount = [
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
  ]

  return (
    <Wrapper>
      <FilterBar >
        <StartingPoint>
          <LocationInput />
          <DropDownCalander />
        </StartingPoint>

        <FilterBarItem>
          <Slider
            step={1}
          />
        </FilterBarItem>
        <FilterBarItem>
          <DropDownList
            paddingRight={"30px"}
            width={"150px"}
            description="длительность от"
            options={durationFrom}
          />
          <DropDownList
            width={"150px"}
            description="длительность до"
            options={durationTo}
          />
        </FilterBarItem>
        <FilterBarItem>
          <DropDownList
            width={"281px"}
            description="Количество участников"
            options={chooseAmount}
          />
        </FilterBarItem>
      </FilterBar>

      <MainPage>
        <IntrestBar>
          <IntrestGallery />
        </IntrestBar>
        
      </MainPage>
    </Wrapper>
  );
}

export default Main;