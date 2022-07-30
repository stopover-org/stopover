import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import LocationInput from "./LocationInput";
import DropDownList from "./DropDownList";
import IntrestGallery from "./IntrestGallery";
import Slider from "./Slider";
import { durationFrom, durationTo, chooseAmount } from "../constants";
import Calendar from "./Calander";

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
const MainPage = styled.div``;
const StartingPoint = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 156px;
  margin: 40px 0px 63px 45px;
`;
const InterestBar = styled.div`
  padding: 26px 0px 0px 45px;
`;

function Main() {
  const [filters, setFilters] = useState<{
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const dateHandler = (
    startDate: moment.Moment | null,
    endDate: moment.Moment | null
  ) => {
    setFilters({
      startDate,
      endDate,
    });
  };
  const sliderHandler = (
    chosenStart: string | null,
    chosenEnd: string | null
  ) => {
    console.log(chosenStart, chosenEnd);
  };

  return (
    <Wrapper>
      <FilterBar>
        <StartingPoint>
          <LocationInput />
          <Calendar dateHandler={dateHandler} />
        </StartingPoint>
        {filters.startDate && filters.endDate && (
          <FilterBarItem>
            <Slider
              range={[filters.startDate, filters.endDate]}
              countOfMarks={3}
              onChange={sliderHandler}
            />
          </FilterBarItem>
        )}
        <FilterBarItem>
          <Slider range={[0, 9]} countOfMarks={4} onChange={sliderHandler} />
        </FilterBarItem>
        <FilterBarItem>
          <Slider
            range={["Greg", "Michailo", "Max", "Chenda", "Gilda"]}
            countOfMarks={4}
            onChange={sliderHandler}
          />
        </FilterBarItem>
        <FilterBarItem>
          <DropDownList
            paddingRight="30px"
            width="150px"
            description="длительность от"
            options={durationFrom}
          />
          <DropDownList
            width="150px"
            description="длительность до"
            options={durationTo}
          />
        </FilterBarItem>
        <FilterBarItem>
          <DropDownList
            width="281px"
            description="Количество участников"
            options={chooseAmount}
          />
        </FilterBarItem>
      </FilterBar>

      <MainPage>
        <InterestBar>
          <IntrestGallery />
        </InterestBar>
      </MainPage>
    </Wrapper>
  );
}

export default Main;
/*
<Slider
            startDate={filters.startDate}
            endDate={filters.endDate}
            countOfElements={4}
            sliderHandler={sliderHandler}
          />
*/
